import './index.css'

const UserForm = props => {
  const {formData, onInputChange, isEditing, modifyUserList} = props
  const errors = {}

  const validateForm = () => {
    const {email, firstName, lastName, department} = formData
    let hasErrors = false

    // Handling input errors here
    if (!email || !firstName || !lastName || !department) {
      errors.formData = 'Fill the required data correctly'
      hasErrors = true
    } else if (!email.includes('@') || !email.includes('.')) {
      errors.email = 'Invalid email format.'
      hasErrors = true
    }

    return {hasErrors, errors}
  }

  const handleSubmit = event => {
    event.preventDefault()
    const {hasErrors} = validateForm()

    if (!hasErrors) {
      modifyUserList()
    } else {
      // Display errors to the user
      Object.keys(errors).forEach(key => {
        console.error(errors[key])
      })
    }
  }

  return (
    <div className="user-form-container">
      <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        {isEditing && (
          <div className="input-container-class">
            <label className="label-class" htmlFor="id">
              ID:
            </label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              placeholder="Enter ID"
              className="input-class"
              disabled
            />
          </div>
        )}
        <div className="input-container-class">
          <label className="label-class" htmlFor="firstName">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter First Name"
            onChange={onInputChange}
            className="input-class"
          />
          {errors.firstName && (
            <p className="error-display">{errors.firstName}</p>
          )}
        </div>
        <div className="input-container-class">
          <label className="label-class" htmlFor="lastName">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter Last Name"
            onChange={onInputChange}
            className="input-class"
          />
          {errors.lastName && (
            <p className="error-display">{errors.lastName}</p>
          )}
        </div>
        <div className="input-container-class">
          <label className="label-class" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={onInputChange}
            className="input-class"
          />
          {errors.email && <p className="error-display">{errors.email}</p>}
        </div>
        <div className="input-container-class">
          <label className="label-class" htmlFor="department">
            Department:
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            placeholder="Enter Department"
            onChange={onInputChange}
            className="input-class"
          />
          {errors.department && (
            <p className="error-display">{errors.department}</p>
          )}
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm
