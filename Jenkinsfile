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
        
    }
}
