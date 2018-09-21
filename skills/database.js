module.exports = function(controller) {

    // Get data
    function getFromDatabase(convo, cb) {
        controller.storage.users.get(convo.source_message.user, function(err, user_data) {
            if (err) {
                console.log('Error getting user data from database for user ' + convo.source_message.user);
            } else {
                if (user_data == null) {
                    cb(user_data, 'No data received');
                } else {
                    cb(user_data, null);
                }
            }
        });
    }

    // Custom function to update DB
    function updateDatabase(convo, data) {
        controller.storage.users.get(convo.source_message.user, function(err, user_data) {
            if (err) {
                console.log('Error getting user data from database for user ' + convo.source_message.user)
            } else if (user_data == null) {
                console.log('New user ' + convo.source_message.user + ' found, creating new entry')
                data['id'] = convo.source_message. user;
                controller.storage.users.save(data, function(err) {
                    cb(err)
                });
            } else {
                console.log('Received user_data from database for user ' + convo.source_message.user);
                for (var key in data) {
                    user_data[key] = data[key];
                }
                data['id'] = convo.source_message.user
                controller.storage.users.save(user_data, function(err) {
                    if (err) {
                        cb(err)
                    }
                });
            }
        });
    }
};