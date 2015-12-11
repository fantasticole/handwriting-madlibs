import 'styles/styles.less'

import React from 'react'
import ReactDOM from 'react-dom'

import {appendToPage} from 'functions'
import {getHandwriting} from 'api'


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

	    getHandwriting('string', data => appendToPage(data, 'img'))

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
					<input key={i} type='text' placeholder={piece.content}></input>
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



