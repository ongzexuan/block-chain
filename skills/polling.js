
module.exports = function(controller) {
    var userid = '1901868523233034';
    var userid2 = '2266808036727292';

    function try_match (cb) {
        var res = true;
        cb(res);
    }

    controller.on('try_match', function(bot, message) {
        try_match(function(res) {
            if (res) {
                bot.say({
                    text: 'hi',
                    channel: res[0]
                });
                bot.say({
                    text: 'hi',
                    channel: res[1]
                });
            } else {
                //Else ignore
            }
        })
    });

};
