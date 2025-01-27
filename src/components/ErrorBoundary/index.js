// ErrorBoundary.js
import {Component} from 'react'
import './index.css'

class ErrorBoundary extends Component {
  state = {hasError: false, errorMessage: ''}

  static getDerivedStateFromError(error) {
    return {hasError: true, errorMessage: error.message}
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  handleReset = () => {
    this.setState({hasError: false, errorMessage: ''})
  }

  render() {
    const {hasError, errorMessage} = this.state
    const {children} = this.props
    if (hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>{errorMessage}</p>
          <button
            type="button"
            onClick={this.handleReset}
            className="reset-button"
          >
            Try Again
          </button>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
