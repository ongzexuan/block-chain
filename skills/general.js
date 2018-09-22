
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

        bot.startConversation

        // controller.studio.run(bot, 'get_human_help', message.user, message.channel, message).catch(function (err) {
        //     if (err) {
        //         controller.studio.run(bot, 'default_fallback', message.user, message.channel, message);
        //         debug('Botkit Studio: ', err);
        //     }
        // });

    });

};
