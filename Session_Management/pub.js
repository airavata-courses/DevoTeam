const amqp = require('amqplib');

(async function() {
  try {
    const option = process.argv[2];
    const data;
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();
    const exchange = 'Broker';
    //const msg = 'Sainath says hello';
    const key;
    await ch.assertExchange(exchange, 'direct', {
      durable: false
    });

    const email = 'abc@xyz.com',
      tx_id = '123',
      year = '2020',
      month = '12',
      day = '30',
      radar = 'KIND';

    if (option == '1') {
       data = {
        email,
        tx_id,
        year,
        month,
        day,
        radar
      };
      key = 'save';
    } else {
       data = {
        email
      };
      key = 'fetch';
    }

    const msg = JSON.stringify(data);
    console.log(data);
    ch.publish(exchange, key, Buffer.from(msg));
    await ch.close();
    await conn.close();
    console.log(" [x] Sent %s: '%s'", key, msg);
  } catch (error) {
    console.error(error);
  }
})();
