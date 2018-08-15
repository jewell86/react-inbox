import React, { Component } from 'react'
import Message from './Message'

const MessageList = ({ messages, starClick, checkClick, messageRead }) => {
    return (
        messages.map(message => {
        return <Message key={ message.id } starClick={ starClick } checkClick={ checkClick } messageRead={ messageRead } { ...message }/>
        })
    )
}

export default MessageList