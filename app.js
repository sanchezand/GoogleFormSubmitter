const request = require('request');

// REPLACE FROM_URL WITH ACTUAL FROM URL
// Has to end with /formResponse?usp=pp_url&
var link = 'https://docs.google.com/forms/d/e/FORM_URL/formResponse?usp=pp_url&';

var maxResp = 25;
var resp = 0;

var entries = [
	'entry.131', // From question entry ID
]

var responses = [ // Array with answers to answer at random
	[
		'ANSWER 1', // Text answer from entry 1
		'ANSWER 2',
		'ANSWER 3'
	]
]

var links = []

for(var i=0; i<responses.length; i++){
	var l = link;
	var r = [];
	for(var j=0; j<responses[i].length; j++){
		r.push(entries[j] + '='+encodeURI(responses[i][j].replace(/ /g, '+')));
	}
	l += r.join('&') + '&submit=Submit'
	links.push(l);
}


var inter = setInterval(()=>{
	var alink = links[Math.floor(Math.random() * links.length)];
	request(alink, (err, res, body)=>{
		resp++;
		if(resp>=maxResp)clearInterval(inter);
	});
}, 2000);