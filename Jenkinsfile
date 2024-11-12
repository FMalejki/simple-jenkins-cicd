//CODE_CHANGES = ifGitStateChanged() (groovy script)
//list of all env variables is on localhost:8080/env-vars.html
pipeline {

    agent any

    environment {
        NEW_VERSION = '1.3.0'
        //SERVER_CREDENTIALS = credentials('')
        //we need to install credentials extension for jenkins
    }

    /*tools {
        //git 'git'  
        //now we can use git
    }*/

    parameters {
        //string(name: 'VERSION', defaultValue: '', description: 'version to deploy')
        choice(name: 'VERSION', choices: ['1.1.0','1.2.0','1.3.0'], description: '')
        booleaParam(name: 'executeTests', defaultValue: true, description:'')
    }

    stages {

        stage("build") {
            
            steps {

                echo "hello world build"
                echo "building version {$NEW_VERSION}"
            }

        }

        stage("test") {

            /*when {
                expression {
                    env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master'
                }
            }*/

            when {
                expression {
                    params.executeTests
                }
            }

            steps{
                echo "hello world test"
            }

        }

        stage("deploy") {
            
            steps{
                echo "hello world deploy"
            }

        }
    }
    /*post {
        always {
            echo "deployed version {$params.VERSION}"
        }
        success {

        }
        failure {

        }
    }*/
}