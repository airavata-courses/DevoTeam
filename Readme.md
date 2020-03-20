## We have used ubuntu as the instance OS, all installations and scripts are tailored for ubuntu

### STEP 1: Ansible installation on host - Ubuntu
citing https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-18-04#step-1-%E2%80%94-installing-ansible for ansible installation guidelines

1) sudo apt-add-repository ppa:ansible/ansible

2) sudo apt update

3) sudo apt install ansible

4) sudo nano /etc/ansible/hosts  
Paste:    
```
[servers]  
<master_alias> ansible_host=<master_ip>  
<slave1_alias> ansible_host=<slave_ip>  
<slave2_alias>ansible_host=<slave_ip>  

[servers:vars]  
ansible_python_interpreter=/usr/bin/python3
```

### STEP 2: Create Jetstream instances for 1 Kubernetes master and 2 workers and 1 Jenkins master 
#### Citing: https://iujetstream.atlassian.net/wiki/spaces/JWT/overview for commands and information
#### Create instances using the scripts in the folder Jetstream_create_instance  
1) Go to https://iu.jetstream-cloud.org/ and sign-in with your credentials
2) Download the v3 RC file for project allocation TG-CCR180043
3) Open a terminal in Linux and naviagte to the directory where TG-CCR180043 RC file is present
4) install openstack client - pip install python-openstackclient
5) source <RC_FILE>

### If you dont have your keys installed and copied in ~/.ssh already do this:
1) openstack security group create --description "ssh & icmp enabled" ${OS_USERNAME}-global-ssh
2) openstack security group rule create --protocol tcp --dst-port 1:65535 --remote-ip 0.0.0.0/0 ${OS_USERNAME}-global-ssh
3) openstack security group rule create --protocol udp --dst-port 1:65535 --remote-ip 0.0.0.0/0 ${OS_USERNAME}-global-ssh
4) openstack security group rule create --protocol icmp ${OS_USERNAME}-global-ssh
5) ssh-keygen -b 2048 -t rsa -f ${OS_USERNAME}-api-key -P ""
6) openstack keypair create --public-key ${OS_USERNAME}-api-key ${OS_USERNAME}-api-key
7) Navigate to cd ~/.ssh in a terminal
8) Replace the id_rsa & id_rsa.pub files with the keys generated in the above steps.

### If you dont have a network configured:
1) openstack network create ${OS_USERNAME}-api-net

2) Verify that the private network was created	
   openstack network list

3) Create a subnet within the private network space	
   openstack subnet create --network ${OS_USERNAME}-api-net --subnet-range 10.0.0.0/24 ${OS_USERNAME}-api-subnet1

4) Verify that subnet was created	
   openstack subnet list
   
   Create a router	
   openstack router create ${OS_USERNAME}-api-router

   Connect the newly created subnet to the router
   openstack router add subnet ${OS_USERNAME}-api-router ${OS_USERNAME}-api-subnet1

   Connect the router to the gateway named "public"	
   openstack router set --external-gateway public ${OS_USERNAME}-api-router

   Verify that the router has been connected to the gateway	
   openstack router show ${OS_USERNAME}-api-router

#### Creating instances:
#### Open create_instances.sh file and replace the <master_alias>, <slave_alias_1>, <slave_alias_2> and <Jenkins_alias> with a name of your choice to identify your intsances uniquely.  
1) source <RC_FILE>
2) git clone "https://github.com/airavata-courses/DevoTeam.git" and checkout Milestone-2 branch 
3) run create_instances.sh using:  
```
bash create_instances.sh
```
and enter the floating ip when prompted(Dont make a mistake in this otherwise an ip will not be assigned to the instance)
If you enter the ip incorrectly run this in a terminal after sourcing .RC file: openstack server add floating ip <alias> <FLOATING_IP>

### STEP 3: Installing Kubernetes on the instances using ansible scripts:
#### Citing https://www.digitalocean.com/community/tutorials/how-to-create-a-kubernetes-cluster-using-kubeadm-on-ubuntu-18-04
for kubernetes installation guidelines and scripts for installation
pre-requisite: git clone "https://github.com/airavata-courses/DevoTeam.git" and checkout Milestone-2 branch   
1) Open the hosts file and enter your master and slave ip's

2) Open a terminal and source .RC file and enter: cd /git/DevoTeam

3) ansible-playbook -i hosts /kube-cluster/initial.yml

4) ansible-playbook -i hosts /kube-cluster/kube-dependencies.yml

5) ansible-playbook -i hosts /kube-cluster/master.yml

6) ansible-playbook -i hosts /kube-cluster/workers.yml
  
Verify the cluster:  
ssh ubuntu@master_ip  
kubectl get nodes  

### STEP 4: Install and confiure Jenkins on the instance
pre-requisite: git clone "https://github.com/airavata-courses/DevoTeam.git" and checkout Milestone-2 branch   
1) Open the hosts file and enter your Jenkins master ip

2) Open a terminal and source .RC file and enter: cd /git/DevoTeam

3) ansible-playbook -i hosts /Jenkins/initial.yml

4) ansible-playbook -i hosts /Jenkins/create_jenmaster.yml

5) Now go to your ip:8080 (default port) and it will prompt you for an administartor password

6) ssh into your Jenkins instance and run:
```
cat /var/lib/jenkins/secrets/initialAdminPassword
```
Copy this and paste into the browser

7) Go to Global Tool Configuration in Manage Jenkins and set values for JDK and git:
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Milestone-2/JenkinsGlobalConfig.PNG)

8) Install Github integration plugin and Job DSL plugin:
```
i) Manage Jenkins->Manage Plugins-> Available ==> search Github integration and install  
ii) Manage Jenkins->Manage Plugins-> Available ==> search Job DSL and install
```

### STEP 5: Create Jenkins Pipeline
i) New iterm-> Select Pipeline ->Give a name-> Click Ok  
ii) Under the pipeline section -> Select Pipeline script from SCM  
iii) Under build trigger section select poll scm -> add  
```
* * * * *
```  
to Schedule this enables it to trigger a build on every commit 
iv) Under SCM-> Select Git-> add repo url and branch(Milestone-2)-> Apply

### STEP 6: Deploying the system:
Go to your Jenkins job and trigger build now OR Make a dummy commit to (Milestone-2)branch to auto-trigger it

### To check the system:
ssh ubunut@<master_ip>  
kubectl get pods  
kubectl get deployments  
kubectl get services  

### Current system ips:  
To check currently deployed system: http://149.165.169.244:31515/   
Jenkins master: 149.165.169.235:8081 username: Manuja password: manuja17  
Kubernetes master: 149.165.169.244  
Kubernetes slave1: 149.165.170.1  
Kubernetes slave1: 149.165.170.15  
