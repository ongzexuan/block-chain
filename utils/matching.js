var moment = require("moment")

module.exports = function() {

    return {
        userAccess: function (db, id, firstName, lastName, gender) {
            return db.user.get(id).then(user => {
                if (user == null) {
                    return db.user.save({
                        id,
                        firstName,
                        lastName,
                        gender,
                        phoneNumber: null
                    });
                }
                return user;
            });
        },

        checkExistingOrder: function (db, user) {
            return db.user.get(user.id).then(user => {
                if (user == null) {
                    console.warn(`Warning from checkExistingOrder: No user with id ${user.id}`)
                    return null;
                }
                return db.order.find({
                    user_id: user.id,
                    fulfilled: false,
                }).then(orders => orders.length == 0 ? null : orders[0]);
            });
        },

        addBuyOrder: function (db, user, tx_time) {
            var order = {
                id: user.id,
                type: "BUY",
                user_id: user.id,
                created_at: new Date(),
                transaction_dt_start: moment(tx_time).toDate(),
                fulfilled: false,
                matched_order: null
            }

            // TODO: Check if user exists

            db.order.save(order);

            return order;
        },

        addSellOrder: function (db, user, tx_time_start, tx_time_end) {
            var order = {
                id: user.id,
                type: "SELL",
                user_id: user.id,
                created_at: new Date(),
                transaction_dt_start: tx_time_start.toDate(),
                transaction_dt_end: tx_time_end.toDate(),
                fulfilled: false,
                matched_order: null
            }

            // TODO: Check if user exists

            db.order.save(order);

            return order;
        },

        findMatch: function (db, order) {
            if (order.type == "BUY") {
                var sellOrders = db.order.find({
                    type: "SELL",
                    $or: [
                        {$and: [
                            {transaction_dt_end: {$gte: order.transaction_dt_start}},
                            {transaction_dt_end: {$lte: order.transaction_dt_end}},
                        ]},
                        {$and: [
                            {transaction_dt_start: {$gte: order.transaction_dt_start}},
                            {transaction_dt_end: {$lte: order.transaction_dt_end}},
                        ]},
                        {$and: [
                            {transaction_dt_start: {$gte: order.transaction_dt_start}},
                            {transaction_dt_start: {$lte: order.transaction_dt_end}},
                        ]},
                        {$and: [
                            {transaction_dt_start: {$lte: order.transaction_dt_start}},
                            {transaction_dt_end: {$gte: order.transaction_dt_end}}
                        ]}
                    ],
                    fulfilled: {$ne: true}
                });

                return sellOrders
                    .then(orders => orders.sort((o1, o2) => o1.created_at - o2.created_at))
                    .then(sortedOrders => sortedOrders.length == 0 ? null : sortedOrders[1]);
            }
        }
    };
}

