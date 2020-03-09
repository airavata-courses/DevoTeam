## Citing: https://iujetstream.atlassian.net/wiki/spaces/JWT/overview for commands and information
### Create instances using the scripts in this folder

1) Go to https://iu.jetstream-cloud.org/ and sign-in with your credentials
2) Download the v3 RC file for project allocation TG-CCR180043
3) Open a terminal in Linux and naviagte to the directory where TG-CCR180043 RC file is present
4) install openstack client - pip install python-openstackclient
5) source <RC_FILE>

### If you dont have your keys installed and copied in ~/.ssh already do this:
1) openstack security group create --description "ssh & icmp enabled" ${OS_USERNAME}-global-ssh
2) openstack security group rule create --protocol tcp --dst-port 22:22 --remote-ip 0.0.0.0/0 ${OS_USERNAME}-global-ssh
3)  openstack security group rule create --protocol icmp ${OS_USERNAME}-global-ssh
4) ssh-keygen -b 2048 -t rsa -f ${OS_USERNAME}-api-key -P ""
5) openstack keypair create --public-key ${OS_USERNAME}-api-key ${OS_USERNAME}-api-key
6) Navigate to cd ~/.ssh in a terminal
7) Replace the id_rsa & id_rsa.pub files with the keys generated in the above steps.


###If you dont have a networked configured:
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

