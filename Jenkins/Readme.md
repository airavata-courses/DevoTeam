
1) Open the hosts file and enter your Jenkins master ip

2) Open a terminal and source .RC file and enter: cd /git/DevoTeam

3) ansible-playbook -i hosts /Jenkins/initial.yml

4) ansible-playbook -i hosts /Jenkins/create_jenmaster.yml
  
Verify the cluster:  
ssh ubuntu@jenkins_ip  
kubectl get nodes  
