
module.exports = function(controller) {

    // Function to end all convos (prevent spillover contexts)
    function endExistingConvos(user) {
        console.log('Attempting to end existing convos')
        var tasks = controller.tasks
        for (let task of tasks) {
            for (let convo of task.convos) {
                if (convo.isActive() && convo.source_message.user == user) {
                    convo.stop()
                    console.log('Stopped a convo!')
                }
            }
        }

    }

    // Postback button call by Facebook on initial interaction with page
    controller.hears(['get_started'], 'facebook_postback', function(bot, message) {
        console.log("Received a get_started postback message!");

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
                        'payload':'get_status',
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
