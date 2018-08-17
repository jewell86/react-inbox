import React, { Component } from 'react'
import Label from './Label'
import Body from './Body'

class Message extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false
    }
  }

  selected = () => {
    this.setState({
      isSelected: !this.state.isSelected
    })
  }

  render() {
    let { id, subject, body, read, starred, selected, labels, starClick, checkClick } = this.props

    const isRead = read ? 'read' : 'unread'
    const isSelected = selected ? 'selected' : ''
    const isStarred = starred ? 'fa-star' : 'fa-star-o'
    const isChecked = selected ? 'checked' : ''

    return (
    <div>
      <div className={`row message ${ isRead } ${ isSelected }`} >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input onChange={ () => checkClick(id) } type="checkbox" checked={ isChecked } />
            </div>
            <div className="col-xs-2">
              <i onClick={ () => starClick(id) } className={`star fa ${ isStarred }`}></i>
            </div>
          </div>
        </div>
        <div className={`col-xs-11`} onClick={ () => this.selected() }>
            { labels.map((label, index) => <Label key={ index } label={ label }/>) }
            <a href="#">
              { subject }
            </a>
        </div>
      </div>
        { this.state.isSelected ? <Body body={ body } /> : null }
    </div>
    )
  }
}

export default Message