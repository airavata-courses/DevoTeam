openstack server create Devoteam-slave-1 --flavor m1.small --image 0d13b72c-db35-439f-9118-2946148eb5c6 --key-name ${OS_USERNAME}-api-key --security-group ${OS_USERNAME}-global-ssh --nic net-id=${OS_USERNAME}-api-net

openstack floating ip create public

echo "Please enter your floating ip address:"
read -sr FLOATING_IP
openstack server add floating ip Devoteam-slave-1 $FLOATING_IP

ssh -i ${OS_USERNAME}-api-key ubuntu@$FLOATING_IP
