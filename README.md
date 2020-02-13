# DEVOTEam 

Maintainers:  
Manuja Bandal  
Sumant Gaopande  
Sainath Parkala  

# System-setup for windows OS:   
## Pre-requisites:   
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
### 8) Download and install NodeJS and npm
https://nodejs.org/dist/v12.16.0/node-v12.16.0-x64.msi and add installation directory to path environment variables

### 9) Download & install MongoDB
https://www.mongodb.com/download-center/community select windows x64 version and download
```
i) After installing go to services in windows and search for MongoDB, right click and click on start to start the server.
ii) Go to MongoDB Compass Community a GUI tool to interact with the MongoDB server and select New connection. Enter mongodb://localhost:27017 and connect.  
```

### 10) Donwload & install MySQL server workbench  
https://dev.mysql.com/downloads/file/?id=492814
```
1) Database Setup

Create database named devoteam_user in MySQL using command line or workbench and create table users.

CREATE TABLE users (

email varchar(45) NOT NULL,

password varchar(500) NOT NULL,

firstname varchar(45) NOT NULL,

lastname varchar(45) NOT NULL,

contact varchar(45) NOT NULL,

PRIMARY KEY (email)

);
```

### 11) Download and install JDK
https://download.oracle.com/otn-pub/java/jdk/13.0.2+8/d4173c853231432d94f001e99d882ca7/jdk-13.0.2_windows-x64_bin.exe

### 12) Download & install eclipse with springboot and Maven
https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2019-12/R/eclipse-inst-win64.exe
```
Open Eclipse IDE
Click on Help -> Eclipse marketplace->search 
select the second entry which is Spring Tools 3 Add-on for Spring Tools 4 3.9.12.CI
and install
```

## Components:
Clone Devoteam repository on your system through the zip or using git bash command  
git clone https://github.com/airavata-courses/DevoTeam.git
### 1) Data ingestion:
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam\Data_Ingestion  
python service.py
```
### 2) Model Analysis:
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam\Model_Execution
python service.py
```
### 3) Post-processing & analysis:
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam\Post_processing
python service.py
```  
### 4) Session Management:     
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam\Session_Management
npm install
node index.js
```  

### 5) API   
```
Open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam\API_gateway
npm install
npm start
```  

### 6) User Management  
```
i) Open Eclipse and select import -> existing Maven project  
ii) Navigate to the repository directory on your system and import project  
iii) Edit application properties file with correct credentials for database connectivity  
iv) Right click on the project -> Run as -> Maven Install  
v) Right click on the project -> Run as -> Maven Build -> Goals: spring-boot:run
```

### 7) User Interface
```
Open command prompt and naviagte to UI directory in the directory where you would pull the code
cd DevoTeam/UI
npm install
npm start
```
## Pre-requisites for using the System:  
1) Currently supporting only chrome browser

2) Add Moesif CORS plugin https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US 

## User interaction with the system
```
i) Sign-up and login to the system  
ii) On the main page input data in forms(for radar field you can try KLTX, KIND)
iii) Hit Find to initiate request/ get current process status/ or output plot and value if available
```

## Citations:
Citing all sources of documenation and code used to develop our system  
https://nexradaws.readthedocs.io/en/latest/Tutorial.html#Working-with-LocalNexradFile-objects  
https://data.nodc.noaa.gov/cgi-bin/iso?id=gov.noaa.ncdc:C00345  
https://redis.io/documentation  
https://www.rabbitmq.com/documentation.html  
