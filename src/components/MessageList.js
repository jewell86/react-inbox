import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starClick, checkClick, openMessage }) => {
  return (
    messages.map(message => {
      return <Message key={ message.id } starClick={ starClick } checkClick={ checkClick } { ...message } openMessage={ openMessage }/>
    })
  )
}

export default MessageList