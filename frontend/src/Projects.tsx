//dependencies
import React, { useState, useEffect, useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import decode from "jwt-decode";

// components/ modules
import { IProject, IPost } from './interface';
import { projectsGet, projectPostsGet } from './api';
import Posts from "./Posts";
import { ProjectContextType, ProjectContext, UserContext } from "./userContext";
import AlertModal from "./AlertModal";
import PopOut from "./PopOut";

//styles
import './style/Projects.css';

type ProjectProps = {
  userId?: number;
}

type ProjectData = {
  name?: string;
  id?: number;
}
/** Renders list of projects by name
 * 
 * Props:
 * - projectId: number
 * 
 * State:
 * - projects: [
 * {
 * id: number;
 * name: string;
 * description: string;
 * userId: number;
  ,{},{}]π
 * 
 * User - Projects
 */
function Projects({ userId }: ProjectProps) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([])
  const [projectData, setProjectData] = useState<ProjectData>({ name: '', id: 0 });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPostsShowing, setIsPostsShowing] = useState<boolean | undefined | number>(false);

  const { user } = useContext(UserContext);

  const ProjectData: ProjectContextType = {
    projectId: projectData.id,
    projectName: projectData.name,
    fetchProjectPosts,
    setProjects,
    getProject,
  }

  /**gets projects */
  async function getProject() {
    const res = await projectsGet(userId);
    console.log('project get in Projects')
    setProjects(res);
  }

  /** On mount fetches users' projects */
  useEffect(() => {
    async function fetchProjects() {
      const res = await projectsGet(userId)
      setProjects(res)
    }
    fetchProjects();
  }, [])

  /** retrieves project's posts */
  async function fetchProjectPosts() {
    const res = await projectPostsGet(userId, projectData.id)
    console.log('fetching project posts>>>>>>>>', res)
    setPosts(res)
  }

  async function fetchPosts(userIdFromProject: number | undefined, projectId?: number) {
    const res = await projectPostsGet(userIdFromProject, projectId)
    setPosts(res)
  }

  /** controls when slideover opens/closes */
  async function isOpen(id?: number, projectId?: number) {
    if (!open) {
      // if closed, open slideover
      await fetchPosts(id, projectId)
      setOpen(true)
    } else if (projectId !== projectData.id) {
      // if opening a different project, close current and open new project
      setOpen(false);
      setTimeout(async () => {
        await fetchPosts(id, projectId);
        setOpen(true)
      }, 500)

    } else {
      setOpen(false)
    }
  }

  const handleParentStateChange = () => {
    setIsPostsShowing(!isPostsShowing);
  };

  return (
    <div className="Projects">
      <h3 className="Projects-title">
        Projects
        <PopOut getProject={getProject} action={'new project'} postId={undefined} fetchEditPost={undefined} />
      </h3>

      <Row className="Projects-container">
        <Col className="col-6 mx-2">
          <ListGroup className="">
            {
              projects.map(project =>
                <ListGroup.Item key={project.id} className={projectData.id === project.id ? "Projects-project selected" : "Projects-project "} onClick={(e) => {
                  setProjectData(p => ({
                    ...p, name: project.name, id: project.id
                  }
                  ))
                }}>
                  <div className="Projects-project-title"
                    style={{ all: 'unset' }} onClick={async (e) => {
                      console.log('projectd', project.user_id)
                      await isOpen(project.user_id, project.id)
                    }}
                  >
                    {project.name}
                    {' - '}
                    {project.description}
                  </div>
                  <AlertModal projectData={projectData} projectGet={getProject} isOpen={setOpen} />
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </Col>
      </Row>
      <Row className="Projects-posts-post m-0">
        <div className="Project-collapse-background">
          <Col>
            <h3 className='Projects-post-title' style={{ width: '400px', textAlign: 'center' }}>Posts</h3>
            <Collapse in={open} dimension="width">
              <Col>
                <div className="Project-User-posts">
                  <ProjectContext.Provider value={ProjectData}>
                    <Posts isPostsShowing={handleParentStateChange} posts={posts || []} />
                  </ProjectContext.Provider>
                </div>
              </Col>
            </Collapse>

          </Col>
        </div>
      </Row>

    </div>
  )
}

export default Projects;

