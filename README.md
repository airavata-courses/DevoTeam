# DEVOTEam 


Team Members:

Manuja Bandal

Sumant Gaopande

Sainath Parkala

##System-setup for windows OS: 
1) Download & install Erlang: http://erlang.org/download/otp_win64_22.2.exe
Set an environment variable as: ERLANG_HOME for the installation directory path for eg: D:\Erlang\erl10.6  
2) Download & install RabbitMQ:
Download https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2.exe  
Set 2 environment variables:  
- RABBITMQ_SERVER - that has the path to the installation directory  
- RABBITMQ_NODENAME - rabbit@localhost
Append the following variable to path:
%RABBITMQ_SERVER%\sbin
