## Part-1 Installing and configuring Istio Service mesh with system deployed in assignment 2:
### Installing helm and Tiller
citing: https://www.digitalocean.com/community/tutorials/how-to-install-software-on-kubernetes-clusters-with-the-helm-2-package-manager

ssh into the Kubernetes master node on Jetstream: 
1) Install Helm on the Kubernetes master node:
```
$ cd /tmp
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > install-helm.sh
$ chmod u+x install-helm.sh
$ ./install-helm.sh
```
2) Install Tiller:
Create a service account:
```
$ kubectl -n kube-system create serviceaccount tiller
```
Bind to cluster admin role:
```
$ kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
```
Install Tiller in the cluster
```
$ helm init --service-account tiller
```
Verify Tiller pod in the cluster:
```
$ kubectl get pods --namespace kube-system
```
### Install Istio on Kubernetes
ssh into the Kubernetes master:
```
$ curl -L https://istio.io/downloadIstio | sh -
$ cd istio-1.5.2
```
Add istioctl to path
```
$ export PATH=$PWD/bin:$PATH
```
Create namespace for istio
```
$ kubectl create namespace istio-system
```
Create CRD's(source: https://github.com/knative/test-infra/pull/211)
```
$ helm template install/kubernetes/helm/istio-init --name istio-init --namespace istio-system | kubectl apply -f -
```
navigate to the istio directory
```
$ helm template install/kubernetes/helm/istio --name istio \ --set global.mtls.enabled=false \ --set tracing.enabled=true \ --set kiali.enabled=true \--set grafana.enabled=true \--namespace istio-system > istio.yaml
```
apply the created istio.yaml to the cluster
```
$ kubectl apply -f istio.yaml
```

### Injecting side-car proxies
With this command any pod deployed in the Kubernetes default namespace of the cluster will have a side-car proxy configured with it in the same pod
```
kubectl label namespace default istio-injection=enabled
```

### Configuring Kiali
1) Create a secret
```
$ KIALI_USERNAME=$(read -p 'Kiali Username: ' uval && echo -n $uval | base64)
$ KIALI_PASSPHRASE=$(read -sp 'Kiali Passphrase: ' pval && echo -n $pval | base64)


$ cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: kiali
  namespace: istio-system
  labels:
    app: kiali
type: Opaque
data:
  username: $KIALI_USERNAME
  passphrase: $KIALI_PASSPHRASE
EOF
```
3) Verify installation
```
$ kubectl -n istio-system get service kiali
```

4) Handling Jetstrem public ip issue:
First convert the service to LoadBalancer:
```
$ kubectl patch service kiali --patch '{"spec":{"type":"LoadBalancer"}}' -n istio-system
```
Get port
```
$ kubectl -n istio-system get service kiali -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
$ kubectl -n istio-system get service kiali -o jsonpath='{.spec.ports[?(@.name=="http-kiali")].port}'
```
Now you can see the port that has been mapped
```
$ kubectl -n istio-system get service kiali
```
Go to k8's_master_ip:exposed_port/kiali to view the kiali dashboard

### Configuring Grafana
Verify Grafana service
```
kubectl -n istio-system get service grafana
```

4) Handling Jetstrem public ip issue:
First convert the service to LoadBalancer:
```
$ kubectl patch service grafana --patch '{"spec":{"type":"LoadBalancer"}}' -n istio-system
```
Get port
```
$ kubectl -n istio-system get service grafana -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
$ kubectl -n istio-system get service grafana -o jsonpath='{.spec.ports[?(@.name=="http-grafana")].port}'
```
Now you can see the port that has been mapped
```
$ kubectl -n istio-system get service grafana
```
Go to k8's_master_ip:exposed_port to view the grafana dashboard

## Part-2 Exploring Deployments with Istio:
Using Istio we can define an Ingress http-gateway that can be used as a pivot to direct controlled traffic to specific components of a system using a virtual service. To try a canary deployment try the following steps:


