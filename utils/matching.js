var moment = require("moment")

module.exports = function(db) {

    return {
        userAccess: function (id, firstName, lastName, gender) {
            return db.user.get(id).then(user => {
                if (user == null) {
                    console.log(`No user with id "${id}", creating...`)
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

        checkExistingOrder: function (userid) {
            return db.user.get(userid).then(user => {
                if (user == null) {
                    console.warn(`Warning from checkExistingOrder: No user with id "${userid}"`)
                    return null;
                }
                return db.order.find({
                    user_id: userid,
                    fulfilled: false,
                }).then(orders => orders.length == 0 ? null : orders[0]);
            });
        },

        cancelOrder: function cancelOrder (order) {
            if (order == null) {
                console.warn(`Warning from cancelOrder: Tried to cancel null order`);
                return null;
            }
            else if (order.fulfilled) {
                console.warn(`Warning from cancelOrder: Cancelling a fulfilled order:`);
                console.log(order);
            }

            let matched_order_id = order.matched_order_id;
            var resultPromises = [];
            if (matched_order_id != null) {
                resultPromises.push(db.order.get(matched_order_id)
                    .then(matchedOrder => {
                        // Should be pointing back, so drop it
                        matchedOrder.matched_order_id = null;
                        return cancelOrder(matchedOrder);
                    }));
            }

            resultPromises.push(db.order.delete(order.id));

            return Promise.all(resultPromises);
        },

        updatePhoneNumber: function(user, phoneNumber) {
            return db.user.get(user.id).then(user => {
                if (user == null) {
                    console.warn(`Warning from updatePhoneNumber: No user with id "${user.id}"`)
                    return null;
                }
                return db.user.save({...user, phoneNumber});
            });
        },

        addBuyOrder: function (user, tx_time_start, tx_time_end) {
            var order = {
                id: user.id,
                type: "BUY",
                user_id: user.id,
                created_at: new Date(),
                transaction_dt_start: tx_time_start == null ? moment() : moment(tx_time_start, "h:mma").toDate(),
                transaction_dt_end: tx_time_end == null ? moment().add(30, "m") : moment(tx_time_end, "h:mma").toDate(),
                fulfilled: false,
                matched_order_id: null
            }

            // TODO: Check if user exists

            return db.order.save(order);
        },

        addSellOrder: function (user, tx_time_start, tx_time_end) {
            var order = {
                id: user.id,
                type: "SELL",
                user_id: user.id,
                created_at: new Date(),
                transaction_dt_start: tx_time_start == null ? moment() : moment(tx_time_start, "h:mma").toDate(),
                transaction_dt_end: tx_time_end == null ? moment().add(30, "m") : moment(tx_time_end, "h:mma").toDate(),
                fulfilled: false,
                matched_order_id: null
            }

            // TODO: Check if user exists

            return db.order.save(order);
        },

        findMatch: function (order) {
            var targetType = "NONE";
            if (order.type == "BUY") targetType = "SELL";
            if (order.type == "SELL") targetType = "BUY";

            var matchOrders = db.order.find({
                type: targetType,
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
                fulfilled: false
            });

            return matchOrders
                .then(orders => orders.sort((o1, o2) => o1.created_at - o2.created_at))
                .then(sortedOrders => sortedOrders.length == 0 ? null : sortedOrders[0]);
        },

        fulfillBuySell: function (buyOrder, sellOrder) {
            buyOrder.matched_order_id = sellOrder.id;
            sellOrder.matched_order_id = buyOrder.id;

            buyOrder.fulfilled = true;
            sellOrder.fulfilled = true;

            return Promise.all([
                db.order.save(buyOrder),
                db.order.save(sellOrder)
            ]);
        }
    };
}

