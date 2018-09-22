module.exports = function(controller) {
    var matching = require("../utils/matching")(controller.storage);

    controller.on('try_match', function(bot, message, order) {
        matching.findMatch(order).then(
            (matched) => {
                if (matched != null) {
                    matching.userAccess(order.user_id).then(
                        (order_user) => {
                            bot.say({
                                text: "We've matched you with " + order_user.firstName,
                                channel: order_user.id
                            });
                        }
                    );
                    matching.userAccess(matched.user_id).then(
                        (matched_user) => {
                            bot.say({
                                text: "We've matched you with " + matched_user.firstName,
                                channel: matched_user.id
                            });
                        }
                    );
                }
            }
        );
    });

};
