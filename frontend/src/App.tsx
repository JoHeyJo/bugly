//dependencies
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// components/modules
import { IUser } from './interface'
import { BuglyApi, signup, login, userGet } from './api';
import { UserContextType, UserContext } from './userContext';
import decode from "jwt-decode";
import RoutesList from './RoutesList';
import Navigation from './Navigation';
// style
import './style/App.css';


/** Blogly application 
 * 
 * currentUser: user obj from API. This is how you can tell if a user is logged
 * in. user obj passed around via context throughout app.
 * infoLoaded: has user data been fetched from API?
 * 
 * token: for logged users, this is their authentication JWT. This is initially 
 * read from localStorage and synced there via useLocalStorage hook.
 * 
 * App -> RoutesList
 */
function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  //this allows app to retrieve token on render. However, at first render it'll trigger error handling for getUser
  const [token, setToken] = useState<string | null>(localStorage.getItem("blogly-token"));
  const [isLoading, setIsLoading] = useState(true);

  const UserData: UserContextType = {
    user: currentUser,
    token: token
  }

  async function signUp(formData: IUser) {
    try {
      const token = await signup(formData);
      BuglyApi.token = token;
      setToken(token);
    } catch (error: any) {
      console.error('App signUp error:', error)
    }
  }

  async function loginUser(formData: IUser) {
    // try {
      const token = await login(formData);
      BuglyApi.token = token;
      setToken(token);
    // } catch (error: any) {
    //   console.error('App userLogin error:', error)
    // }
  }

  async function logout() {
    setCurrentUser(null);
    setToken(null);
    BuglyApi.token = null;
    localStorage.clear();
  }

  /** On mount and token state change, make request to API for user details 
   * from token payload.
   * -updates currentUser and sets token in localStorage. 
   */

  useEffect(() => {
    async function getUser() {
      const email: string | null = token && (decode(token) as { sub: string }).sub;

      try {
        const res = await userGet(email)
        setCurrentUser({ ...res });
        token && localStorage.setItem("blogly-token", token)
        setIsLoading(false)
      } catch (error: any) {
        console.error('APP getUser error:', error)
        setIsLoading(false)
      }
    }
    if (token) {
      BuglyApi.token = token;
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [token])


  if (isLoading) return <p>Loading...</p>;

  return (
    <Container className="User-container">

      <UserContext.Provider value={UserData}>
        <div className="App">
          <BrowserRouter>
            <Navigation logout={logout} />
            <RoutesList
              signup={signUp}
              login={loginUser}
              currentUser={currentUser}
            />
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </Container>

  );
}

export default App;
