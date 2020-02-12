# pip install nexradaws
# pip install arm-pyart
# pip install netCDF4
import nexradaws
import pyart
import pika
import json
import sys
import os

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='Broker', exchange_type='direct')
result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

severities = ['get_objects']

for severity in severities:
    channel.queue_bind(exchange='Broker', queue=queue_name, routing_key=severity)

print('Post processing waiting for messages')


def callback(ch, method, properties, body):
    import pickle
    body = pickle.loads(body)
    key = body['key']
    print("got key:", key)
    radar_object = body['message']

    print("Recieved with routing key:", method.routing_key, "Latest Data:", radar_object)

    conn = nexradaws.NexradAwsInterface()
    results = conn.download(radar_object, os.getcwd())
    for i, scan in enumerate(results.iter_success(), start=1):
        radar = scan.open_pyart()
        max_spectrum_width = radar.fields['spectrum_width']['valid_max']

    print("max:", max_spectrum_width)
    dir_name = os.getcwd()
    dir = os.listdir(dir_name)

    for item in dir:
        if item.endswith(".gz"):
            os.remove(os.path.join(dir_name, item))

    connection_send = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel_send = connection_send.channel()

    channel_send.exchange_declare(exchange='Broker', exchange_type='direct')

    channel_send.basic_publish(exchange='Broker', routing_key='API_send_pp', properties=pika.BasicProperties(
        headers={'key': key}  # Add a key/value header
    ), body= str(max_spectrum_width))
    print("Sent from Model Analysis:")
    connection_send.close()


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
