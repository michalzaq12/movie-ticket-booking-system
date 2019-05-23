const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');


let app = express();

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


app.listen(3030, () => {
    console.log('> Express app listening on port 3030');
});



