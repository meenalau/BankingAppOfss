pipeline {
    agent any

    tools {
        maven 'Maven3'   // name you gave in Manage Jenkins > Tools
        jdk 'JDK17'      // name you gave in Manage Jenkins > Tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Package') {
            steps {
                sh 'mvn package -DskipTests'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    pkill -f "target/your-app.jar" || true
                    nohup java -jar target/your-app.jar > app.log 2>&1 &
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully — app is running!'
        }
        failure {
            echo 'Pipeline failed — check console output.'
        }
    }
}