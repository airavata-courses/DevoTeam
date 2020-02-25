# DEVOTEam 

Maintainers:  
Manuja Bandal  
Sumant Gaopande  
Sainath Parkala  

# System overview:
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/Architecture.png)

# System-setup for Linux OS:   
## Pre-requisites for using the System:  
1) Currently supporting only chrome browser : To install -> https://www.google.com/chrome/browser/desktop/index.html

2) Add Moesif CORS plugin https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US 
### 1) Install Erlang and RabbitMQ:  
- Copy the below shell code snippet and paste to a file called install.sh  
- Open  a terminal and navigate to the destination where you created install.sh
- enter command bash install.sh 
```
#!/bin/sh

## If sudo is not available on the system,
## uncomment the line below to install it
# apt-get install -y sudo

sudo apt-get update -y

## Install prerequisites
sudo apt-get install curl gnupg -y

## Install RabbitMQ signing key
curl -fsSL https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc | sudo apt-key add -

## Install apt HTTPS transport
sudo apt-get install apt-transport-https

## Add Bintray repositories that provision latest RabbitMQ and Erlang 21.x releases
sudo tee /etc/apt/sources.list.d/bintray.rabbitmq.list <<EOF
## Installs the latest Erlang 22.x release.
## Change component to "erlang-21.x" to install the latest 21.x version.
## "bionic" as distribution name should work for any later Ubuntu or Debian release.
## See the release to distribution mapping table in RabbitMQ doc guides to learn more.
deb https://dl.bintray.com/rabbitmq-erlang/debian bionic erlang
deb https://dl.bintray.com/rabbitmq/debian bionic main
EOF

## Update package indices
sudo apt-get update -y

## Install rabbitmq-server and its dependencies
sudo apt-get install rabbitmq-server -y --fix-missing
```

Open a terminal and enter:  
i) sudo rabbitmqctl start_app  (You should see rabbitmqctl starting up)   
ii) sudo rabbitmqctl status (You should see rabbitmqctl ports in use)  

### 2) Download & install redis:
```
- open a terminal:
i) sudo apt install redis-server
ii) gedit admin:///etc/redis/redis.conf find keyword 'supervised'  
you will see 'supervised no' change it to 'supervised systemd'
ii) sudo systemctl restart redis.service
```

### 3) Download & Install python3, pip3 and numpy:
```
i) sudo apt install python3-pip  
ii) Usually ubuntu 18.04 comes with python3 preinstalled if not open a terminal and enter:  
sudo apt-get install python3
ii) sudo pip3 install numpy
```

### 5) Install pika - rabbitmq client for python  
```
pip3 install pika
```

### 6) Install nexradaws - python module to access Nexrad radar data 
```
pip3 install nexradaws
```  

### 7) Install pyart, netCDF4, scipy, matplotlib, pandas:
Open a terminal and enter:  
```
pip3 install arm-pyart
pip3 install netCDF4
pip3 install scipy
pip3 install matplotlib
pip3 install pandas
```
### 8) Download and install NodeJS and npm
```
i) sudo apt-get install nodejs
ii) sudo apt-get install npm
```

### 9) Install MongoDB
```
i) sudo apt install -y mongodb
ii) sudo systemctl start mongodb
```

### 10) Donwload & install MySQL server workbench  
https://dev.mysql.com/downloads/file/?id=492814
```
1. Install the MySQL server by using the Ubuntu operating system package manager: 
Command :-       sudo apt-get install mysql-server
2. After the installation is complete, you can start the database service by running the following command. If the service is already started, a message informs you that the service is already running:
Command:- sudo systemctl start mysql
3. At the command prompt, run the following command to launch the mysql shell and enter: 
Command:- sudo mysql -u root -p
4. When you’re prompted for a password press Enter to submit no password.
The following mysql shell prompt should appear:
mysql>
5. If you logged in by entering a blank password, you have to create the password.  
For versions earlier than MySQL 5.7, enter the following command in the mysql shell, replace password with your new password:
UPDATE mysql.user SET Password = PASSWORD('password') WHERE User = 'root';  
For version MySQL 5.7 and later, enter the following command in the mysql shell, replacing password with your new password:  
UPDATE mysql.user SET authentication_string = PASSWORD('password') WHERE User = 'root';  
6. To make the change take effect, reload the stored user information with the following command:
FLUSH PRIVILEGES;
7. Type Command: CREATE DATABASE devoteam_user;
8. Use database :
use devoteam_user;
9. Create Table:
CREATE TABLE users (

email varchar(45) NOT NULL,

password varchar(500) NOT NULL,

firstname varchar(45) NOT NULL,

lastname varchar(45) NOT NULL,

contact varchar(45) NOT NULL,

PRIMARY KEY (email)

);
```

### 11) Download and install JDK, JRE and maven
i) sudo apt install default-jre
ii) sudo apt install default-jdk
iii) sudo gedit ~/.bashrc and append the following to the end of the file:   
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
PATH=$PATH:$JAVA_HOME/bin
iv) gedit /etc/environment and remove anything else in the file and copy paste the following:   
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"  
PATH=$PATH:$JAVA_HOME/bin  
v) sudo apt-get install maven  

## Components:
Clone Devoteam repository on your system through the zip or using git bash command  
git clone https://github.com/airavata-courses/DevoTeam.git
### 1) Data ingestion:
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam/Data_Ingestion  
python3 service.py
```
### 2) Model Analysis:
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam/Model_Execution
python service.py
```
### 3) Post-processing & analysis:
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam/Post_processing
python service.py
```  
### 4) Session Management:     
```
open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam/Session_Management
npm install
node index.js
```  

### 5) API   
```
Open a command prompt and navigate to the directory where you cloned the repository  
cd DevoTeam/API_gateway
npm install
npm start
```  

### 6) User Management  
```
i) Naviagate to application.properties file: cd DevoTeam/User_Management/src/main/resources  
Open the application.properties file and change the password to the password you set above.
```

### 7) User Interface
```
Open command prompt and naviagte to UI directory in the directory where you would pull the code
cd DevoTeam/UI
npm install
npm start
```


## User interaction with the system
```
The system web app should be running on localhost:3000
i) Sign-up and login to the system  
ii) On the main page input data in the following format:
- year input format: Mention the complete year like 2020 or 2016 etc.  
- month input format: it is a 2 digit entry field - 01 or 11  
- day input format: it is a 2 digit entry field - 01 or 25  
- radar: input to be bold KLTX / KIND / KAMA  
iii) while plot is not displayed:  
          Hit Find(Do not change page or navigate elsewhere)
```

## Citations:
Citing all sources of documenation and code used to develop our system  
https://nexradaws.readthedocs.io/en/latest/Tutorial.html#Working-with-LocalNexradFile-objects  
https://data.nodc.noaa.gov/cgi-bin/iso?id=gov.noaa.ncdc:C00345  
https://redis.io/documentation  
https://www.rabbitmq.com/documentation.html  
