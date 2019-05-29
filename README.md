# movie-tickets
An application for booking tickets at the cinema. Implemented in the microservices architecture, using Docker and docker-compose


## Architecture

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

After starting services web app is available on `http://localhost:80`


## Features

- [x] **Browsing available movies at cinema**
   
   *Details of movies are fetched from external api's [OMDb](http://www.omdbapi.com/) [TMDb](https://www.themoviedb.org/)*
   
   ![](docs/movies.jpg)
   
   ![](docs/movie.jpg)
   
- [x] **Buying tickets**
    
   *Orders are stored in local database*
   
   ![](docs/demo.gif)
   
   ![](docs/orders.png)
    

- [x] **Temporary reservations** 

    *Reservations is implemented using [Socket.io](https://socket.io/) 
    (each movie has own room -> each client subscribe only room/movie event which actually browsing) 
    and stored in-memory on api-gateway.*
    *To improve api scalability on production, they should be stored in distributed DB like [Redis](https://redis.io/)*
    
    ![](docs/temporary-reservation.gif)
    
- [x] **Sending email with purchased ticket** 

    ![](docs/ticket.png)

## Useful links

- how to apply environment variables on container build https://github.com/docker/compose/issues/1837#issuecomment-316896858
- docker-compose build args (map vs list) https://github.com/docker/for-mac/issues/2661#issuecomment-370362897
