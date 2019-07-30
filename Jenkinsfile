pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3050:3000'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'cd src && npm install && npm run build'
      }
    }
  }
  environment {
    CI = 'true'
  }
}