//dependencies
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Container } from "react-bootstrap";
//components
import { IUser } from './interface'
import { usersGet } from "./api";
import HomePage from "./HomePages";
// style
import './style/Users.css';

/** displays list of all users
 * 
 * State:
 * - users: [{},{},{}...]
 * 
 */
function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  /**Fetches all users from database */
  useEffect(() => {
    async function fetchUsers() {
      const res = await usersGet();
      setUsers(res)
    }
    fetchUsers();
  }, [])

  return (
    // <Container>
      <div className="Users-container">
        {/* <h1>
          Users
        </h1>
        <div className="Users-box">
          {users.map(u => <li key={u.id} className="Users-user"><Link to={`/users/${u.id}`} > {u.firstName} {u.lastName}</Link></li>)}
        </div> */}
        {/* <Link to="/signup">
          <Button variant="primary">Add user</Button>
        </Link> */}
        <HomePage />
      </div>
    // {/* </Container> */}
  )
}

export default Users;