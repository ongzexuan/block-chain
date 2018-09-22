
module.exports = function(controller) {

    // Check if user has existing order
    function checkExistingOrder (user, cb) {
        let exists = false; //TODO: Change
        if (exists) {
            cb(true);
        } else {
            cb(false);
        }
    };

    // Check if user has existing order
    function cancelOrder (user, cb) {
        let err = false; //TODO: Change
        cb(err);
    };

    // check status
    controller.hears(['check_status'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for check_status!");
        checkExistingOrder(message.user, function(exists) {
            var attachment = null;
            if (exists) {
                attachment = {
                    'type':'template',
                    'payload':{
                        'template_type':'button',
                        'text': 'You currently have a pending order. Would you like to cancel it?',
                        'buttons': [
                            {
                                'type':'postback',
                                'payload':'cancel',
                                'title':'Cancel'
                            },
                            {
                                'type':'postback',
                                'payload':'exit_gracefully',
                                'title':'It\'s ok'
                            }
                        ]
                    }
                };
            } else {
                attachment = {
                    'type':'template',
                    'payload':{
                        'template_type':'button',
                        'text': 'You don\'t have a pending order, do you want to buy or sell a block?',
                        'buttons': [
                            {
                                'type':'postback',
                                'payload':'buy_block',
                                'title':'Buy'
                            },
                            {
                                'type':'postback',
                                'payload':'sell_block',
                                'title':'Sell'
                            }
                        ]
                    }
                };
            }
            bot.reply(message, {
                attachment: attachment
            });
        });
    });

    // exit gracefully
    controller.hears(['exit_gracefully'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for exit_gracefully!");
        cancelOrder(message.user, function(err) {
            if (!err) {
                bot.reply(message, {
                    text: 'Ok, your order has been cancelled! You have no pending orders.'
                });
            }
        })


    });

    // exit gracefully
    controller.hears(['exit_gracefully'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for exit_gracefully!");
        bot.reply(message, {
            text: 'Glad everything is alright!'
        });
    });
};
