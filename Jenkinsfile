pipeline {
    agent any
    environment {
        HOST_IP = '192.168.1.50'
        PROJECT_DIR = '/home/fsadmin/toolbox-fs'
    }
    stages {
        stage('Desplegar en Producción') {
            steps {
                sh """
                ssh -i /var/jenkins_home/.ssh/id_ed25519 -o StrictHostKeyChecking=no fsadmin@${HOST_IP} '
                    cd ${PROJECT_DIR} &&
                    git pull origin main &&
                    docker compose up -d --build
                '
                """
            }
        }
    }
}