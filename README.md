# Restaurants  
- it's a full-stack application example developed useing mean stack technologies.  
- The application is designed as microservices each one of them responsible for one big task or resource.  
- There is the explanation for every service of them:  
## Authentication Service:  
- it's responsible for all authentication tasks like sign the users up for creating new user and also for login.  
- i'm using jwt as a method for authentication and authorization.  
## Crud Service:  
- it's responsible for all crud operations for restaurants. so if you need to create a new resturants you should talk to this service.  

# Notes: 
please add ```.env``` file for each project befor start.  

* for authenticaionService and crudService projects as example below:  
PORT= 3000  
HOST=mongodb://localhost:27017/qurbaAuthentication  
JWT_SCERET_KEY=thisMyjwtSecretKeyandtheSecretis2202  

I could not figure out the common code to make it on seperate package so the common code project is empity:  
* I hope to discuss this point on interview.  
## architecture for each project:  
* there is the server file where is the code start.  
* the routes folder define each route on the api.  
* for each route require the path, auth middleware if needed, and the controller methode which do the job.  
