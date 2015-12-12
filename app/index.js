import 'styles/styles.less'

import React from 'react'
import ReactDOM from 'react-dom'

import {appendToPage} from 'functions'
import {getHandwriting} from 'api'

class Handwriting extends React.Component {
	// when the input loses focus...
	onBlur(){
		let text = ReactDOM.findDOMNode(this).value
		let thisClass = ReactDOM.findDOMNode(this).className
		// send the value to be turned into a handwriting image and give it the class name of the input it will replace
		getHandwriting(text, thisClass, data => appendToPage(data, 'img'))
	}
	render() {
		return (
        	<input type='text' placeholder={this.props.placeholder} onBlur={this.onBlur.bind(this)} className={`element-${this.props.index}`}></input>
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
				if (piece.story_type === 'string'){
					return (
						<p key={i}>{piece.content}</p>
					)
				}
				return (
					<Handwriting key={i} placeholder={piece.content} index={i}/>
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



