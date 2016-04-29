var borg = {
	name: 'borg',
	mention: false,
	responses: [
		[/\bh(e(y|llo)|i)\b/i, 'social', 'greet'],
		[/\bflip (a )?coin\b/, 'games', 'coinflip'],
		[/\b((give|tell|send|post) (me )?)?(a )?(([A-Za-z ]*) )?pun( about ([A-Za-z ]*))?\b/, 'social', 'pun'],
	],
	
	handle: function(message, response)
	{
		var responded = false;
		for (var i = 0; i < this.responses.length; i++) {
			if (!responded && message.match(this.responses[i][0])) {
				if (borg.mention && message.indexOf(borg.mention) > -1) {
					responded = true;
					this[this.responses[i][1]][this.responses[i][2]](response, message, this.responses[i][0]);
					break;
				}
			}
		}
	},
	
	social: require('./social.js'),
	games: require('./games.js')
};

module.exports = borg;