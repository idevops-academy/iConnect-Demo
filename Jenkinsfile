pipeline {
    agent any
    environment{
        MY_NAME="shaik"
    }
    tools {
        nodejs 'nodev14' 
    }

    stages {
        stage('Build') {
            steps {
                echo 'Build Project, Run Unit Tests & Package'
                git branch: 'main', url: 'https://github.com/idevops-academy/iConnect-Demo.git'
                sh '''
                    npm install
                    npm run test
                ''' 
                junit testResults: "junit.xml"
                step([
                    $class:'CloverPublisher',
                    cloverReportDir: 'coverage',
                    cloverReportFileName: 'coverage/clover.xml',
                    healthyTarget: [methodCoverage: 70, conditionalCoverage: 70, statementCoverage: 70],
                    unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
                    failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
                ]) 
                setBuildStatus("Build Complete","SUCCESS")              
            }
            post{
                success {
                    echo "Prepare production package"
                    sh '''
                        rm -rf node_modules coverage
                        npm install --prod
                    '''
                    archiveArtifacts artifacts: '**', excludes: 'junit.xml', fingerprint: true, followSymlinks: false, onlyIfSuccessful: true
                    slackSend channel: 'jenkins-bot', color: 'good', message: "Build started Job Name: ${env.JOB_NAME} Build Number: ${env.BUILD_NUMBER} Build Url: (<${env.BUILD_URL}|Open>)"
                }                
            }            
        }
        stage('Deploy To Test'){
            steps {
                echo 'Deploy application to Test Environment and run tests'
                
            }

        }
        stage('Deploy To Prod'){
            steps {
                echo 'Deploy application to Production'
                
            }

        }
    }
    post{
        always{
            echo "This is executed always"
        }
    }
}
