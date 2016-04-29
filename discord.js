var borg = require('./src/borg');
var config = require("./config");
var Discord = require('discord.io');

borg.name = config.name;
borg.mention = '<@' + config.discord.id + '>';

var discord = new Discord({
    autorun: true,
    token: config.discord.token,
    username: config.name
});

discord.on('message', function(user, userID, channelID, message, rawEvent) {
    if (userID != config.discord.id) {
		borg.handle(message, function(response)
		{
			var message = '<@' + userID + '>: ' + response;
			discord.sendMessage({to: channelID, message: message});
			console.log('[' + config.name + ' @ ' + channelID + ']: ' + message);
		});
	}
});