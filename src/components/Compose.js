import React, { Component } from 'react'

class Compose extends Component{
  constructor(props){
    super(props)
    this.state = {
        body: '',
        subject: ''
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    await this.setState({
      [event.target.name]: event.target.value
    })
    await this.props.addMessage({
      body: this.state.body,
      subject: this.state.subject
    })
    await this.props.composeSubmit()
  }

  onChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return (
      <form onSubmit={ this.onSubmit } className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input 
            onChange={ this.onChange }
            value={ this.state.subject }
            type="text" 
            className="form-control" 
            id="subject" 
            placeholder="Enter a subject" 
            name="subject" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea 
            onChange={ this.onChange }
            value={ this.state.body }
            name="body" 
            id="body" 
            className="form-control">
          </textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input 
            type="submit" 
            value="Send" 
            className="btn btn-primary" />
        </div>
      </div>
      </form> 
    )
  }
}

export default Compose