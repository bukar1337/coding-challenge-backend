# Project Documentation
## Prerequisites
Postgres Version >= 10
NodeJS >= 16

## Considerations

This documentation covers the setup for a project that uses a data model similar to https://github.com/bukar1337/coding-challenge-backend/blob/main/README.md. The purpose of using this app is to demonstrate technical skills I just try to use similar techstack as of yours to show a complete structure of a project. 

## Setting up the Project

To set up the project locally, follow these steps:

1. Clone the repository.
2. The `.env` file is included in the repository.
3. Install Serverless globally by running the following command:
npm install -g serverless

4. Install the required dependencies by running the following command:
npm install --legacy-peer-deps

5. Run the project locally using the following command:
serverless offline

## Setting up the Database
npm run migrate
npm run seed

## Importing Postman Collection

To import the Postman collection, follow these steps:

1. Locate the Postman collection file at the root of the project.
2. Import the file into your Postman application.
3. The collection will be available for testing the API endpoints.


## Conclusion

Congratulations on setting up and testing the project successfully! Feel free to explore and modify the code as per your requirements. Happy hacking!


