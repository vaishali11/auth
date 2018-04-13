import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class SignIn extends Component {
  handleFormSubmit({ email, password }){
    console.log('email and pass', email, password);
    this.props.signinUser({email, password})
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div>
      )
    }
  }
  render() {
    const { handleSubmit } = this.props
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <label>Email: </label>
          <Field className="form-control" name='email' component='input'/>
        </div>
        <div className="form-group">
          <label>Password: </label>
          <Field className="form-control" name='password' type='password' component='input'/>
        </div>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}
const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error }
}
export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signin',
})(SignIn))
