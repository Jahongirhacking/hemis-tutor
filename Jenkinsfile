pipeline {
    agent any
    
    stages {
        stage('tyutor.hemis.uz update') {
            steps {
                sh 'ansible-playbook /var/lib/jenkins/ansible/tyutor_hemis.yaml -l my_hemis'
            }
        }
    }
}
