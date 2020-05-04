## Final Problem Statement:
To investigate if Istio can be used as a service mesh technology to our existing system; and if using it would help us tackle the issues we faced during Assignment 1 & 2 which are:
- During load testing using Jmeter, our system would fail at around 1000 users which we suspect was due to improper traffic management. We would like to analyse the system with istio and investigate if configuring it helps with the overall stability of the system.
- Finding points of failures was very difficult as it would require checking logs of individual pods in the Kubernetes cluster. This is particularly difficult to do when multiple components are involved. We would like to investigate if Istio can be used with Grafana and Kiali dashboards to monitor logs and health of various components. 
- Checking the complete system behavior for different versions of the services was difficult to implement as it would require making changes in the Kubernetes deployment .yaml files at a time for a particular version. In production, directly rolling out a component without verifying it's complete behaviour is risky. Observing the behavior of multiple versions of components in the system was tedious. We would like to investigate if Istio makes this easier and try a canary deployment for our api gateway.
- Security was a major issue that would stop our system from being production ready. The current system is vulnerable to security threats such as Man in the middle attacks and Denial of service attacks. We would like to investigate if Istio's security layer can be of benefit here.

## Differences from Initial Problem Statement:
- During the implementation and configuration of Istio on our system, as well as the interactions we had during the lectures we realised that Istio is not a sure shot solution to having a perfect Control Plane and Data Plane to a Distributed System as it is advertised in the documentation and various blog posts on the internet. We were more skeptical about its features and value it brought to the system as a whole without implementing it first.

## Problem Statement Development:
- As service mesh was a new concept to us we started with understanding what a service mesh is. 
- We referred various blogs and videos to understand the working of service meshes in general.
- We looked at 2 service mesh technologies specifically -   
1) Istio     
2) Linkerd 
- We decided to go ahead with Istio as we thought looking at a particular technology in detail would help us understand things better and derive maximal learning out of it 
- We also referred a lot of videos like conference demos and cloud native tutorials, few of them are noted below:  
  
https://www.youtube.com/watch?v=6zDrLvpfCK4  
https://www.youtube.com/watch?v=1iyFq2VaL5Y  
https://www.youtube.com/watch?v=9CQ0PMiOGhg&t=923s  
- We also looked at MFT to decide between MFT and service mesh.
- Referred the dev mailing list mail chains as a lot of people were posting on the list with common queries.
- We tried running MFT for local to local transport using fork https://github.com/pokearu and making a few changes to it.
- We referred this document to understand MFT design in general https://docs.google.com/document/d/1zrO4Z1dn7ENhm1RBdVCw-dDpWiebaZEWy66ceTWoOlo/edit#heading=h.wn0b4rfo20cj

## Methodology, Implementation & Evaluation:
### We started with configuring Istio to our system on Jetstream and exposing Grafana and Kiali dashboards:
- Please find our installation documentation in the Develop branch ReadMe: https://github.com/airavata-courses/DevoTeam/blob/Develop/README.md
- Kiali: http://149.165.169.244:32351/kiali/  
Kiali login credentials:  
```
username: admin  
password: admin  
```
- Grafana: http://149.165.169.244:32132/    

###  Analysis of Kiali and Grafana to see if it helps with better observability:
The screenshots were recorded during the jmeter testing of our system. To view those results please visit https://github.com/airavata-courses/DevoTeam/blob/Develop/Jmeter.md  
- We definitely think it helps with easier log access and thus giving better observability. As you find below is a screenshot of our api gateway recieving hits and we observing it directly through kiali.
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/kiali_logs_api.png)
 
- Kiali also gives a graphical view of the complete system with health status checks and live traffic information.
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/graph.png)

- Grafana does help with real time monitoring of the traffic but it is not very user-friendly and to derive meaning out of it is a bit difficult. Here is a grafana screenshot when we were making multiple requests to our system.
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/1000_replica_1.png)

### Exploring Deployments with Istio:
- Using Istio we can define an Ingress http-gateway that can be used as a pivot to direct controlled traffic to specific components of a system using a virtual service. To try a canary deployment with our system try the following steps with our api gateway:
Initial system:
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/base_system.png)

- git clone the Develop branch
- ssh into the kubernetes master: 149.165.169.244
- Deploy the second version of the api that returns a default precipitation image plot:
```
$ kubectl aaply -f api_canary.yaml
```
- Deploy the gateway:
```
$ kubectl aaply -f gateway_canary.yaml
```
- Add destination rule and a virtual service:
```
$ kubectl aaply -f virtualservice_canary.yaml
```
Canary deployment: 
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/canary.png)

- We tried this with various weights, for example api version 1 getting 75% of the requests and version 2 getting 25% of the requests.
- You can visualise this and validate your deployment with kiali.
- You can also manually validate this by making hits to our system majority of the times api version 1 response is served.  
  
![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/canary_weights.png)

![alt text](https://github.com/airavata-courses/DevoTeam/blob/Develop/api_versions.png) 

### Security aspects of Istio:
- Istio does provide lot of security features as well with mutual TLS and traffic routing to specific tenants and allowing JWT token access only.
- We looked at a scenario where we can block all access to our system through our api
kubectl apply -f deny_all.yaml
try hitting the api or making request through the UI they will fail.
API details:
endpoint ip: http://149.165.169.244:30000/weather
JSON body:
{"email":"abc@gmail.com", "year":"2019", "month":"04", "day":"02","radar":"KIND", "t_id":"wdadaawrw"} 

- We also investigated allowing only JWT token access to the system. We did not achieve expected behaviour as we were still able to hit the api.

### Conclusions and Outcomes:
As said earlier, we were more skeptical about Istio as a service mesh and tha helped us learn more about it and derive meaning as to if it can be really used to the benefit of the overall system. We conclude that it is not a silver bullet for the complications or problems we faced with our system.
Based on our evaluations we conclude the following:
1) Istio is not a service mesh that can be directly applied to an existing Distributed system without making a few changes. We had to make changes to our codebase and containers to make it work. If you look at https://github.com/airavata-courses/DevoTeam/issues/67 it really explains how adding another layer makes things crash the way our rabbit server became unavailable. Another issue we faced was the API gateway not connecting to redis and failing intermittently. If you look at the comments of https://github.com/airavata-courses/DevoTeam/issues/65 we need to think about the service mesh implementation when coding our services. But I do agree that other than these issues it was very straight forward to inject envoy proxies as side-cars to each service. With increasing components and scaling demands coding a system thinking of it being potentially integrated with a service mesh is understandable.
2) In terms of observability and traffic management we conclude that istio did help us visualise and understand our system better. We tested it with Jmeter and observed better results. Please check them at https://github.com/airavata-courses/DevoTeam/blob/Develop/Jmeter.md and check https://github.com/airavata-courses/DevoTeam/issues/66 for the analysis.
