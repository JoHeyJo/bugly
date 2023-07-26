//modules 
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Routes, Route, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
//components / modules
import { IUser } from './interface'
import { userGet, userDelete } from './api'
import UserForm from './UserForm'
import Posts from './Posts';
import Projects from "./Projects";
import Post from './Post';
// style
import './style/User.css'
import img from './default.png'

const defaultUser: IUser = { id: 0, firstName: '', lastName: '', image: '', email: '' }

/** Displays user information
 * 
 * State:
 * - user: {id: number, firstName: string, lastName: string}
 * 
 * Users -> User
 */
function User() {
  const [user, setUser] = useState<IUser>(defaultUser)
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState<number | undefined>(undefined);
  const [projectId, setProjectId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const params = useParams();

  /** fetches user with matching ID from database */
  useEffect(() => {
    async function fetchUser(id: number | undefined) {
      const res = await userGet(id);
      setUser(res)
    }
    fetchUser(+params.user_id!)
  }, [postId])

  /** navigates to user edit page */
  const handleClick = () => {
    navigate(`/users/${user.id}/edit`, {
      state: { userId: user.id }
    });
  };

  /** passes user ID to API delete function */
  async function removeUser(userId: number) {
    try {
      const res = await userDelete(userId);
      navigate('/')
    } catch (error: any) {
      console.error("User: Issue removing user" + error)
    }
  }

  function updatePostId(postId: number) {
    setPostId(postId)
  }

  function updateProjectId(projectId: number | undefined) {
    setProjectId(projectId)
  }

  return (
    <>
      {/* <Row className="position-absolute">
        <Col className="col-3 p-5">
          <img src={img} alt={`${user.firstName || 'default profile'} profile picture`} height="400px" width="400px"></img>
          <div className="User-user">
            <div className="User-fn">{user.firstName}</div>
            <div className="User-ln">{user.lastName}</div>
          </div>
          <div> */}
            {/* <Button variant="primary" onClick={handleClick}>Edit</Button>
            <Button variant="danger" onClick={() => removeUser(user.id)}>Delete</Button> */}
          {/* </div> */}
        {/* </Col>
      </Row> */}
      <Row>
        <Col>
          <div className="User-posts"><Projects userId={+params.user_id!} /></div>
        </Col>
      </Row>
    </>
  )
}

export default User