def buildApp() {
    echo 'building the app...'
}

def testApp() {
    echo 'testing the app...'
}

def deployApp() {
    echo 'deploying the app...'
    echo "the version is {$params.VERSION}"
}

return this