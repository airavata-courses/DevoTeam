var redis = require('redis');
var client = redis.createClient({
 host: 'redis',
 port: 6379
});
const axios = require('axios');


const weather = async (req, res, next) => {

  //return response of plots
  const amqp_recv = require('amqplib/callback_api');

  amqp_recv.connect('amqp://rabbit', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = 'Broker';

      channel.assertExchange(exchange, 'direct', {
        durable: false
      });

      channel.assertQueue('', {
        exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(' [*] Waiting for data. To exit press CTRL+C');

        severities = ['API_send', 'API_send_pp']
        severities.forEach(function(severity) {
          console.log("routing keys:", severity)
          channel.bindQueue(q.queue, exchange, severity);
        });

        channel.consume(q.queue, function(msg) {
          console.log("check", (msg));
          if(msg.fields.routingKey == 'API_send')
          {
            console.log('API_send')
            client.hset(msg.properties['headers']['key'], 'plot', msg.content.toString(), function(err, res){
              console.log(res);
            });
          }
          if(msg.fields.routingKey == 'API_send_pp')
          {
            console.log('API_send_pp')
            client.hset(msg.properties['headers']['key'], 'max_spectrum_width', msg.content.toString(), function(err, res){
              console.log(res);
            });
          }
          // client.set(msg.properties['headers']['key'], msg.content);


        }, {
          noAck: true
        });
      });
    });
  });

  console.log("req.body in APi:", req.body);
  const { year, month, day, radar, email, t_id } = req.body;
  console.log("details:", year, month, day, radar, email, t_id);

  client.on('connect', function() {
    console.log('Redis client connected');
  });

  client.on('error', function (err) {
    console.log('Something went wrong ' + err);
  });

  key = email + '_' + t_id;

  const response = await axios.post('http://session:9000/save', {...req.body} );
  const data = console.log(response.data);


  console.log("key:", key)
  client.hgetall(key, function (error, result) {
    if (error) {
      console.log(error);
      //throw error;
    }
    if (result== null)
    {
      // Publish to broker

      console.log('key not found in cache');
      var amqp = require('amqplib/callback_api');

      amqp.connect('amqp://rabbit',  function(error0, connection) {
        if (error0) {
          throw error0;
        }
        connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          var exchange = 'Broker';
          var args = process.argv.slice(2);
          var msg = JSON.stringify({ 'year': year, 'month': month, 'day':day, 'radar': radar, 'email': email, 'key': key });
          var severity = 'API';

          channel.assertExchange(exchange, 'direct', {
            durable: false
          });
          channel.publish(exchange, severity, Buffer.from(msg));
          console.log(" [x] Sent %s: '%s'", severity, msg);

        });

        client.hset(key, 'plot', 'processing', function(err, reply) {
          console.log("Setting new key with transaction id:", reply);
        });

        client.hset(key, 'max_spectrum_width', 'processing', function(err, reply) {
          console.log("Setting new key with transaction id:", reply);
        });


        res.send("Sent user input to micro-services");

      });


    }
    else if(result.plot == 'processing' || result.msw == "processing")
    {
      //Request in process please wait
      res.send("Request in process please wait")
    }
    else
    {
      //plots from redis
      res.send(result);
    }
  });
};
module.exports = weather;
