var debug = require('debug')('botkit:thread_settings');

module.exports = function(controller) {

    debug('Configuring Facebook thread settings...');
    controller.api.thread_settings.greeting("Hello! I am a friendly bot to help you buy and sell blocks!");
    controller.api.thread_settings.get_started('get_started');
    controller.api.thread_settings.menu([
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [    
                {
                    "type":"postback",
                    "title":"Buy",
                    "payload":"buy_block"
                },
                {
                    "type":"postback",
                    "title":"Sell",
                    "payload":"sell_block"
                },
                {
                    "type":"postback",
                    "title":"Check Status",
                    "payload":"check_status"
                }
            ]
        }]);
}
