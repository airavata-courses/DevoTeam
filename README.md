# DEVOTEam 

Maintainers:  
Manuja Bandal  
Sumant Gaopande  
Sainath Parkala  

## System-setup for windows OS: 

### 1) Download & install Erlang: http://erlang.org/download/otp_win64_22.2.exe  
```
Set an environment variable as: ERLANG_HOME for the installation  
directory path for eg: D:\Erlang\erl10.6    
```

### 2) Download & install RabbitMQ:  
https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2.exe  
```
Set 2 environment variables:  
- RABBITMQ_SERVER - that has the path to the installation directory  
- RABBITMQ_NODENAME - rabbit@localhost  
Append the following variable to path:  
%RABBITMQ_SERVER%\sbin      
&nbsp;open a command prompt and enter:  
i) rabbitmqctl start_app  (You should see rabbitmqctl starting up)   
ii) rabbitmqctl start_app (You should see rabbitmqctl ports in use)  

If you dont see rabbitmq running:
go to start and click on RAbbitMQ service - START then run the 2 commads mentioned above again
```

### 3) Download & install redis:
https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi  
```
- open a command prompt & navigate to that directory and:
i) run redis-server
ii) run redis-cli - type ping, you should get back a reply as pong
```

### 4) Download & Install python anaconda package:
Python-anaconda package: https://repo.anaconda.com/archive/Anaconda3-2019.10-Windows-x86_64.exe

### 5) Install pika - rabbitmq client for python  
```
pip install pika
```

### 6) Install nexradaws - python module to access Nexrad radar data 
```
pip install nexradaws
```  

### 7) Install pyart and netCDF4
```
pip install arm-pyart
pip install netCDF4
```
