const morgan  = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');


let app = express();
const server = require('http').createServer(app);

app.use(morgan('tiny'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, ApiKey");
    res.header("Access-Control-Expose-Headers", "total-count");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);



app.use((err, req, res, next) => {
    if(process.env.NODE_ENV !== 'production') console.log(err);
    res.status(err.status || 500);
    res.json({'error': {
        message: err.message || err.error
    }});
});


server.listen(3030, () => {
    console.log('> Express app listening on port 3030');
});


// Store temporary reservation in-memory 'DB'
const roomToReservation = {};   //room => Set [{room, seatId, state}]
const clientIdToReservation = {};  //clientId => Set [{room, seatId, state}]


function clearClientReservation(socket) {
    if(clientIdToReservation[socket.id] === undefined) return;
    for(const params of clientIdToReservation[socket.id].values()){
        if(roomToReservation[params.room] !== undefined) roomToReservation[params.room].delete(params);
        socket.broadcast.to(params.room).emit('temp-book-seat', {...params, state: false});
    }
    delete clientIdToReservation[socket.id];
}

const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log('new client: ', socket.id);

    socket.on('join-room', room => {
        socket.join(room);
        if(roomToReservation[room] === undefined) return;
        for(const seat of roomToReservation[room].values()){
            socket.emit('temp-book-seat', seat)
        }
    });

    socket.on('leave-room', room => {
        socket.leave(room);
        clearClientReservation(socket);
    });


    socket.on('disconnect', () => clearClientReservation(socket));

    socket.on('temp-book-seat', params =>{
        if(params.state){
            (roomToReservation[params.room] = roomToReservation[params.room] || new Set()).add(params);
            (clientIdToReservation[socket.id] = clientIdToReservation[socket.id] || new Set()).add(params);
        }else{
            if(roomToReservation[params.room] !== undefined) roomToReservation[params.room].delete(params);
            if(clientIdToReservation[socket.id !== undefined]) clientIdToReservation[socket.id].delete(params);
        }

        socket.broadcast.to(params.room).emit('temp-book-seat', params);
    });

});

