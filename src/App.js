import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'

class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: 
        [
          {
            "id": 1,
            "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
            "read": false,
            "starred": true,
            "labels": ["dev", "personal"]
          },
          {
            "id": 2,
            "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
            "read": false,
            "starred": false,
            "selected": true,
            "labels": []
          },
          {
            "id": 3,
            "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
            "read": false,
            "starred": true,
            "labels": ["dev"]
          },
          {
            "id": 4,
            "subject": "We need to program the primary TCP hard drive!",
            "read": true,
            "starred": false,
            "selected": true,
            "labels": []
          },
          {
            "id": 5,
            "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
            "read": false,
            "starred": false,
            "labels": ["personal"]
          },
          {
            "id": 6,
            "subject": "We need to back up the wireless GB driver!",
            "read": true,
            "starred": true,
            "labels": []
          },
          {
            "id": 7,
            "subject": "We need to index the mobile PCI bus!",
            "read": true,
            "starred": false,
            "labels": ["dev", "personal"]
          },
          {
            "id": 8,
            "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
            "read": true,
            "starred": true,
            "labels": []
          }
        ]
      
    }
  }

  starClick = (id) => {
    const newMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.starred = !message.starred
      }
      return message
    }) 
    this.setState({
      messages: newMessages
    })
 }

 checkClick = (id) => {
   const newMessages = this.state.messages.map(message => {
     if(message.id === id) {
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
    

  markAsRead = (props) => {
    const newMessages = this.state.messages.map(message => {
      if(message.selected === true) message.read = true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  markAsUnread = (props) => {
    const newMessages = this.state.messages.map(message => {
      if(message.selected === true) message.read = false
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  delete = () => {
    const newMessages = this.state.messages.filter(message => !message.selected)
    console.log(newMessages)
    this.setState({
      messages: newMessages
    })
  }

  applyLabel = (event) => {
    const newMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        if (message.labels.includes(event.target.value)) return message
        else { message.labels.push(event.target.value) }
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  removeLabel = (event) => {
    const newMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        const newLabels = message.labels.filter(label => label !== event.target.value)
        message.labels = newLabels
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

 
 
 
  render() {
    return (
      <div className="container">

        <Toolbar removeLabel={ this.removeLabel } applyLabel={ this.applyLabel } delete={ this.delete } markAsUnread={ this.markAsUnread } markAsRead={ this.markAsRead } messages={ this.state.messages } checkAll={ this.checkAll } />

        <MessageList starClick={ this.starClick } checkClick={ this.checkClick } messages={ this.state.messages } messageRead={ this.messageRead }/>
        
      </div>
    );
  }
}

export default App;
