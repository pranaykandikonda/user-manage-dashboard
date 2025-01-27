import './index.css'

const UserList = props => {
  const {users, onEdit, onDelete} = props
  return (
    <div className="user-list-container">
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        // creating the table to display the user details in it
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserList
