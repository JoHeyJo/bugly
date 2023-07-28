//modules 
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Routes, Route, Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//components / modules
import { IUser } from './interface'
import { userGet, userDelete } from './api'
import Projects from "./Projects";
// style
import './style/User.css'

const defaultUser: IUser = { id: 0, firstName: '', lastName: '', image: '', email: '' }

/** Displays user information
 * 
 * State:
 * - user: {id: number, firstName: string, lastName: string}
 * 
 * RouteList -> User
 */
function User() {
  const [user, setUser] = useState<IUser>(defaultUser)
  const [postId, setPostId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const params = useParams();

  /** fetches user with matching ID from database */
  try{
    useEffect(() => {
      async function fetchUser(id: number | undefined) {
        const res = await userGet(id);
        setUser(res)
      }
      fetchUser(+params.user_id!)
    }, [postId])
  }catch(error:any){
    console.log('error fetching user')
  }

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

  return (
    <>
      <Row>
        <Col>
          <div className="User-posts"><Projects userId={+params.user_id!} /></div>
        </Col>
      </Row>
    </>
  )
}

export default User