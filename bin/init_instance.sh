#!/bin/bash

# 1. Update instance packages
# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Upgrade installed packages
echo "Upgrading installed packages..."
sudo apt-get upgrade -y

# Upgrade distribution packages
echo "Upgrading distribution packages..."
sudo apt-get dist-upgrade -y


# 2. Install Docker/Docker-compose
# Install Docker Engine
echo "Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl # Install prerequisite packages

# Set up Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker's official APT repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "Installing docker plugins..."
sudo apt-get update # Update package lists again
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin # Install Docker Engine, CLI, and Containerd
sudo systemctl enable docker # Enable Docker to start on boot
sudo systemctl start docker # Start Docker service

# Add current user to Docker Group to allow user to run docker cmd
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

# Download docker-compose binaries
echo "Installing docker-compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose # give users permission to run docker-compose

# 3. Clean up instance
# Clean up unnecessary packages
echo "Cleaning up unnecessary packages..."
sudo apt-get autoremove -y

# Clean up cached package files
echo "Cleaning up cached package files..."
sudo apt-get clean


# 4. Test if docker and docker-compose are installed successfuly.
if command -v docker &> /dev/null
then
    echo "Docker installed succesfully."
    docker --version
else
    echo "Docker did not install correctly."
fi

if command -v docker-compose &> /dev/null
then
    echo "Docker Compose (standalone) installed succesfully."
    docker-compose --version
else
    echo "Docker Compose (standalone) did not install correctly."
fi

if docker compose version &> /dev/null
then
    echo "Docker Compose (CLI plugin) installed succesfully."
    docker compose version
else
    echo "Docker Compose (CLI plugin) did not install correctly."
fi