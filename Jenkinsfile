pipeline {
   agent any
   stages {
      stage('Install docker'){
         steps{
            sh '''
                  sudo apt --assume-yes install docker.io
                  sudo systemctl start docker
                  sudo systemctl enable docker
                  python -m pip uninstall -y urllib3
  		            python -m pip install urllib3==1.22
              '''
         }
      }
        stage('Build User_Management Service') {
            steps {
                dir('User_Management/') {
                       
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:user_man .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:user_man
                       '''
                }   
            }
        }

        stage('Build UI Service') {
            steps {
                dir('UI/') {
                       
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:ui .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:ui
                       '''
                }   
            }
        }
   
        stage('Build API Service') {
            steps {
                dir('API_gateway/') {
                      
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:API .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:API
                       '''
                }   
            }
        }
   
        stage('Build Data Ingestion Service') {
            steps {
                dir('Data_Ingestion/') {
                       
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:Data_Ingestion .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:Data_Ingestion
                       '''
                }   
            }
        }
   
        stage('Build Model Execution Service') {
            steps {
                dir('Model_Execution/') {
                       
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:Model_Execution .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:Model_Execution
                       '''
                }   
            }
        }
   
        stage('Build Post Processing Service') {
            steps {
                dir('UI/') {
                       
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:Post_processing .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:Post_processing
                       '''
                }   
            }
        }
   
        stage('Build redis Service') {
            steps {
                dir('redis/') {
                       
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:redis .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:redis
                       '''
                }   
            }
        }
   
        stage('Build Session Management Service') {
            steps {
                dir('Session_Management/') {
                      
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:session .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:session
                       '''
                }   
            }
        }
   
        stage('Build RabbitMQ Server') {
            steps {
                dir('rabbit_server/') {
                      
                       sh '''
                       sudo docker build --no-cache -t devoteam1/devoteam:rabbit_server .
                       sudo docker login --username=devoteam1 --password=team@1234
                       sudo docker push devoteam1/devoteam:rabbit_server
                       '''
                }   
            }
        }
      
      stage('Deploy to K8s'){
         steps{
            dir('kube_deployment_yaml_files/') {
            sh '''
            sudo ssh -i id_rsa ubuntu@149.165.169.244 "rm -rf DevoTeam &&
            sudo apt install gnupg2 pass -y &&
            sudo docker login --username=devoteam1 --password=team@1234 &&
            sudo apt install git -y &&
            git clone https://github.com/airavata-courses/DevoTeam.git &&
            cd DevoTeam &&
            git checkout Milestone-2 &&
            cd kube_deployment_yaml_files &&
            kubectl apply -f redis-deployment.yaml &&
            kubectl apply -f redis-service.yaml &&
            kubectl apply -f rabbit-deployment.yaml &&
            kubectl apply -f rabbit-service.yaml &&
            kubectl apply -f mysqldb-deployment.yaml &&
            kubectl apply -f mysqldb-service.yaml &&
            kubectl apply -f mongo-deployment.yaml &&
            kubectl apply -f mongo-service.yaml &&
            kubectl apply -f ui-deployment.yaml &&
            kubectl apply -f ui-service.yaml &&
            kubectl apply -f user-management-Deployment.yaml &&
            kubectl apply -f user-management-service.yaml &&
            kubectl apply -f session-deployment.yaml &&
            kubectl apply -f session-service.yaml &&
            kubectl apply -f data-ingestion-deployment.yaml &&
            kubectl apply -f model-exec-deployment.yaml &&
            kubectl apply -f post-processing-deployment.yaml &&
            kubectl apply -f api-deployment.yaml &&
            kubectl apply -f api-service.yaml"
            '''
            }
         }
      }
        
    }
}
