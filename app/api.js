import request from 'browser-request'
import {tokens} from 'config'

export function getHandwriting(text, imgClass, cb){
	let parameters = {
		url: 'render/png?',
		handwriting_id: '31SB2CWG00DZ',
		handwriting_size: '14px',
		line_spacing: 1,
		width: '130px',
		height: '35px'
	}

	request({
		method: 'GET',
		uri: 'https://api.handwriting.io/handwritings',
		auth: {
			username: tokens.KEY,
			password: tokens.SECRET
		}
	}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // Confirm receipt of status: OK
		let img = document.createElement('img')
	    img.src = 'https://'+tokens.KEY+':'+tokens.SECRET+'@api.handwriting.io/render/png?handwriting_id='+parameters.handwriting_id+'&handwriting_size='+parameters.handwriting_size+'&line_spacing='+parameters.line_spacing+'&handwriting_color=%23000000&width='+parameters.width+'&height='+parameters.height+'&text='+text
	    img.className = imgClass
	    cb(img)
	  }
	})

}


