# springboot-keycloak-angular
A simple example of Spring Boot, Angular and Keycloak integration

## To run the application
* Download the repository from github
* You should have installed Java, maven, NodeJs, Angular and Docker in order to run the application
* Follow the instructions given below

### Start Docker for keycloak
* Start Docker Desktop
* Go to the `keycloak` folder
* Open the command prompt and run the command `docker-compose -f docker-compose.yml up -d`

### Start Employee API
* Go to the employee-api folder
* Run the command `mvn spring-boot:run`

### Start Employee UI
* Go to the employee-ui folder
* Run the command `ng serve`

### Open the Application
* Click [here](http://localhost:4200) to open the application

### To login to the application
* username: admin
* password: admin