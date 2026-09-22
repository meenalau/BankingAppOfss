pipeline {
    agent any

    tools {
        maven 'Maven'   // must match name in Manage Jenkins > Tools
        jdk 'JDK17'      // must match name in Manage Jenkins > Tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',  credentialsId: 'github-bankingbakend-pat', url: 'https://github.com/meenalau/BankingAppOfss.git'
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                bat 'mvn test'
            }
        }

        stage('Package') {
            steps {
                bat 'mvn package -DskipTests'
            }
        }

      stage('Deploy') {
    steps {
        bat '''
            set JENKINS_NODE_COOKIE=dontKillMe
            start /B java -jar target\\account-service-0.0.1-SNAPSHOT.jar > app.log 2>&1
            ping -n 6 127.0.0.1 >nul
            echo App started, check app.log for details
        '''
    }
}
        
    }

    post {
        success {
            echo 'Pipeline completed successfully — BankingBakend is running!'
        }
        failure {
            echo 'Pipeline failed — check console output.'
        }
    }
}