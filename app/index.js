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

		// have text available to be updated
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
		// set image class name
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
	// select input text on fucos
	handleFocus(event) {
		event.target.select()
	}
	render() {
		// render an input...
		if (this.state.type === 'input'){
			// with previously entered text
			if (this.state.text){
				return (
		        	<input type='text' defaultValue={this.state.text} onBlur={this.onBlur.bind(this)} className={`element-${this.props.index}`} autoFocus onFocus={this.handleFocus}></input>
				)
			}
			return (
	        	<input type='text' placeholder={this.props.placeholder} onBlur={this.onBlur.bind(this)} className={`element-${this.props.index}`}></input>
			)
		}
		// render an image
		return (
			<img src={this.state.img} className={this.state.imgClass} onClick={this.switchToInput.bind(this)}/>
		)
	}
}

class Paragraph extends React.Component {
	componentWillMount() {
	    this.setState({
	    	text: this.shiftText(this.props.text)
	    })
	}
	shiftText(string) {
		let alphabet = 'abcdefghijklmnopqrstuvwxyz'
		let upper = alphabet.toUpperCase()
		let shifted = ''
		let loc = 0
		for (let x = 0; x < string.length; x++){
			// if the current character is found in the lowercase alphabet...
			if (alphabet.indexOf(string[x]) !== -1){
				loc = alphabet.indexOf(string[x])
				loc=loc+13
				if (loc > 25){
					loc=loc-26
				}
				shifted += alphabet[loc]
			// if the current character is found in the uppercase alphabet...
			} else if (upper.indexOf(string[x]) !== -1){
				loc = upper.indexOf(string[x])
				loc=loc+13
				if (loc > 25){
					loc=loc-26
				}
				shifted += upper[loc]
			} else {
				shifted += string[x]
			}
		}
		return shifted
	}
	render() {
		if (this.props.shifted === true){
			return (
				<p className='blurry'>{this.state.text}</p>
			)
		} else {
			return (
				<p className='blurry'>{this.props.text}</p>
			)
		}
	}
}

class Madlibs extends React.Component {
	componentWillMount() {
	    this.setState({
	    	story: undefined,
	    	shifted: true,
	    	button: 'Reveal Text'
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
			    content: '.'
			},
		    {
		    	story_type: 'string',
			    content: ' Little did I know, the '
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
	handleClick() {
		// map button text options
		let changeButton = {
			'Hide Text': 'Reveal Text',
			'Reveal Text': 'Hide Text'
		}
		// toggle text shifting and button text
		this.setState({
			shifted: !this.state.shifted,
	    	button: changeButton[this.state.button]
		})
	}
	render() {
		let story = this.state.story
		let shift = this.state.shifted

		if (story){
			let madlib = story.map(function(piece, i){
				// if the part of the story is a string, add it to the page as a paragraph
				if (piece.story_type === 'string'){
					return (
						<Paragraph key={i} text={piece.content} shifted={shift}/>
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
		        	<button onClick={this.handleClick.bind(this)}>{this.state.button}</button>
				</div>
			)
		}
		return (
        	<div className='details'>
	        	<p>Loading...</p>
			</div>
		)

	}
}


ReactDOM.render((
	<Madlibs />
), document.getElementById('app'));



