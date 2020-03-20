node {
    stage('Code checkout') {
        checkout scm
    }

    stage('Build image') {
       sh '''
       sudo docker build -t devoteam1/devoteam:user_man /UI
       sudo docker login --username=devoteam1 --password=team@1234
       sudo docker push devoteam1/devoteam:user_man
       '''
   }
   
}
