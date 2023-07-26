import axios from 'axios';
import { IUser, IPost, IProject } from './interface'


type ApiResponse = {
  data: {
    token: string;
  };
  status: number;
  statusText: string;
  headers: object;
  config: object;
}

const BASE_URL = "http://127.0.0.1:5000";

// try {
//   return (await axios({ url, method, data, params, headers })).data;
// } catch (err) {
//   console.error("API Error:", err.response);
//   let message = err.response.data.error.message;
//   throw Array.isArray(message) ? message : [message];
// }


export class BuglyApi {

  static token: string | null = null;
}


console.log('api token ===', BuglyApi.token)
/**Sign up user */
async function signup(userData: IUser) {
  try {
    const res: ApiResponse = await axios.post(`${BASE_URL}/signup`, userData);
    return res.data.token;
  } catch (error: any) {
    console.error("Signup Error:", error);
    throw error;
  }
}

/**Login user */
async function login(userData: IUser) {
  try {
    const res: ApiResponse = await axios.post(`${BASE_URL}/login`, userData);
    console.log('login res =====', res)
    console.log('signup', res)
    return res.data.token;
  } catch (error: any) {
    console.error("Login Error:", error);
    throw error;
  }
}

/**Returns first and last of all users */
async function usersGet() {
  console.log('TOKEN in api', BuglyApi.token)
  const headers = { Authorization: `Bearer ${BuglyApi.token}` }; // Replace `token` with your actual token value
  try {
    const res = await axios.get(`${BASE_URL}/users`, { headers });
    return res.data;
  } catch (error: any) {
    console.error("API get all users Error:" + error.response);
    throw error;
  }
}

/**Routes new user data to /user */
async function userAdd(data: IUser) {
  try {
    const res = await axios.post(`${BASE_URL}/users/new`, data)
    return res.data
  } catch (error: any) {
    console.error("API add user Error:" + error.response.data);
    throw error.response.data
  }
}

/**returns user with matching ID */
async function userGet(email: number | string | undefined | null) {
  try {
    const res = await axios.get(`${BASE_URL}/users/${email}`)
    return res.data
  } catch (error: any) {
    console.error("API get user Error:" + error.message)
  }
}

/** Get user data to populate edit form */
async function userEdit(id: number | undefined) {
  try {
    const res = await axios.get(`${BASE_URL}/users/${id}/edit`)
    return res.data
  } catch (error: any) {
    console.error("API get user Error:" + error.message)
  }
}

/**Updates user information with matching id */
async function userUpdate(id: number, data: IUser) {
  try {
    const res = await axios.patch(`${BASE_URL}/users/${id}/edit`, data)
    return res.data;
  } catch (error: any) {
    console.error("API update Error:" + error.message)
  }
}

/** deletes user with matching id */
async function userDelete(id: number) {
  const headers = { Authorization: `Bearer ${BuglyApi.token}` }
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}/delete`, { headers })
    return res.data
  } catch (error: any) {
    console.error(`API Delete error: ${error}`)
    throw error.response.data
  }
}
// ************POSTS*******************
/**Gets all user posts */
async function postsGetAll() {
  try {
    const res = await axios.get(`${BASE_URL}/posts`)
    return res.data;
  } catch (error: any) {
    console.error(`API postsGetAll error: ${error}`)
    console.log('API ERROR', error)
  }
}

/**Get user post */
async function postGet(id: number) {
  try {
    const res = await axios.get(`${BASE_URL}/posts/${id}`)
    return res.data;
  } catch (error: any) {
    console.error(`API error postGet: ${error}`)
  }
}

/** Routes new post data */
async function postAdd(postData: IPost) {
  console.log('token in api', BuglyApi.token)
  const headers = { Authorization: `Bearer ${BuglyApi.token}` };
  try {
    const res = await axios.post(`${BASE_URL}/users/${postData.userId}/posts/new`, postData, { headers })
    return res.data;
  } catch (error: any) {
    console.error(`API post form error: ${error}`)
    console.log(error.response)
    throw error.response.data
  }
}

/** Gets data for post edit form */
async function postEdit(postId: number) {
  try {
    const res = await axios.get(`${BASE_URL}/posts/${postId}/edit`)
    return res.data;
  } catch (error: any) {
    console.error(`API postEdit error => ${error}`)
  }
}

/** Updates post with matching id */
async function postUpdate(postId: number, postData: IPost) {
  const headers = { Authorization: `Bearer ${BuglyApi.token}` }
  try {
    const res = await axios.patch(`${BASE_URL}/posts/${postId}/edit`, postData, { headers })
    return res.data;
  } catch (error: any) {
    console.error(`API postUpdate error => ${error}`)
  }
}

/** Deletes post with matching id*/
async function postDelete(postId: number | undefined) {
  const headers = { Authorization: `Bearer ${BuglyApi.token}` }
  try {
    const res = await axios.delete(`${BASE_URL}/posts/${postId}/delete`, { headers })
    return res.data;
  } catch (error: any) {
    console.error(`Error in postDelete => ${error}`)
  }
}

// ************PROJECTS*******************

/** Get project corresponding to project id */
async function projectGet(projectId: number) {
  try {
    const res = await axios.get(`${BASE_URL}/projects/${projectId}`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    console.log(error)
    throw error.response.data
  }
}

/**Get projects corresponding to user id */
async function projectsGetAll() {
  try {
    const res = await axios.get(`${BASE_URL}/projects`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    console.log(error)
    throw error.response.data
  }
}

/**Get projects corresponding to user id */
async function projectsGet(userId: number | undefined) {
  try {
    const res = await axios.get(`${BASE_URL}/users/${userId}/projects`);
    return res.data;
  } catch (error: any) {
    console.log('>>>>>', error)
    console.error('Error in projectsGet', error);
    console.log(error)
    throw error.response.data
  }
}

/** Adds new project data */
async function projectAdd(userId: number | undefined, projectData: IProject) {
  const headers = { Authorization: `Bearer ${BuglyApi.token}` }
  try {
    const res = await axios.post(`${BASE_URL}/users/${userId}/projects/new`, projectData, { headers });
    return res.data;
  } catch (error: any) {
    console.error(`Error in projectAdd => ${error}`)
    console.log(error)
  }
}

/** Gets project data with corresponding id */
async function projectEdit(projectId: number | undefined) {
  try {
    const res = await axios.get(`${BASE_URL}/projects${projectId}`);
    return res.data;
  } catch (error: any) {
    console.error(`Error in projectEdit => ${error}`)
  }
}

/** Updates project with matching id */
async function projectUpdate(projectId: number | undefined, projectData: IProject) {
  try {
    const res = await axios.patch(`${BASE_URL}/projects${projectId}`);
    return res.data;
  } catch (error: any) {
    console.error(`Error in projectUpdate => ${error}`)
  }
}

/** Adds posts to corresponding project */
async function projectPostAdd(userId: number | undefined, projectId: number | undefined, postData: IPost) {
  const headers = { Authorization: `Bearer ${BuglyApi.token}` };
  try {
    const res = await axios.post(`${BASE_URL}/users/${userId}/projects/${projectId}/posts/new`, postData, { headers });
    return res.data;
  } catch (error: any) {
    console.log(error)
    console.error(`Error in projectPostAdd => ${error}`)
    throw error.response.data
  }
}

//** Retrieves posts corresponding to project */
async function projectPostsGet(userId: number | undefined, projectId: number | undefined) {
  try {
    const res = await axios.get(`${BASE_URL}/users/${userId}/projects/${projectId}`);
    return res.data;
  } catch (error: any) {
    console.error(`Error in projectPostsGet => ${error}`)
    throw error.response.data
  }
}

/** Deletes project and all associated posts */
async function projectDelete(projectId?: number) {
  const headers = { Authorization: `Bearer ${BuglyApi.token}` }
  try {
    const res = await axios.delete(`${BASE_URL}/projects/${projectId}/delete`, { headers })
    console.log('post delete', res.data)
    return res.data
  } catch (error: any) {
    console.log(`Error in projecDelete => ${error}`)
    console.error(`Error in projecDelete => ${error}`)
    throw error.response.data
  }
}


export { login, signup, projectDelete, projectPostsGet, projectPostAdd, projectGet, projectsGetAll, userGet, usersGet, userAdd, userUpdate, userDelete, userEdit, postsGetAll, postGet, postAdd, postEdit, postUpdate, postDelete, projectAdd, projectUpdate, projectEdit, projectsGet };

