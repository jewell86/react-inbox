import React, { Component } from 'react'

class Toolbar extends Component {  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  checkIcon = (messages) => {
    const allMessages = messages.every(message => message.selected === true)
    const someMessages = messages.some(message => message.selected === true)
    if (allMessages) return `fa fa-check-square-o`
    else if (someMessages) return `fa fa-minus-square-o`
    else return `fa fa-square-o`
  }

  countMessages = (messages) => {
  let counter = 0
    messages.map(message => {
      if (message.read === false) counter++
    })
    if(counter === 1) return `${counter} unread message`
    else return `${counter} unread messages`
  }

  render() {
    let isEnabled = true
    if (this.props.messages.find(message => message.selected === true)) isEnabled = true
    else isEnabled = false

    return (
      <div className="row toolbar">
        < div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge"> { this.countMessages(this.props.messages) }</span>
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus" onClick={ this.props.renderCompose }></i>
          </a>
      
          <button onClick={ this.props.checkAll } className="btn btn-default">
            <i className={this.checkIcon(this.props.messages)}></i>
          </button>
      
          <button onClick={ this.props.markAsRead } disabled={ !isEnabled } className="btn btn-default">
            Mark As Read
          </button>
      
          <button onClick={ this.props.markAsUnread } disabled={ !isEnabled } className="btn btn-default">
            Mark As Unread
          </button>
      
          <select onChange={ this.props.applyLabel } disabled={ !isEnabled }                        className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
      
          <select onChange={ this.props.removeLabel } disabled={ !isEnabled }                       className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
      
          <button onClick={ this.props.delete } disabled={ !isEnabled }className="btn               btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )  
  } 

}

export default Toolbar