var borg = {
	name: 'borg',
	mention: false,
	responses: [
		[/\bh(e(y|llo)|i)\b/i, 'social', 'greet'],
		[/\bflip (a )?coin\b/, 'games', 'coinflip'],
	],
	
	handle: function(message, response)
	{
		var responded = false;
		for (var i = 0; i < this.responses.length; i++) {
			if (!responded && message.match(this.responses[i][0])) {
				if (borg.mention && message.indexOf(borg.mention) > -1) {
					responded = true;
					this[this.responses[i][1]][this.responses[i][2]](response);
					break;
				}
			}
		}
	},
	
	social: require('./social.js'),
	games: require('./games.js')
};

module.exports = borg;