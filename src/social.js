var http = require('http');

module.exports = {
	
	// Say hi
	greet: function(response)
	{
		response('Hello!');
	},
	
	// Tell a pun
	pun: function(response, message, regex)
	{
		var match = message.match(regex);
		var topic = match[6] ? match[6] : (match[8] ? match[8] : '').toLowerCase();
		http.get('http://puns.niksudan.com/api/puns/random' + (topic ? '?topic=' + topic : ''), function(res) {
			var pun = '';
			res.on('data', function(chunk) {
				pun += chunk;
			});
			res.on('end', function() {
				pun = JSON.parse(pun);
				if (pun.error) {
					response('I couldn\'t think of a ' + topic + ' pun');
				} else {
					if (topic != '') {
						if (pun.topics.length == 0) {
							topic = 'indescribable'
						} else {
							topic = pun.topics[0];
						}
					}
					response('Here\'s a ' + topic + ' pun' + '... "' + pun.content + '"');
				}
			});
		});
	}
};