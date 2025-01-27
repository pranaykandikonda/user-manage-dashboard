import {Component} from 'react'

import UserList from './components/UserList'
import UserForm from './components/UserForm'
import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

class App extends Component {
  state = {
    users: [],
    allUsers: [],
    formData: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    },
    isEditing: false,
    error: null,
    currentPage: 1,
    usersPerPage: 5,
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    const {usersPerPage} = this.state
    try {
      // fetching and displaying the users
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      const formattedUsers = data.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: 'Engineering',
      }))
      this.setState({
        allUsers: formattedUsers,
        users: formattedUsers.slice(0, usersPerPage),
      })
    } catch (error) {
      // error handling
      this.setState({error: error.message})
    }
  }

  handleInputChange = event => {
    const {name, value} = event.target
    this.setState(prevState => ({
      formData: {...prevState.formData, [name]: value},
    }))
  }

  modifyUserList = async () => {
    const {formData, isEditing} = this.state
    try {
      // updating the existing user details
      if (isEditing) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${formData.id}`,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
          },
        )
        if (!response.ok) throw new Error('Failed to update user')
        this.setState(prevState => ({
          users: prevState.users.map(user =>
            user.id === formData.id ? formData : user,
          ),
          formData: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
          },
          isEditing: false,
          error: null,
        }))
      } else {
        // creating the new user and adding to the list
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
          },
        )
        if (!response.ok) throw new Error('Failed to add user')
        this.setState(prevState => ({
          users: [
            ...prevState.users,
            {...formData, id: prevState.users.length + 6},
          ],
          formData: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
          },
          error: null,
        }))
      }
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  deleteUser = async id => {
    try {
      // deleting the user
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: 'DELETE',
        },
      )
      if (!response.ok) throw new Error('Failed to delete user')
      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== id),
        error: null,
      }))
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  editUser = user => {
    this.setState({formData: user, isEditing: true})
  }

  handlePageChange = pageNumber => {
    // loaded with 5 in each page
    const {usersPerPage, allUsers} = this.state
    this.setState({currentPage: pageNumber}, () => {
      const startIndex = (pageNumber - 1) * usersPerPage
      const endIndex = startIndex + usersPerPage
      const paginatedUsers = allUsers.slice(startIndex, endIndex)
      this.setState({users: paginatedUsers})
    })
  }

  render() {
    const {
      users,
      formData,
      isEditing,
      error,
      currentPage,
      usersPerPage,
      allUsers,
    } = this.state
    const totalPages = Math.ceil(allUsers.length / usersPerPage)

    return (
      // wrapping all the child components here
      <div className="app-container">
        <h1>User Management Dashboard</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="content-container">
          <ErrorBoundary>
            <UserList
              users={users}
              onDelete={this.deleteUser}
              onEdit={this.editUser}
            />
          </ErrorBoundary>
          <div className="pagination-container">
            {Array(totalPages)
              .fill(null)
              .map((_, index) => (
                <button
                  type="button"
                  key={`page-${index + 1}`} // Use a unique string as key
                  className={`page-button ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                  onClick={() => this.handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
          </div>
          <ErrorBoundary>
            <UserForm
              formData={formData}
              isEditing={isEditing}
              onInputChange={this.handleInputChange}
              modifyUserList={this.modifyUserList}
            />
          </ErrorBoundary>
        </div>
      </div>
    )
  }
}

export default App
