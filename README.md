# Qurba-Task
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
