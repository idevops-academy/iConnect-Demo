pipeline {
    agent none
    options { skipDefaultCheckout(true) }
    environment{
        MY_NAME="shaik"
        appurl="http://ec2-52-66-195-136.ap-south-1.compute.amazonaws.com"
    }   

    stages {
        stage('Build') {
            agent {label 'master'}
            tools {
                nodejs 'nodev14' 
            }
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
            }
            post{
                success {
                    echo "Prepare production package"
                    sh '''
                        rm -rf node_modules coverage
                        npm install --prod
                    '''
                    archiveArtifacts artifacts: '**', excludes: 'junit.xml', fingerprint: true, followSymlinks: false, onlyIfSuccessful: true
                    stash excludes: 'junit.xml', includes: '**', name: "iConnect-${BUILD_NUMBER}"
                    //cleanWs()                    
                }                
            }            
        }
        stage('Deploy To Test'){
            agent {label 'Deployer-Ansible'}
            steps {
                echo 'Deploy application to Test Environment and run tests'
                unstash "iConnect-${BUILD_NUMBER}"
                //ansiblePlaybook 'ansible/iConnectDeploy.yml'                
            }
        }
        stage('Run Tests'){            
            parallel {
                
                stage('Integration Tests') {  
                    agent {label 'iConnect-Tester'}                 
                    steps {
                        echo message: "Running Integration Tests"
                        git branch:'main', url:'https://github.com/idevops-academy/iConnectQA.git'
                        nodejs('nodev14') {
                            sh '''
                                npm install
                                npm run test
                            '''
                        }                        
                    }                    
                }
                stage('Load Tests') {
                    agent {label 'iConnect-Tester'}
                    steps {
                        echo message: "Running Load Tests"
                    }
                    // post {
                    //     always {
                    //         junit "**/TEST-*.xml"
                    //     }
                    // }
                }
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
        success{
            slackSend channel: 'jenkins-bot', color: 'good', message: "Build started Job Name: ${env.JOB_NAME} Build Number: ${env.BUILD_NUMBER} Build Url: (<${env.BUILD_URL}|Open>)"
        }
        
    }
}
