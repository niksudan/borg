var borg = require('./src/borg');
var config = require("./config");
var SlackBot = require('slackbots');

borg.name = config.name;
borg.mention = '<@' + config.slack.id + '>';

var slackbot = new SlackBot({
    token: config.slack.token,
    name: config.slack.name
});

slackbot.on('message', function(data) {
    if (data.type == 'message' && data.user != config.slack.id) {
        borg.handle(data.text, function(response)
		{
			var message = '<@' + data.user + '>: ' + response;
		    slackbot.postMessage(data.channel, message, {icon_emoji: ':robot_face:'}).then(function(data) {
		        console.log('[' + config.name + ' @ ' + data.channel + ']: ' + message);
		    });
		});
    }
});