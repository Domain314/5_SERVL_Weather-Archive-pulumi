#!/bin/bash

# Navigating to nodeModulesLayer
echo -e "Navigating to nodeModulesLayer directory..."
cd infrastructure/resources/lambdas/nodeModulesLayer/nodejs || exit
echo -e "\nInstalling node modules..."
npm i

# Going back to the root of nodeModulesLayer
echo -e "\nMoving back to package nodeModulesLayer..."
cd ../.. || { echo -e "Failed to open file."; exit 1; }
echo -e "\nCreating a zip of nodeModulesLayer..."
zip -r nodeModulesLayer.zip nodeModulesLayer # || { echo -e "Failed to zip files."; exit 1; }

# Moving to the project root
echo -e "\nMoving back to project root..."
cd ../.. || { echo -e "Failed to open file."; exit 1; }
echo -e "\nInstalling project root node modules..."
npm i

# Running pulumi up in dev environment
echo -e "\nDeploying infrastructure with Pulumi in dev..."
pulumi up -y -s dev

# Navigating to frontend react app
echo -e "\nNavigating to frontend react app..."
cd ..
cd frontend/react || { echo -e "Failed to open file."; exit 1; }
echo -e "\nInstalling node modules for react app..."
npm i
echo -e "\nCleaning up public/scripts..."
rm -rf public/scripts
echo -e "\nBuilding react app..."
npm run build

# Copying build to pulumi public directory
echo -e "\nCopying React build to Pulumi public directory..."
cd .. || { echo -e "Failed to open file."; exit 1; }
cp -R react/public pulumi/public

# Navigating to pulumi directory
echo -e "\nNavigating to Pulumi directory..."
cd pulumi || { echo -e "Failed to open file."; exit 1; }
echo -e "\nInstalling Pulumi dependencies..."
npm install
echo -e "\nDeploying frontend with Pulumi in dev..."
pulumi up -y -s dev

echo -e "\nDeployment complete!"
