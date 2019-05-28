const movieService = require('../services/movie');
const notificationService = require('../services/notification');

const TICKET_PRICE = 15.00;

module.exports = {
    create(body){
        movieService.createOrder(body).then(order => {

            const quantity = order.seats.length;

            notificationService.send({
            from: '"Cinema City👻" <system@cinema-city.com>',
            to: 'bar@example.com',
            subject: 'Your ticket',
            template: 'billing',
            context: {
                "name": "Sir Alex Ferguson",
                "movie": order.movie.title,
                "date": "18.06.2018",
                "time": new Date(order.movie.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                "hall": order.movie.hall,
                "seat": order.seats.map(el => el.row + el.column),
                "quantity": quantity,
                "price": TICKET_PRICE,
                "subtotal": TICKET_PRICE * quantity,
                "total": TICKET_PRICE * quantity,
                "currency": "PLN",
                "url": "http://google.pl"
            }
        }).catch(console.log);
        })
    },

    getAll(){
        return movieService.getAllOrders();
    }

};


