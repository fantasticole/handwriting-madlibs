import request from 'browser-request'
import {tokens} from 'config'

export function getHandwriting(text, cb){
	let parameters = {
		url: 'render/png?',
		handwriting_id: '31SB2CWG00DZ',
		handwriting_size: '16px',
		line_spacing: 1,
		width: '200px',
		height: '200px'
	}
	// console.log(parameters)

	request({
		method: 'GET',
		uri: 'https://api.handwriting.io/handwritings',
		auth: {
			username: tokens.KEY,
			password: tokens.SECRET
		}
	}, function (error, response, body) {
		console.log(response.statusCode)
	  if (!error && response.statusCode == 200) {
	    console.log('Good to go!') // Confirm receipt of status: OK
		let img = document.createElement('img')
	    img.src = 'https://'+tokens.KEY+':'+tokens.SECRET+'@api.handwriting.io/render/png?handwriting_id='+parameters.handwriting_id+'&handwriting_size='+parameters.handwriting_size+'&line_spacing='+parameters.line_spacing+'&handwriting_color=%23000000&width='+parameters.width+'&height='+parameters.height+'&text='+text
	    // img.src = 'https://'+tokens.KEY+':'+tokens.SECRET+'@api.handwriting.io/render/png?handwriting_id='+parameters.handwriting_id+'&text=Test+For+Cole&handwriting_size=20px&width=500px&height=auto'
	    cb(img)
	  }
	})

}


