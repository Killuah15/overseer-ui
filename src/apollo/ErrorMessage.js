import React from 'react'
import { Alert } from 'react-bootstrap';

const ErrorMessage = props => {
  return props.error && <Alert bsStyle="danger"><h4>{props.message}</h4></Alert> || <div></div>
}

export default ErrorMessage
