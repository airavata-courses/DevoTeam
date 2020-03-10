## We have used ubuntu as the instance OS, all installations and scripts are tailored for ubuntu

### Ansible installation on Ubuntu
citing https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-18-04#step-1-%E2%80%94-installing-ansible for ansible installation guidelines

1) sudo apt-add-repository ppa:ansible/ansible

2) sudo apt update

3) sudo apt install ansible

4) sudo nano /etc/ansible/hosts
Paste:    
[servers]  
<master_alias> ansible_host=<master_ip>  
<slave1_alias> ansible_host=<slave_ip>  
<slave2_alias>ansible_host=<slave_ip>  

[servers:vars]  
ansible_python_interpreter=/usr/bin/python3


