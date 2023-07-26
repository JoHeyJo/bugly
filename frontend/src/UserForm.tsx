//dependencies
import React, { useEffect, useState } from 'react';
import { Alert, Button } from "react-bootstrap";
// import { redirect } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
//components
import { IUser, IAlert } from './interface';
import { userAdd, userUpdate, userEdit } from './api';
// style
import './style/Form.css';
import AlertPopUp from './AlertPopUp';

const defaultUser = { id: 0, firstName: undefined, lastName: undefined, image: '', email: '' };
const defaultAlert: IAlert = { error: null };

/** Handles user information and renders form for new/edit user
 * 
 * Props:
 * 
 * State:
 * - user {firstName:string, lastName:string, imgUrl:string}
 * 
 * App -> Form
 */
function UserForm() {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [alert, setAlert] = useState<IAlert>(defaultAlert)
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId;

  /** Handles changes to form state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser(data => ({
      ...data,
      [name]: value,
    }))
  }

  /** Fetches existing user to edit though API*/
  async function fetchUser(id: number | undefined) {
    try {
      let res = await userEdit(id)
      setUser(res);
    } catch (error: any) {
      console.error(`Error: fetchUser => ${error}`)
    }
  }

  /** send user data to api */
  async function submitUser(e: any) {
    e.preventDefault();
    try {
      if (userId) {
        // update user
        let res = await userUpdate(user.id, user)
        setUser(defaultUser)
        navigate('/')
      } else {
        // add user
        let res = await userAdd(user)
        setUser(defaultUser);
        navigate('/');
      }
    } catch (error: any) {
      setAlert(error)
      console.error(error)
    }
  }

  /** calls fetchUser on mount, if a user id is passed on render */
  useEffect(() => {
    try {
      if (userId) {
        fetchUser(userId);
      }
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  return (
    <>
      <form className='Form-input' onSubmit={submitUser}>
        <label htmlFor='first-name-input'>First Name</label>
        <input onChange={handleChange}
          name="firstName"
          id="first-name-input"
          className='Form-first-name'
          placeholder='First Name:'
          value={user.firstName}>
        </input>
        <label htmlFor='last-name-input'>Last Name</label>
        <input onChange={handleChange}
          name="lastName"
          id="last-name-input"
          className='Form-last-name'
          placeholder='Last Name:'
          value={user.lastName}>
        </input>
        <label htmlFor='image-input'>Image URL</label>
        <input onChange={handleChange}
          name="image"
          className='Form-imgUrl'
          placeholder='Image URL:'>
        </input>

        <Button type='submit'>{!user.id ? 'Add User' : 'Update User'}</Button>
        {user.id !== 0
          ? <Button type='submit' onClick={() => navigate(`/users/${user.id}/`)}>Cancel</Button>
          : <Button type='submit' onClick={() => navigate('/')}>Cancel</Button>
        }

        {
          alert.error && 
          <AlertPopUp variant={'danger'} message={[alert.error]}/>
        }

      </form>
    </>
  )
}

export default UserForm;