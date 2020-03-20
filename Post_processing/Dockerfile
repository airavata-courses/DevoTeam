FROM python:3

ADD service.py /

RUN pip install pika &&\
    pip install nexradaws &&\
    pip install netCDF4 &&\
    pip install scipy &&\
    pip install matplotlib &&\
    pip install pandas &&\
    pip install numpy &&\
    pip install Pillow &&\
    pip install arm-pyart  

CMD [ "python3", "./service.py"]
