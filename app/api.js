import request from 'browser-request'
import {tokens} from 'config'

export function getHandwriting(text, cb){	
	let parameters = {
		url: 'render/png?',
		Authorization: tokens.KEY+':'+tokens.SECRET,
		handwriting_id: '31SB2CWG00DZ',
		width: '200px',
		height: '200px',
	}
	console.log(parameters)

	return request({
		method: 'GET',
		uri: 'https://api.handwriting.io/handwritings',
		auth: {
			username: tokens.KEY,
			password: tokens.SECRET
		}
	}, function (error, response, body) {
		console.log(response.statusCode)
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the page.
	    cb(JSON.parse(body))
	  }
	})
}


