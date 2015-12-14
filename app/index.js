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
	componentDidUpdate() {
		// Check for the user hitting enter on re-rendered input
		if (this.state.type === 'input'){
		    ReactDOM.findDOMNode(this).addEventListener('keydown', this.handleKeyDown)
		}
	}
	handleKeyDown(key) {
		// If the user hits enter...
		if (key.keyCode === 13){
			// remove focus from the input
			this.blur()
		}
	}
	// when the input loses focus...
	onBlur() {
		// get text for id of div where image will go
		let identifier = ReactDOM.findDOMNode(this).className
		let text = ReactDOM.findDOMNode(this).value
		// replace any of these chracters: `#$%^&*()[]\;><{} with a ?
		text = text.replace(/([\`\#\$\%\^\&\*\(\)\[\]\\\;\>\<\{\}])/g, '?')

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
	// get rid of input and render image of text
	switchToImage(image) {
		// set image class name
		let imgClass = 'image-' + this.props.index

		this.setState({
			type: 'image',
			img: image,
			imgClass: imgClass
		})
	}
	// get rid of image of text and render input
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
			// or empty from the beginning
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
	// set state to hold shifted text
	componentWillMount() {
	    this.setState({
	    	text: this.shiftText(this.props.text)
	    })
	}
	// move each letter 13 places away in the alphabet
	shiftText(string) {
		let alphabet = 'abcdefghijklmnopqrstuvwxyz'
		let upper = alphabet.toUpperCase()
		// string to be returned
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
		let paragraph = undefined
		// if the parent says the text should be shifted...
		if (this.props.shifted === true){
			// split the words on the state
			let words = this.state.text.split(' ')
			paragraph = words.map(function(word, x){
				// render each hidden word as a <p>
				return (
					<p className='blurry' key={x}>{word}</p>
				)
			})
		} else {
			// split the words from the props
			let words = this.props.text.split(' ')
			paragraph = words.map(function(word, x){
				// render each hidden word as a <p>
				return (
					<p key={x}>{word}</p>
				)
			})
		}
		// render the words together in a span, so that long sentences will split nicely onto rows as needed
		return (
			<span>{paragraph}</span>
		)
	}
}

class Madlibs extends React.Component {
	componentWillMount() {
	    let first = [
		    {
		    	story_type: "topic",
			    content: "How to Date the Coolest Guy/Girl in School"
			},
		    {
		    	story_type: "string",
			    content: "It's simple. Turn the "
			},
		    {
		    	story_type: "input",
			    content: "plural noun"
			},
		    {
		    	story_type: "string",
			    content: ". Make him/her want "
			},
		    {
		    	story_type: "input",
			    content: "adverb"
			},
		    {
		    	story_type: 'string',
			    content: " to date you. Make sure you're always dressed to "
			},
		    {
		    	story_type: "input",
			    content: "verb"
			},
		    {
		    	story_type: "string",
			    content: ". Each and every day, wear a/an "
			},
		    {
		    	story_type: "input",
			    content: "article of clothing"
			},
		    {
		    	story_type: "string",
			    content: " that you know shows off your "
			},
		    {
		    	story_type: "input",
			    content: "body part"
			},
		    {
		    	story_type: "string",
			    content: " to "
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: " advantage and make your "
			},
		    {
		    	story_type: "input",
			    content: "noun"
			},
		    {
		    	story_type: "string",
			    content: " look like a million "
			},
		    {
		    	story_type: "input",
			    content: "plural noun"
			},
		    {
		    	story_type: "string",
			    content: ". Even if the two of you make meaningful "
			},
		    {
		    	story_type: "input",
			    content: "another body part"
			},
		    {
		    	story_type: "string",
			    content: " contact, don't admit it. No hugs or "
			},
		    {
		    	story_type: "input",
			    content: "plural noun"
			},
		    {
		    	story_type: "string",
			    content: ". Just shake his/her "
			},
		    {
		    	story_type: "input",
			    content: "another body part"
			},
		    {
		    	story_type: "string",
			    content: " firmly. And remember, when he/she asks you out, even though a chill may run down your "
			},
		    {
		    	story_type: "input",
			    content: "noun"
			},
		    {
		    	story_type: "string",
			    content: " and you can't stop your "
			},
		    {
		    	story_type: "input",
			    content: "noun"
			},
		    {
		    	story_type: "string",
			    content: " from "
			},
		    {
		    	story_type: "input",
			    content: "verb ending in 'ing'"
			},
		    {
		    	story_type: "string",
			    content: ", just play it"
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: ". Take a long pause before answering in a very "
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: " voice. 'I'll have to "
			},
		    {
		    	story_type: "input",
			    content: "verb"
			},
		    {
		    	story_type: "string",
			    content: " it over.'"
			}
	    ]

	    let second = [
		    {
		    	story_type: "topic",
			    content: "Our Solar System"
			},
		    {
		    	story_type: "string",
			    content: "When we look up into the sky on a/an "
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: " summer night, we see millions of tiny spots of light. Each one represetns a/an "
			},
		    {
		    	story_type: "input",
			    content: "noun"
			},
		    {
		    	story_type: 'string',
			    content: ", which is the center of a/an "
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: " solar system with dozens of "
			},
		    {
		    	story_type: "input",
			    content: "plural noun"
			},
		    {
		    	story_type: "string",
			    content: " revolving "
			},
		    {
		    	story_type: "input",
			    content: "adverb"
			},
		    {
		    	story_type: "string",
			    content: " around a distant sun. Sometimes these suns expand and begin "
			},
		    {
		    	story_type: "input",
			    content: "verb ending in 'ing'"
			},
		    {
		    	story_type: "string",
			    content: " their neighbors. Soon they will become so big, they will turn into "
			},
		    {
		    	story_type: "input",
			    content: "silly word (plural)"
			},
		    {
		    	story_type: "string",
			    content: ". Eventually they subside and become "
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: " giants or perhaps black "
			},
		    {
		    	story_type: "input",
			    content: "plural noun"
			},
		    {
		    	story_type: "string",
			    content: ". Our own planet, which we call "
			},
		    {
		    	story_type: "input",
			    content: "first name"
			},
		    {
		    	story_type: "string",
			    content: ", circles around our "
			},
		    {
		    	story_type: "input",
			    content: "adjective"
			},
		    {
		    	story_type: "string",
			    content: "sun "
			},
		    {
		    	story_type: "input",
			    content: "number"
			},
		    {
		    	story_type: "string",
			    content: "times every year. There are eight other planets in our solar system. They are named "
			},
		    {
		    	story_type: "input",
			    content: "another first name"
			},
		    {
		    	story_type: "string",
			    content: ", "
			},
		    {
		    	story_type: "input",
			    content: "another first name"
			},
		    {
		    	story_type: "string",
			    content: ", "
			},
		    {
		    	story_type: "input",
			    content: "another first name"
			},
		    {
		    	story_type: "string",
			    content: ", "
			},
		    {
		    	story_type: "input",
			    content: "another first name"
			},
		    {
		    	story_type: "string",
			    content: ", "
			},
		    {
		    	story_type: "input",
			    content: "another first name"
			},
		    {
		    	story_type: "string",
			    content: ", "
			},
		    {
		    	story_type: "input",
			    content: "another first name"
			},
		    {
		    	story_type: "string",
			    content: ", Jupiter and Mars. Scientists who study these planets are called"
			},
		    {
		    	story_type: "input",
			    content: "plural noun"
			},
		    {
		    	story_type: "string",
			    content: "."
			}
	    ]
	    this.setState({
	    	story: undefined,
	    	shifted: true,
	    	button: 'Reveal Text',
	    	options: [first, second]
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
	chooseStory(event) {
		let current = event.target.className
		// get story index
		let index = parseInt(current.slice(current.indexOf('-')+1))

		// set story by index in options
		this.setState({
			story: this.state.options[index]
		})
	}
	changeStory() {
		this.setState({
			story: undefined
		})
	}
	render() {
		let stories = undefined
		let story = this.state.story
		let shift = this.state.shifted

		if (story){
			let madlib = story.map(function(piece, i){
				// if the part of the story is a topic, add it to the page as a header
				if (piece.story_type === 'topic'){
					return (
						<h1 key={i}>{piece.content}</h1>
					)
				}
				// if the part of the story is a string, add it to the page as a paragraph
				else if (piece.story_type === 'string'){
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
		        	<br/>
		        	<div className='actions'>
			        	<button onClick={this.handleClick.bind(this)}>{this.state.button}</button>
			        	<button onClick={this.changeStory.bind(this)}>Change Story</button>
		        	</div>
				</div>
			)
		}
		else {
			// store function as variable to pass to button
			let clickFunction = this.chooseStory.bind(this)
			// list story options
			stories = this.state.options.map(function(story, y){
				return(
					<button key={y} className={`story-${y}`} onClick={clickFunction}>{story[0].content}</button>
				)
			})
		}
		return (
        	<div className='details'>
	        	<h1>Choose a Story!</h1>
	        	<ul>{stories}</ul>
			</div>
		)

	}
}


ReactDOM.render((
	<Madlibs />
), document.getElementById('app'));



