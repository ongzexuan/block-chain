
module.exports = function(controller) {

    var request = require('request');
    var matching = require("../utils/matching")(controller.storage);

    function getUserName(id, cb) {
        var usersPublicProfile = "https://graph.facebook.com/"+id+"?fields=first_name,last_name&access_token=" + process.env.page_token;
        request({
            url: usersPublicProfile,
            json: true // parse
        }, cb);
    };

    // Postback button call by Facebook on initial interaction with page
    controller.hears(['get_started'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message!");
        console.log(message.user);

        getUserName(message.user, function(err, res, body) {
            var user = matching.userAccess(message.sender.id, body.first_name, body.last_name, "A");
            var attachment = {
                'type':'template',
                'payload':{
                    'template_type':'button',
                    'text': 'Hi ' + body.first_name + '! Would you like to buy or sell or block today?',
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
        })
    });

};
