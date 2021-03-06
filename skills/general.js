
module.exports = function(controller) {

    var matching = require("../utils/matching")(controller.storage);

    // Postback button call by Facebook on initial interaction with page
    controller.hears(['get_started'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message!");
        console.log(message.user);
        var user = matching.userAccess(message.sender.id, "Potato", "Smith", "M");
        var attachment = {
            'type':'template',
            'payload':{
                'template_type':'button',
                'text': 'Hi! Would you like to buy or sell or block today?',
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
                    },
                    {
                        'type':'postback',
                        'payload':'check_status',
                        'title':'Check Status'
                    }
                ]
            }
        };

        bot.reply(message, {
            attachment: attachment
        });


    });

};
