const notificationService = require('./services/notification');




notificationService.send({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: 'michalzaq12@gmail.com',
    subject: 'Hello ✔',
    template: 'billing',
    context: {
        "name": "Adam JW",
        "movie": "Superman",
        "date": "18.06.2018",
        "time": "20:00PM",
        "hall": "7",
        "seat": ["M12", "M13"],
        "quantity": "2",
        "price": "15.00",
        "subtotal": "30.00",
        "total": "30.00",
        "currency": "PLN",
        "url": "http://google.pl"
    }
}).catch(console.log);