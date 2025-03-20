#!/bin/bash

# Function to check if we are in the server directory
check_and_cd_server() {
    if [ "$(basename "$PWD")" != "server" ]; then
        echo "Not in server directory. Changing directory..."
        cd server || { echo "Failed to change directory to server"; exit 1; }
    else
        echo "Already in server directory."
    fi
}

# Function to install dependencies
install_dependencies() {
    echo "Installing dependencies..."
    npm install
}

# Function to build the project
build_project() {
    echo "Building project..."
    npm run build
}

# Function to start the server
start_server() {
    echo "Starting server..."
    npm start
}

# Main execution
check_and_cd_server
install_dependencies
build_project
start_server
