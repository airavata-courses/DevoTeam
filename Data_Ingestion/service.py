import pika
import json
import sys
import nexradaws
import pickle

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='Broker', exchange_type='direct')
result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

severities = ['API']

for severity in severities:
    channel.queue_bind(exchange='Broker', queue=queue_name, routing_key=severity)

print('Data Ingestion service waiting for messages')


def callback(ch, method, properties, body):
    print("Recieved with routing key:", method.routing_key, "Data recieved:", body)

    # Input recieved as a message
    body = json.loads(body)

    year = body['year']
    day = body['day']
    month = body['month']
    station = body['radar']
    key = body['key']

    print("Inputs in DI:", year, day, month, station, key)
    
    conn = nexradaws.NexradAwsInterface()

    availscans = conn.get_avail_scans(year, month, day, station)

    serialized_obj = pickle.dumps({'key': key, 'message': availscans[0]})

    connection_send = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel_send = connection_send.channel()

    channel_send.exchange_declare(exchange='Broker', exchange_type='direct')

    channel_send.basic_publish(exchange='Broker', routing_key='get_objects', body=serialized_obj)

    print("Sent nexrad object from Data ingestor:", serialized_obj)
    connection_send.close()


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
