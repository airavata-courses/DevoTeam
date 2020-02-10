import base64
import nexradaws
import pyart
import pika
import json
import sys
from PIL import Image
import io
import os

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='Broker', exchange_type='direct')
result = channel.queue_declare(queue='', exclusive=True)
queue_name = result.method.queue

severities = ['get_objects']

for severity in severities:
    channel.queue_bind(exchange='Broker', queue=queue_name, routing_key=severity)

print('Model Execution waiting for messages')


def callback(ch, method, properties, body):
    body = pickle.loads(body)
    key = body['key']
    radar_object = body['message']

    conn = nexradaws.NexradAwsInterface()
    results = conn.download(radar_object, os.getcwd())
    import matplotlib.pyplot as plt

    fig = plt.figure(figsize=(16, 12))
    for i, scan in enumerate(results.iter_success(), start=1):
        radar = scan.open_pyart()
        display = pyart.graph.RadarDisplay(radar)
        display.plot('reflectivity', 0, title="{} {}".format(scan.radar_id, scan.scan_time))
        display.set_limits((-150, 150), (-150, 150))
        plt.savefig(key + '.png')

    with open(key + ".png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())

    dir_name = os.getcwd()
    dir = os.listdir(dir_name)

    for item in dir:
        if item.endswith(".png"):
            os.remove(os.path.join(dir_name, item))
        if item.endswith(".gz"):
            os.remove(os.path.join(dir_name, item))

    connection_send = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel_send = connection_send.channel()

    channel_send.exchange_declare(exchange='Broker', exchange_type='direct')

    channel_send.basic_publish(exchange='Broker', routing_key='API_send', properties=pika.BasicProperties(
        headers={'key': key}  
    ), body=encoded_string)
    connection_send.close()


channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

channel.start_consuming()
