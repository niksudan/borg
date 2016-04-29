module.exports = {
	
	// Flip a coin
	coinflip: function(response)
	{
		if (Math.random() >= 0.5) {
			response('It\'s heads');
		} else {
			response('It\'s tails');
		}
	}
};