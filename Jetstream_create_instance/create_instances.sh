#Create instance for jenkins master
openstack server create Jenkins_master_Devoteam --flavor m1.small --image 0d13b72c-db35-439f-9118-2946148eb5c6 --key-name ${OS_USERNAME}-api-key --security-group ${OS_USERNAME}-global-ssh --nic net-id=${OS_USERNAME}-api-net

openstack floating ip create public

echo "Please enter your floating ip address:"
read -sr FLOATING_IP
openstack server add floating ip Jenkins_master_Devoteam $FLOATING_IP

# Create instance for Kubernetes master
openstack server create <master_alias> --flavor m1.small --image 0d13b72c-db35-439f-9118-2946148eb5c6 --key-name ${OS_USERNAME}-api-key --security-group ${OS_USERNAME}-global-ssh --nic net-id=${OS_USERNAME}-api-net

openstack floating ip create public

echo "Please enter your floating ip address:"
read -sr FLOATING_IP
openstack server add floating ip <master_alias> $FLOATING_IP

# Create instances for worker nodes
openstack server create <slave_alias> --flavor m1.small --image 0d13b72c-db35-439f-9118-2946148eb5c6 --key-name ${OS_USERNAME}-api-key --security-group ${OS_USERNAME}-global-ssh --nic net-id=${OS_USERNAME}-api-net

openstack floating ip create public

echo "Please enter your floating ip address:"
read -sr FLOATING_IP
openstack server add floating ip <slave_alias> $FLOATING_IP

openstack server create <slave_alias> --flavor m1.small --image 0d13b72c-db35-439f-9118-2946148eb5c6 --key-name ${OS_USERNAME}-api-key --security-group ${OS_USERNAME}-global-ssh --nic net-id=${OS_USERNAME}-api-net

openstack floating ip create public

echo "Please enter your floating ip address:"
read -sr FLOATING_IP
openstack server add floating ip <slave_alias> $FLOATING_IP

