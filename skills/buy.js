
module.exports = function(controller) {

    // buy_block
    controller.hears(['buy_now'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for buy_now!");

        // TODO:
        // 1. Check if there exists an existing order, if so reject

        bot.startConversation(message, function(err, convo) {
            convo.addMessage({
                text: 'I\'m sorry I can\'t read that. Please enter the time in the following format: 10:30am',
                action: 'default'
            }, 'bad_start_time');

            convo.addMessage({
                text: 'You gave a valid datetime string',
                action: 'end_time'
            }, 'good_start_time');

            convo.addQuestion('Please enter the start time in the following format: 10:30am', [
                {
                    pattern: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m$',
                    callback: function(res, convo) {
                        // TODO: Update Database with new start time
                        convo.gotoThread('good_start_time');
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.gotoThread('bad_start_time');
                    },
                    action: 'default'
                }
            ], {}, 'default');

            convo.addQuestion('Ok! Please also enter the end time in the same format: 10:30am', [
                {
                    pattern: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m$',
                    callback: function(res, convo) {
                        convo.say('You also gave a valid datetime string');

                        // TODO: Update Database with new end time
                        convo.next();
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.sayFirst('I\'m sorry I can\'t read that. Please enter the time in the following format:' +
                            ' 10:30am');
                        convo.next();
                    },
                    action: 'end_time'
                }
            ], {}, 'end_time');
        });
    });

};
