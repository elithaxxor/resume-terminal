#!/bin/bash

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm could not be found. Installing npm..."

    # Function to install npm on Debian-based systems
    install_npm() {
        echo "Updating package list..."
        sudo apt-get update

        echo "Installing npm..."
        sudo apt-get install -y npm

        # Verify installation
        if ! command -v npm &> /dev/null; then
            echo "Failed to install npm. Please install npm manually."
            exit 1
        fi
    }

    install_npm
fi

# Function to check if we are in the server directory
check_and_cd_server() {
    if [ "$(basename "$PWD")" != "server" ]; then
        if [ -d "server" ]; then
            echo "Not in server directory. Changing directory..."
            cd server || { echo "Failed to change directory to server"; exit 1; }
        else
            echo "Error: 'server' directory not found in current location."
            exit 1
        fi
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