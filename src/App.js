import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Compose from './components/Compose'
import axios from 'axios'

class App extends Component {
	constructor() {
		super ()
			this.state = {
				messages: [],
				showCompose: false	
			}
	}

	componentDidMount() {
		this.getMessages()
	}

	getMessages = async() => {
		const response = await axios.get(`http://localhost:8082/api/messages`)
	  this.setState({
			messages: response.data
		})
	}	

	addMessage = async({ body, subject }) => {
		const newMessages = [ ...this.state.messages, { "subject": subject, "read": false, "starred":   false, "labels": [],         "body": body } ]
		await axios.post(`http://localhost:8082/api/messages`, { body, subject })
		this.setState({
			messages: newMessages
		})
	}

	starClick = async(id) => {
		const newMessages = this.state.messages.map(message => {
			if (message.id === id) {
				message.starred = !message.starred
			}
			return message
		})
		await axios.patch(`http://localhost:8082/api/messages`, { messageIds: [ id ], command: 'star'}  )
		this.setState({
			messages: newMessages
		})
	}

	checkClick = (id) => {
		const newMessages = this.state.messages.map(message => {
			if (message.id === id) {
				message.selected ? delete message.selected : message.selected = true
			}
			return message
		})
		this.setState({
			messages: newMessages
		})
	}

	checkAll = () => {
		const all = this.state.messages.every(message => {
			return message.selected === true
		})
		const newMessages = this.state.messages.map(message => {
			all ? delete message.selected : message.selected = true
			return message
		})
		this.setState({
			messages: newMessages
		})
	}

	markAsRead = async() => {
		let selected = []
		const newMessages = this.state.messages.map(message => {
			if (message.selected === true) {
				message.read = true
				selected.push(message.id)
			}	
			return message
		})
		await axios.patch(`http://localhost:8082/api/messages`, { messageIds: [ ...selected ],          command: 'read', "read": true })
		this.setState({
			messages: newMessages
		})
	}

	markAsUnread = async() => {
		let selected = []
		const newMessages = this.state.messages.map(message => {
			if (message.selected === true) {
				message.read = false
				selected.push(message.id)
			}	
			return message
		})
		await axios.patch(`http://localhost:8082/api/messages`, { messageIds: [ ...selected ],          command: 'read', "read": false})
		this.setState({
			messages: newMessages
		})
	}

	delete = async() => {
		let selected = []
		this.state.messages.map(message => {
			if (message.selected === true) {
				selected.push(message.id)
			}	
			return message
		})
		await axios.patch(`http://localhost:8082/api/messages`, { messageIds: [ ...selected ],           command: 'delete' })
		await this.getMessages()
		}

	applyLabel = async(event) => {
		let selected = []
		const newMessages = this.state.messages.map(message => {
			if (message.selected === true) {
				if (message.labels.includes(event.target.value)) return message
				else { 
					message.labels.push(event.target.value) 
					selected.push(message.id)
				}
			}
			return message
		})
		await axios.patch(`http://localhost:8082/api/messages`, { messageIds: [ ...selected ],          command: 'addLabel', label: event.target.value })
		this.setState({
			messages: newMessages
		})
	}

	renderCompose = () => {
		this.setState({
			showCompose: !this.state.showCompose
		})
	}

	composeSubmit = () => {
		this.setState({
			showCompose: !this.state.showCompose
		})
		this.getMessages()
	}

	removeLabel = (event) => {
		const newMessages = this.state.messages.map(message => {
			if (message.selected === true) {
				const newLabels = message.labels.filter(label => label !== event.target.value)
				message.labels = newLabels
			}
			return message
		})
		this.setState({
			messages: newMessages
		})
	}

	removeLabel = async(event) => {
		let selected = []
		const newMessages = this.state.messages.map(message => {
			if (message.selected === true) {
				const newLabels = message.labels.filter(label => label !== event.target.value)
				message.labels = newLabels
				selected.push(message.id)
			}
			return message
		})
		await axios.patch(`http://localhost:8082/api/messages`, { messageIds: [ ...selected ],          command: 'removeLabel', label: event.target.value })
		this.setState({
			messages: newMessages
		})
	}

	render() {
		return (
			<div className="container">

				<Toolbar removeLabel={ this.removeLabel } applyLabel={ this.applyLabel } delete={ this.delete } markAsUnread={ this.markAsUnread } markAsRead={ this.markAsRead } messages={  this.state.messages } checkAll={ this.checkAll } renderCompose={ this.renderCompose }/>

				<MessageList starClick={ this.starClick } checkClick={ this.checkClick } messages={ this.state.messages } openMessage={ this.openMessage }/>

				{ this.state.showCompose ? <Compose composeSubmit={ this.composeSubmit } addMessage={ this.addMessage } /> : null }

			</div>
		);
	}
}

export default App;
