# DEVOTEam 


Team Members:

Manuja Bandal

Sumant Gaopande

Sainath Parkala

## System-setup for windows OS: 
1) Download & install Erlang: http://erlang.org/download/otp_win64_22.2.exe  
&nbsp;&nbsp;Set an environment variable as: ERLANG_HOME for the installation directory path for eg: D:\Erlang\erl10.6    
2) Download & install RabbitMQ:  
&nbsp;&nbsp;Download https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.2/rabbitmq-server-3.8.2.exe  
&nbsp;&nbsp;Set 2 environment variables:  
&nbsp;&nbsp;- RABBITMQ_SERVER - that has the path to the installation directory  
&nbsp;&nbsp;- RABBITMQ_NODENAME - rabbit@localhost  
&nbsp;&nbsp;Append the following variable to path:  
&nbsp;&nbsp;%RABBITMQ_SERVER%\sbin      
&nbsp;&nbsp;&nbsp;open a command prompt and enter:  
&nbsp;&nbsp;&nbsp;&nbsp;i) rabbitmqctl start_app  (You should see rabbitmqctl starting up)   
&nbsp;&nbsp;&nbsp;&nbsp;ii) rabbitmqctl start_app (You should see rabbitmqctl ports in use)  

&nbsp;&nbsp;If you dont see rabbitmq running:
&nbsp;&nbsp;go to start and click on RAbbitMQ service - START then run the 2 commads mentioned above again

&nbsp;&nbsp;3) Download & install redis:
&nbsp;&nbsp;https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi
&nbsp;&nbsp;- open a command prompt & navigate to that directory and:
&nbsp;&nbsp;i) run redis-server
&nbsp;&nbsp;ii) run redis-cli - type ping, you should get back a reply as pong
