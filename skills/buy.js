
module.exports = function(controller) {

    // Check if phone number exists
    function checkPhoneNumber (user, cb) {
        let exists = false; //TODO: Change
        if (exists) {
            cb(true);
        } else {
            cb(false);
        }
    };

    // Check if user has existing order
    function checkExistingOrder (user, cb) {
        let exists = false; //TODO: Change
        if (exists) {
            cb(true);
        } else {
            cb(false);
        }
    };

    // buy_block later
    controller.hears(['buy_later'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for buy_later!");

        bot.startConversation(message, function(err, convo) {

            // convo var defaults
            convo.setVar('start_time','12:00pm');
            convo.setVar('end_time','1:00pm');
            convo.setVar('phone_number','1234567890');

            convo.beforeThread('default', function(convo, next) {
                checkExistingOrder(convo.source_message.user, function(exists) {
                   if (exists) {
                       convo.gotoThread('order_already_exists')
                   }
                });
            });

            // Get start time
            convo.addMessage({
                text: 'I cannot create another order if you already have one pending! Please cancel that first.',
                action: 'completed'
            }, 'order_already_exists');

            // Get start time
            convo.addMessage({
                text: 'I\'m sorry I can\'t read that. Please enter the time in the following format: 10:30am',
                action: 'default'
            }, 'bad_start_time');

            convo.addMessage({
                text: 'Starting at {{vars.start_time}}, ok!',
                action: 'end_time'
            }, 'good_start_time');

            convo.addQuestion('Please enter the start time in the following format: 10:30am', [
                {
                    pattern: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m$',
                    callback: function(res, convo) {
                        // TODO: Update Database with new start time
                        convo.setVar('start_time', convo.extractResponse('text'));
                        convo.gotoThread('good_start_time');

                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.gotoThread('bad_start_time');
                    },
                }
            ], {key: 'text'}, 'default');

            // Get end time
            convo.addMessage({
                text: 'I\'m sorry I can\'t read that. Please enter the time in the following format: 10:30am',
                action: 'end_time'
            }, 'bad_end_time');

            convo.addMessage({
                text: 'Ending at {{vars.end_time}}, ok!',
                action: 'success'
            }, 'good_end_time');

            convo.addQuestion('Ok! Please also enter the end time in the same format: 10:30am', [
                {
                    pattern: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m$',
                    callback: function(res, convo) {
                        // TODO: Update Database with new end time
                        convo.setVar('end_time', convo.extractResponse('text'));
                        convo.gotoThread('good_end_time');
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.gotoThread('bad_end_time');
                    },
                }
            ], {key: 'text'}, 'end_time');

            // Check phone number
            convo.beforeThread('success', function(convo, next) {
                checkPhoneNumber(convo.source_message.user, function(exists) {
                    if (!exists) 
                        convo.gotoThread('no_phone_number');
                    }
                });
            });

            // Get phone number
            convo.addMessage({
                text: 'Ok so your phone number is {{vars.phone_number}}, thank you!',
                action: 'success'
            }, 'good_phone_number');

            convo.addMessage({
                text: 'We need your contact information so that the seller can contact you!',
                action: 'no_phone_number'
            }, 'bad_phone_number');

            convo.addQuestion('Please enter your phone number so that the seller can contact you when matched!', [
                {
                    pattern: '^[0-9]{10}$',
                    callback: function(res, convo) {
                        // TODO: Update Database with new end time
                        convo.setVar('phone_number', convo.extractResponse('text'));
                        convo.gotoThread('good_phone_number');
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.gotoThread('bad_phone_number');
                    },
                }
            ], {key: 'text'}, 'no_phone_number');

            // Success confirmation
            convo.addMessage({
                text: 'Ok! We\'ve placed a buy order for you at 10:30am today! We\'ll keep you posted when we find a' +
                ' match for you!',
                action: 'completed'
            }, 'success')

        });
    });

    // buy_block now
    controller.hears(['buy_now'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message for buy_now!");

        bot.startConversation(message, function(err, convo) {

            convo.beforeThread('default', function(convo, next) {
                checkExistingOrder(convo.source_message.user, function(exists) {
                    if (exists) {
                        convo.gotoThread('order_already_exists')
                    }
                });
            });

            // Get start time
            convo.addMessage({
                text: 'I cannot create another order if you already have one pending! Please cancel that first.',
                action: 'completed'
            }, 'order_already_exists');

            // Get start time
            convo.addMessage({
                text: 'I\'m sorry I can\'t read that. Please enter the time in the following format: 10:30am',
                action: 'default'
            }, 'bad_start_time');

            convo.addMessage({
                text: 'You gave a valid datetime string for the start_time',
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
                }
            ], {}, 'default');

            // Get end time
            convo.addMessage({
                text: 'I\'m sorry I can\'t read that. Please enter the time in the following format: 10:30am',
                action: 'end_time'
            }, 'bad_end_time');

            convo.addMessage({
                text: 'You gave a valid datetime string for the end_time',
                action: 'success'
            }, 'good_end_time');

            convo.addQuestion('Ok! Please also enter the end time in the same format: 10:30am', [
                {
                    pattern: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9][ap]m$',
                    callback: function(res, convo) {
                        // TODO: Update Database with new end time
                        convo.gotoThread('good_end_time');
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.gotoThread('bad_end_time');
                    },
                }
            ], {}, 'end_time');

            // Check phone number
            convo.beforeThread('success', function(convo, next) {
                checkPhoneNumber(convo.source_message.user, function(exists) {
                    if (!exists) {
                        convo.gotoThread('no_phone_number');
                    }
                });
            });

            // Get phone number
            convo.addMessage({
                text: 'Ok so your phone number is 1234567890, thank you!',
                action: 'success'
            }, 'good_phone_number');

            convo.addMessage({
                text: 'We need your contact information so that the seller can contact you!',
                action: 'no_phone_number'
            }, 'bad_phone_number');

            convo.addQuestion('Please enter your phone number so that the seller can contact you when matched!', [
                {
                    pattern: '^[0-9]{10}$',
                    callback: function(res, convo) {
                        // TODO: Update Database with new end time
                        convo.gotoThread('good_phone_number');
                    }
                },
                {
                    default: true,
                    callback: function(res, convo) {
                        convo.gotoThread('bad_phone_number');
                    },
                }
            ], {}, 'no_phone_number');

            // Success confirmation
            convo.addMessage({
                text: 'Ok! We\'ve placed a buy order for you at 10:30am today! We\'ll keep you posted when we find a' +
                ' match for you!',
                action: 'completed'
            }, 'success')

        });
    });

};
