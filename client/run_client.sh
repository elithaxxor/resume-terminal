#!/bin/bash

# Function to check if we are in the client directory
check_and_cd_client() {
    if [ "$(basename "$PWD")" != "client" ]; then
        echo "Not in client directory. Changing directory..."
        pushd client || { echo "Failed to change directory to client"; exit 1; }
    else
        echo "Already in client directory."
    fi
}

# Function to install dependencies
install_dependencies() {
    echo "Checking dependencies..."
    if [ -d "node_modules" ]; then
        echo "Dependencies already installed. Skipping npm install."
    else
        echo "Installing dependencies..."
        npm install
    fi
}

# Function to build the project
build_project() {
    echo "Building project..."
    if [ -d "dist" ]; then
        echo "Removing previous build..."
        rm -rf dist
    fi
    npm run build
}

# Function to start the client
start_client() {
    echo "Starting client..."
    npm start
}

# Main execution
check_and_cd_client
install_dependencies
build_project
start_client
