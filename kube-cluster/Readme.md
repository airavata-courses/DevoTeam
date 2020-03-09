### Citing https://www.digitalocean.com/community/tutorials/how-to-create-a-kubernetes-cluster-using-kubeadm-on-ubuntu-18-04
for kubernetes installation guidelines and scripts for installation

1) Open the hosts file and enter your master and slave ip's

2) Open a terminal and source .RC file and enter: cd /git/DevoTeam

3) ansible-playbook -i hosts /kube-cluster/initial.yml

4) ansible-playbook -i hosts /kube-cluster/kube-dependencies.yml

5) ansible-playbook -i hosts /kube-cluster/master.yml

6) ansible-playbook -i hosts /kube-cluster/workers.yml
  
Verify the cluster:  
ssh ubuntu@master_ip  
kubectl get nodes  
