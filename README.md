# movie-tickets
An application for booking tickets at the cinema. Implemented in the microservices architecture, using Docker and docker-compose


## Infrastructure

![](docs/architecture.jpeg)


## How to run

__Before you start__ 

* Install Docker and Docker Compose
* Set up the connection to database in movie-service/src/config/db.js
* Set AMQP_URL variable in .env file 
(you can use a free 'Little Lemur' plan from [CloudAMQP](https://www.cloudamqp.com/))

```
#start services
docker-compose up -d

#fill db with sample data 
docker exec -it <MOVIE_SERVICE_CONTAINER_NAME> node src/init
```

After staring services web app is available on `http://localhost:80`


## Screenshots

![](docs/demo.gif)

![](docs/temporary-reservation.gif)
