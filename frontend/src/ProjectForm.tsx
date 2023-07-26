//dependencies
import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
//components
import { projectAdd, projectUpdate, projectEdit, projectsGet } from './api';
import { IAlert, IProject } from './interface';
import AlertBubble from './AlertBubble';
import { UserContext, ProjectContext } from './userContext';
// style
import AlertPopUp from './AlertPopUp';

const defaultProject: IProject = { id: undefined, name: undefined, description: undefined, user_id: undefined };
const defaultAlert: IAlert = { error: null };

type ProjectFormProp = {
  handleClose: () => void;
  getProject: () => void;
}
/** Handles user information and renders form for new/edit project
 * 
 * Props:
 * 
 * State:
 * - user {id:number, name:string, description:string, userId:number}
 * 
 * App -> Form
 */
function ProjectForm({ getProject, handleClose }: ProjectFormProp) {
  const [project, setProject] = useState<IProject>(defaultProject);
  const [alert, setAlert] = useState<IAlert>(defaultAlert)
  const navigate = useNavigate();

  const params = useParams();
  const userId = +params.user_id!;
  const projectId = undefined;

  const { user } = useContext(UserContext);
  const { setProjects } = useContext(ProjectContext);


  /** Handles changes to form state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProject(data => ({
      ...data,
      [name]: value,
    }))
  }

  /** Fetches existing Project*/
  async function fetchProject(id: number | undefined) {
    try {
      let res = await projectEdit(id)
      setProject(project);
    } catch (error: any) {
      console.error(`Error: fetchProject => ${error}`)
    }
  }

  /** send user data to api */
  async function submitProject(e: any) {
    e.preventDefault();
    try {
      if (projectId) {
        // update project
        let res = await projectUpdate(user?.id, project)
        setProject(defaultProject)
        navigate('/')
      } else {
        // add project
        const res = await projectAdd(user?.id, project)
        setProject(defaultProject);
        const projects = await projectsGet(user?.id);
        setProjects(projects);
        getProject();
        handleClose()
      }
    } catch (error: any) {
      setAlert(error)
      console.error(error)
    }
  }

  /** for editing a project. Calls fetchProject on mount, if a user id is passed on render */
  useEffect(() => {
    try {
      if (userId) {
        // fetchProject(userId);
      }
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  return (
    <>
      <Form className='Form-input' onSubmit={submitProject}>
        <Form.Group>
          <Form.Label htmlFor='name-input'>Project Name</Form.Label>
          <Form.Control onChange={handleChange}
            name="name"
            id="name-input"
            className='Form-name'
            placeholder='Project Name:'
            value={project.name}>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='description-input'>Description</Form.Label>
          <Form.Control onChange={handleChange}
            name="description"
            id="description-input"
            className='Form-description'
            placeholder='Description:'
            value={project.description}>
          </Form.Control>

        </Form.Group>

        {user?.email === 'j@test.com'
          ? <Button type='submit'>{!project.id ? 'Add Project' : 'Update Project'}</Button>
          : <AlertBubble action={!project.id ? 'addProject' : 'updateProject'} />
        }
        {
          alert.error &&
          <AlertPopUp variant={'danger'} message={[alert.error]} />
        }

      </Form>
    </>
  )
}

export default ProjectForm;