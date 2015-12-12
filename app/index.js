import 'styles/styles.less'

import React from 'react'
import ReactDOM from 'react-dom'

import {getHandwriting} from 'api'

class Handwriting extends React.Component {
	componentWillMount() {
	    this.setState({
	    	type: 'input'
	    })
	}
	componentDidMount() {
		// Check for the user hitting enter
	    ReactDOM.findDOMNode(this).addEventListener('keydown', this.handleKeyDown)
	}
	handleKeyDown(key) {
		// If the user hits enter...
		let enter = 13
		if (key.keyCode === enter){
			// remove focus from the input
			this.blur()
		}
	}
	// when the input loses focus...
	onBlur() {
		// get text for id of div where image will go
		let identifier = ReactDOM.findDOMNode(this).className
		let text = ReactDOM.findDOMNode(this).value

		this.setState({
			text: text
		})
		// if there is text in the input box...
		if (text.length > 0){
			// send the value to be turned into a handwriting image and give it the class name of the input it will replace
			getHandwriting(text, source => this.switchToImage(source))
		}
	}
	switchToImage(image) {
		let imgClass = 'image-' + this.props.index

		this.setState({
			type: 'image',
			img: image,
			imgClass: imgClass
		})
	}
	switchToInput() {
		this.setState({
			type: 'input'
		})
	}
	render() {
		if (this.state.type === 'input'){
			if (this.state.text){
				return (
		        	<input type='text' defaultValue={this.state.text} onBlur={this.onBlur.bind(this)} className={`element-${this.props.index}`}></input>
				)
			}
			return (
	        	<input type='text' placeholder={this.props.placeholder} onBlur={this.onBlur.bind(this)} className={`element-${this.props.index}`}></input>
			)
		}
		return (
			<img src={this.state.img} className={this.state.imgClass} onClick={this.switchToInput.bind(this)}/>
		)
	}
}

class Madlibs extends React.Component {
	componentWillMount() {
	    this.setState({
	    	story: undefined
	    })
	}
	componentDidMount() {
	    let story = [
		    {
		    	story_type: 'string',
			    content: 'Today, I went to the '
			},
		    {
		    	story_type: 'input',
			    content: 'location'
			},
		    {
		    	story_type: 'string',
			    content: ' to get some '
			},
		    {
		    	story_type: 'input',
			    content: 'plural noun'
			},
		    {
		    	story_type: 'string',
			    content: '. Little did I know, the '
			},
		    {
		    	story_type: 'input',
			    content: 'job title'
			},
		    {
		    	story_type: 'string',
			    content: ' was my '
			},
		    {
		    	story_type: 'input',
			    content: 'family relation'
			},
		    {
		    	story_type: 'string',
			    content: '!'
			}
	    ]

	    this.setState({
	    	story: story
	    })

	}
	render() {
		let story = this.state.story

		if (story){
			let madlib = story.map(function(piece, i){
				// if the part of the story is a string, add it to the page as a paragraph
				if (piece.story_type === 'string'){
					return (
						<p key={i}>{piece.content}</p>
					)
				}
				// wrap input in a div which will hold the image when the input is replaced
				return (
					<div id={`element-${i}`} key={i}>
						<Handwriting placeholder={piece.content} index={i}/>
					</div>
				)
			})
			return (
	        	<div className='details'>
		        	{madlib}
				</div>
			)
		}
		return (
        	<div className='details'>
	        	<p>Yo</p>
			</div>
		)

	}
}


ReactDOM.render((
	<Madlibs />
), document.getElementById('app'));



