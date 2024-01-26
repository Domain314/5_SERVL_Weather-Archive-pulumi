# Weather Archive
SERVL Student Project of FH Technikum Wien by Chen Lu and Moisejev Artjom.

## Introduction
The Weather Archive is a web application designed to display historical weather data visually. This project is part of a university initiative to use technology for educational and research purposes. This project establishes an infrastructure comprising a robust API for webcam integration and a React-based frontend for data presentation. The API facilitates seamless data flow from the webcams, handling weather metadata and high-resolution images (+ converting them into not-so-high resolution images and a web-friendly `.webp` format). On the frontend, React is utilized to create a dynamic and responsive user interface, enabling users to interact with, search, and visualize the weather data in an intuitive and engaging manner.

## Features
- **Search Functionality**: Users can search for cities using an autocomplete feature.
- **Weather Data Visualization**: Displays webcam images and plots of weather data like temperature, humidity, and air pressure.
- **Data Accessibility**: Weather data can be retrieved for specific dates and times.
- **User-friendly Interface**: The application boasts a simple and intuitive interface, reminiscent of the Google homepage.
- **Beautiful Design**: Handcrafted and with love made UI/UX.

## Technologies Used
- **Frontend**: React (JavaScript), HTML, CSS
- **Backend**: AWS Lambda functions, API Gateway
- **Database**: AWS RDS Postgres
- **Storage**: AWS S3 Bucket for images
- **Caching**: Redis Cloud

---

## Installation

### 1. Set Up Prerequisites
- **AWS CLI and Pulumi CLI Configuration**
  - Configure AWS CLI with your credentials.
  - Configure pulumi-cli with your credentials.

### 2. Clone the Repository
```bash
git clone [repository-link]
cd weather-archive-project
```

### 3. Set hardcoded value for AWS Lambda Role
- **Go to AWS console**
  - navigate to `IAM` -> `Roles` 
  - search for `LabRole` and open it's Info
  - Copy ARN (something like `arn:aws:iam::6XXXXXXXXXXX6:role/LabRole`)
- **Set value in code**
  - open [infrastructure/resources/lambdaFunctions.js](infrastructure/resources/lambdaFunctions.js#L5) and paste your ARN from LabRole.
  - save file

### 4. Infrastructure Setup Options
You have 2 ways to set up the infrastructure: Fast Install and Manual Install.

#### Fast Install
- **Run Full Setup Script**
  ```bash
  sh full.sh
  ```

#### Manual Install
- **Step 1: Create Lambda Layer**
  ```bash
  cd infrastructure/resources/lambdas/nodeModulesLayer/nodejs
  npm install
  ```
  Important: Ensure Node.js version 16 is installed, as Lambdas will use Node16.

- **Step 2: Zip the Lambda Layer**
  ```bash
  cd infrastructure/resources/lambdas/
  zip -r nodeModulesLayer.zip nodeModulesLayer
  ```

- **Step 3: Deploy Infrastructure with Pulumi**
  ```bash
  cd infrastructure/
  npm install
  pulumi up
  ```
  Confirm the prompts, or use `pulumi up -y -s dev`, where `dev` is your Pulumi stack.

- **Step 4: Deploy Frontend**
  ```bash
  cd frontend/react
  npm install
  rm -rf public/scripts
  npm run build
  cp -R react/public pulumi/public
  cd pulumi
  npm install
  pulumi up
  ```
  Confirm the prompts, or use `pulumi up -y -s dev`, where `dev` is your Pulumi stack.

---

## Troubleshooting

- **RDS Errors**
  - You may need to create the table manually, if [`initRdsDb()`](infrastructure/index.js#L97) throws errors. You can find the `CREATE TABLE..` command in [init-db.sql](infrastructure/init-db.sql) 
  - If nothing worked, it's possible to use fake-data, instead of querying the db. Either search for all 'FAKE_' variables in the whole project and uncomment them, or use this links:
    - [Frontend: FrontPage](frontend/react/src/components/pages/FrontPage.jsx#L30)
    - [Frontend: WeatherPage](frontend/react/src/components/pages/Weather.jsx#L40)
    - [Lambda: FrontendApi](infrastructure/resources/lambdas/frontendApi/res/query.js#L38)
    - [Lambda: FrontendApi](infrastructure/resources/lambdas/frontendApi/res/query.js#L67)

- **Lambda Errors**
  - Make sure you set the hardcoded LabRole ARN, as described in [Installation Step 3](###3-set-hardcoded-value-for-aws-lambda-role).
  - Make sure you have node16 installed and using it, before running any script for deploying lambdas or their layers. 
  - Check if for Errors in AWS Cloudwatch.

- **Other Steps to try**
  - Go to AWS Secrets Manager and create a new secret with the username `dom314` and password `12345678`. We made it some time ago and are unsure if this is still necessary.
  - If the Frontend throws errors, try with the FAKE data (mentioned in RDS Troubleshooting). You can also try to delete the folder [frontend/react/public/scripts](frontend/react/public/scripts) and [frontend/pulumi/public](frontend/react/public). Then retry the frontend deployment script (especially the building ).

- **Contact Support**
  ```
  support@27vier.com
  ```
---

## User Stories
1. As a user, I want to navigate to “The Weather Archive” application in the browser and see a logo and a search bar with a button. (similar to the Google Homepage). [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx)
2. As a user, I would like to type into the search bar and to retrieve autocomplete results (topics e.g. cities) in a list. [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx#L40)
3. As a user, I am only able to choose topics (e.g. cities) from the autocomplete. [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx#L75)
4. As a user, I want to retrieve an error message when I am searching for a topic that is not in the autocomplete list. [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx#L79)
5. As a user, I would like to be taken to a new site when I select a valid topic from the autocomplete and click on the search button. [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx#L76)
6. As a user, I would like to see a heading (topic, e.g. Vienna), a video (a compilation of the time period), a plot of the metadata (temperature, humidity, air pressure - of that time period), a date-picker, and a slider to select the hour of the day on the new page. [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx#L89)
7. As a user, I am only able to select dates that are available. [Frontend: Weather.jsx](/frontend/react/src/components/pages/Weather.jsx#L34)
8. As a user, I can only select hours that are available for the selected date. [Frontend: Weather.jsx](/frontend/react/src/components/pages/Weather.jsx#L21)
9. As a user, I want to see the logo of “The Weather Archive” on the new page so that I can navigate back to the homepage when I click on it. [Frontend: Navbar.jsx](/frontend/react/src/components/Navbar.jsx#L21)
10. As a user, I would like to receive good (human-readable) error messages when something goes wrong. [Frontend: FrontPage.jsx](/frontend/react/src/components/pages/FrontPage.jsx#L79)

11. As a webcam, I would like to be able to communicate via a RESTful Interface to POST data (an image, the topic, and metadata) to the API. [Lambda: dataHandler: index.js](/infrastructure/resources/lambdas/dataHandler/index.js#L15)
12. As a webcam, I want to use an API key when communicating with the API to ensure only authenticated users can POST data. [Lambda: dataHandler: index.js](/infrastructure/resources/lambdas/dataHandler/index.js#L18)
13. As a webcam, I would like to receive good error codes when something goes wrong. [Lambda: dataHandler: index.js](/infrastructure/resources/lambdas/dataHandler/index.js#L7), [Lambda: dataHandler: validation.js](/infrastructure/resources/lambdas/dataHandler/res/validation.js#L2), [Lambda: dataHandler: send.js](/infrastructure/resources/lambdas/dataHandler/res/send.js#L5)

14. As API, I would like to be able to store an image in an object storage. [Lambda: pictureService: index.js](/infrastructure/resources/lambdas/pictureService/index.js#L29)
15. As API, I want to be able to store data (image location, topic, timestamps, metadata) in a database. [Lambda: dataHandler: send.js](/infrastructure/resources/lambdas/dataHandler/res/send.js#L27)
16. As API, I would like to be able to retrieve the data from the database. [Lambda: frontendApi: query.js](/infrastructure/resources/lambdas/frontendApi/res/query.js#L35)
17. As API, I would like to be able to retrieve data from the S3 Bucket. [Lambda: frontendApi: query.js](/infrastructure/resources/lambdas/frontendApi/res/query.js#L89)

18. As API, I want to be able to store data in the Redis Cache. [Lambda: frontendApi: red.js](/infrastructure/resources/lambdas/frontendApi/res/red.js#L42)
19. As API, I would like to be able to retrieve data from the Cache. [Lambda: frontendApi: red.js](/infrastructure/resources/lambdas/frontendApi/res/red.js#L26)
20. As API, I will not access the DB if the requested topic and time period is already in the Redis cache. [Lambda: frontendApi: query.js](/infrastructure/resources/lambdas/frontendApi/res/query.js#L24)
21. As API, I will return the cached results if the requested topic and time period is already in the Redis cache. [Lambda: frontendApi: query.js](/infrastructure/resources/lambdas/frontendApi/res/query.js#L25)

~~22. As PictureService, I want to get notified when a new entry was made to the database (e.g. image location). The notification event can come from the database OR the S3 Bucket.~~

~~23. As PictureService, I would like to be able to retrieve data from the S3 Bucket. (VideoService can retrieve Data from S3 bucket)~~

24. As PictureService, I would like to be able to store data in the S3 Bucket. [Lambda: pictureService: index.js](infrastructure/resources/lambdas/pictureService/index.js#L29)
25. As PictureService, I want to be able to resize an image (compress). [Lambda: pictureService: index.js](infrastructure/resources/lambdas/pictureService/index.js#L14)

~~26. As VideoService, I would like to be scheduled for a specific time period.~~

~~27. As VideoService, I would like to be able to read the database.~~

~~28. As VideoService, I would like to be able to create a video based on the images of that topic (that were sent from the webcam).~~

~~29. As VideoService, I will only create a video per time period (so a picture that was already used in a past video will not be used for the new schedule).~~

~~30. As VideoService, I want to be able to store a video in a S3 Bucket Evaluation.~~

---

## How It Works

### Where what is
- **Lambdas**: [infrastructure/resources/lambdas](infrastructure/resources/lambdas)
- **All other AWS Resources**: [infrastructure/resources](infrastructure/resources): 
- **Frontend**: [frontend/react](frontend/react)
- **2 pulumi yaml files**: infrastructure: [infrastructure/](infrastructure/Pulumi.yaml) and frontend: [frontend/pulumi](frontend/pulumi/Pulumi.yaml)

### Data Flow
1. **Data Collection**: Webcams in various cities send images and weather data to the API.
2. **Image Processing**: Images are resized and stored in an S3 bucket using PictureService Lambda functions.
3. **Data Storage**: Metadata and image references are stored in the RDS Postgres database.
4. **Data Retrieval and Caching**: When a user requests data, the API first checks Redis cache before fetching from the database.

### User Interaction
- Users can search for a city, slide through images of the webcam for a chosen time, and analyze the weather data through plots.
- Webcam data providers can post new data to the API using RESTful interfaces.

## License
This project is licensed under whatever license the FH Technikum uses. I guess MIT?..

## Involved
- project contributors: Chen Lu, Moisejev Artjom
- supervisor: Gartlehner Lukas
