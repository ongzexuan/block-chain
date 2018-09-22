
module.exports = function(controller) {

    // buy_block
    controller.hears(['buy_now'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for buy_now!");

        // TODO:
        // 1. Check if there exists an existing order, if so reject

        bot.createConversation(message, function(err, convo) {
            convo.addQuestion('Please enter the time in the following format: 10:30am', [
                {
                    pattern: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m$',
                    callback: function(res, convo) {
                        convo.say('You gave a valid datetime string');
                        convo.next();
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.repeat();
                        convo.next();
                    }
                }
            ], {}, 'default');
        });

        bot.reply(message, {
            attachment: attachment
        });
    });

};
