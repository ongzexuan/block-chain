
module.exports = function(controller) {

    // buy_block
    controller.hears(['buy_block'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for buy_block!");

        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text': 'Would you like to buy a block now or at a later time today?',
                'buttons': [
                    {
                        'type':'postback',
                        'payload':'buy_now',
                        'title':'Now'
                    },
                    {
                        'type':'postback',
                        'payload':'buy_later',
                        'title':'Later'
                    }
                ]
            }
        };

        bot.reply(message, {
            attachment: attachment
        });
    });

    // sell_block
    controller.hears(['sell_block'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for sell_block!");

        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text': 'Would you like to sell a block now or at a later time today?',
                'buttons': [
                    {
                        'type':'postback',
                        'payload':'sell_now',
                        'title':'Now'
                    },
                    {
                        'type':'postback',
                        'payload':'sell_later',
                        'title':'Later'
                    }
                ]
            }
        };

        bot.reply(message, {
            attachment: attachment
        });
    });

};
