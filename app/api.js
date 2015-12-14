import request from 'browser-request'
import {tokens} from 'config'

export function getHandwriting(text, cb){
	let size = text.length*10
	let extra = (text.match(/w/g) || []).length*3
	size += extra
	let parameters = {
		url: 'render/png?',
		handwriting_id: '5WGWVW8800VV',
		handwriting_size: '14px',
		line_spacing: 1,
		width: size+'px',
		height: '35px',
		min_padding: '3px'
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
	    let src = 'https://'+tokens.KEY+':'+tokens.SECRET+'@api.handwriting.io/render/png?handwriting_id='+parameters.handwriting_id+'&handwriting_size='+parameters.handwriting_size+'&line_spacing='+parameters.line_spacing+'&handwriting_color=%23000000&width='+parameters.width+'&height='+parameters.height+'&min_padding='+parameters.min_padding+'&text='+text
	    cb(src)
	  }
	})

}


