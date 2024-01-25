#!/bin/bash

# Navigating to the React app directory
echo -e "Navigating to the React app directory..."
cd react ||  { echo -e "Failed to open file."; exit 1; }
echo -e "\nInstalling node modules for React app..."
npm i

# Cleaning up the public/scripts directory
echo -e "\nCleaning up public/scripts..."
rm -rf public/scripts

# Building the React app
echo -e "\nBuilding React app..."
npm run build

# Copying build to the Pulumi public directory
echo -e "\nCopying React build to the Pulumi public directory..."
cd .. ||  { echo -e "Failed to open file."; exit 1; }
cp -R react/public pulumi/public

# Navigating to the Pulumi directory
echo -e "\nNavigating to the Pulumi directory..."
cd pulumi ||  { echo -e "Failed to open file."; exit 1; }
echo -e "\nInstalling Pulumi dependencies..."
npm install

# Deploying with Pulumi in dev environment
echo -e "\nDeploying with Pulumi in dev environment..."
pulumi up -y -s dev

echo -e "\nReact app build and deployment complete!"
