FROM python:3

ADD service.py /

RUN pip install pika &&\
    pip install nexradaws 

CMD [ "python3", "./service.py"]

