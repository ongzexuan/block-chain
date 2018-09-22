module.exports = function(controller) {
    var matching = require("../utils/matching")(controller.storage);

    controller.on('try_match', function(bot, message, order, convo) {
        matching.findMatch(order).then(
            (matched) => {
                if (matched != null) {
                    matching.userAccess(order.user_id).then(
                        (order_user) => {
                            bot.say({
                                text: "We've matched you with " + order_user.firstName + "!" +
                                    " You can contact " + order_user.firstName + " at " + order_user.phoneNumber,
                                channel: matched.user_id
                            });
                        }
                    );
                    matching.userAccess(matched.user_id).then(
                        (matched_user) => {
                            bot.say({
                                text: "We've matched you with " + matched_user.firstName + "!" +
                                " You can contact " + matched_user.firstName + " at " + matched_user.phoneNumber,
                                channel: order.user_id
                            });
                        }
                    );
                    matching.fulfillBuySell(order, matched);
                    convo.stop()
                }
            }
        );
    });

};
