pipeline {
    agent any

    tools {
        maven 'Maven-3.9.12'
    }

    environment {
        DOCKER_BUILDKIT = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/KeerthikaReddyChalla/Capstone-Utility_Billing_System'
            }
        }

        stage('Verify Maven') {
            steps {
                bat 'mvn -version'
            }
        }

        stage('Build All Microservice JARs') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Docker Compose Down') {
            steps {
                dir('backend') {
                    bat 'docker compose down --remove-orphans || echo "Nothing to stop"'
                }
            }
        }

        stage('Docker Compose Build') {
            steps {
                dir('backend') {
                    bat 'docker compose build'
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                dir('backend') {
                    bat 'docker compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Utility Billing System deployed successfully using Docker Compose!'
        }
        failure {
            echo 'Build or deployment failed. Check logs.'
        }
    }
}
