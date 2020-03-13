pipeline {
   agent any
   stages {
        stage('Build User_Management Service') {
            steps {
                sh 'mvn -f User_Management/pom.xml clean package'
            }
            post {
                success {
                    echo "Archiving...."
                    archiveArtifacts artifacts: '**/*.jar'
                }
            }
        }
        stage('Install dependencies for UI (Node)') {
            steps {
                dir('UI/') {
                       checkout scm
                       sh 'npm install'
                }   
            }
        }
        stage('Test UI') {
            steps {
                 dir('UI/') {
                       checkout scm
                       sh 'npm test'
                 }
            }
        }  
        stage('Build Data_Ingestion Service') {
            steps {
                   dir('Data_Ingestion/') {
                       checkout scm
                 sh ''
                  }
            }
        }  
        stage('Test Data_Ingestion Service') {
            steps {
                dir('Data_Ingestion/') {
                       checkout scm
                sh ''
                }    
            }  
        }
         
        stage('Build Model_Execution Service') {
            steps {
                   dir('Model_Execution/') {
                       checkout scm
                 sh ''
                  }
            }
        }
       
        stage('Test Model_Execution Service') {
            steps {
                dir('Model_Execution/') {
                       checkout scm
                sh ''
                }    
            }  
        }
           
        stage('Build Post-Processing Service') {
            steps {
                   dir('Post_processing/') {
                       checkout scm
                 sh ''
                  }
            }
        }
        stage('Test Post-Processing Service') {
            steps {
                dir('Post_processing/') {
                       checkout scm
                sh ''
                }    
            }  
        }
        stage('Build API_gateway Service') {
            steps {
                dir('API_gateway/'){
                       checkout scm
                sh ''
                }
            }
        }
        stage('Test API_gateway Service'){
            steps {
                dir('API_gateway/'){
                       checkout scm
                sh ''
                }
            }
        }
        stage('Build Session_Management Service') {
            steps {
                dir('Session_Management/') {
                        checkout scm
                sh ''
                }
            }
        }
        stage('Test Session_Management Service') {
            steps {
                dir('Session_Management/') {
                       checkout scm
                sh ''
                }
            }
        }
    }
}
