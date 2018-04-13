import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const renderInput = (props) => {
  const { input, meta: { touched, error }, ...other} = props
  return(
    <div>
      <input
        {...input}
        value={input.value}
        name={input.name}
        className={other.className}
        {...other}
        />
      {touched && error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  )
}

class Signup extends Component{
  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      )
    }
  }
  render(){
    const submit = (props) => {
      this.props.signupUser(props)
    }
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(submit)}>
        <fieldset className="form-group">
          <label>Email: </label>
          <Field className="form-control" name="email" component={renderInput}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <Field className="form-control" type='password' name="password" component={renderInput}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password: </label>
          <Field className="form-control" type='password' name="confirmPassword" component={renderInput}/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

const validate = (props) => {
  const errors = {}
  if(!props.email){
    errors.email = 'Please enter email!'
  }
  if(!props.password){
    errors.password = 'Please enter a password!'
  }
  if(!props.confirmPassword){
    errors.confirmPassword = 'Please enter confirm password!'
  }
  if(props.password !== props.confirmPassword){
    errors.co = 'Password does not match!'
  }
  return errors
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate,
})(Signup))
