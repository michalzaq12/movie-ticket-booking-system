const Op = require('sequelize').Op;
const {Order, db, Seats, Movie} = require('../models');


module.exports = {

    async create({movieId, seatIds}){
        let transaction;

        try {
            transaction = await db.transaction();
            const order = await Order.create({movieId}, {transaction});



            const seats = await Seats.findAll({
                where:{
                    id: {[Op.in]: seatIds}
                }
            });

            for(const seat of seats){
                if(!seat.isAvailable) throw new Error('This place is already reserved');
                await seat.update({isAvailable: false});
            }

            await order.setSeats(seatIds, {transaction});

            await transaction.commit();
            const fullModel = await this.getById(order.id);
            return fullModel;
        } catch (err) {
            await transaction.rollback();
            return Promise.reject(err);
        }

    },

    getById(id){
        return Order.findOne({
            where: {
              id: {[Op.eq]: id}
            },
            include: [
                {
                    attributes: ['row', 'column'],
                    model: Seats,
                    through:{
                        attributes: []
                    }
                },
                {
                    model: Movie
                }
            ]
        })
    },

    getAll(){
        return Order.findAll({
            include: [
                {
                    attributes: ['row', 'column'],
                    model: Seats,
                    through:{
                        attributes: []
                    }
                },
                {
                    model: Movie
                }
            ],
            order: [['createdAt', 'DESC']]
        })
    }
};


