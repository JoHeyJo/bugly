//dependencies
import React, { useState, useEffect, useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";


// components/ modules
import { IProject, IPost, IInfoData } from './interface';
import { projectsGet, projectPostsGet, infoGet } from './api';
import Posts from "./Posts";
import { ProjectContextType, ProjectContext, UserContext } from "./userContext";
import AlertModal from "./AlertModal";
import PopOut from "./PopOut";
import DetailsSlideOver from "./DetailsSlideOver";


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
  const [openPosts, setOpenPosts] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([])
  const [projectData, setProjectData] = useState<ProjectData>({ name: '', id: 0 });
  const [projectInfo, setProjectInfo] = useState<IInfoData>({ details: [], tech: [] })
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);

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
    const projectData = await projectsGet(userId);
    // const projectInfo = await infoGet(projectData.id);
    console.log('in here')
    setProjects(projectData);
    // setProjectInfo(projectInfo);
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
    setPosts(res)
  }

  async function fetchPosts(userIdFromProject: number | undefined, projectId?: number) {
    const res = await projectPostsGet(userIdFromProject, projectId)
    setPosts(res)
  }

  /** controls when slideover opens/closes */
  async function isOpen(id?: number, projectId?: number) {
    if (!openPosts) {
      // if closed, openPosts slideover
      try {
        await fetchPosts(id, projectId)
        setIsLoading(false);
        setOpenPosts(true)
      } catch (error) {
        if (isLoading) return <p>Loading...</p>;
      }
    } else if (projectId !== projectData.id) {
      // if opening a different project, close current and openPosts new project
      try {
        setOpenPosts(false);

        setTimeout(async () => {
          await fetchPosts(id, projectId);
          setOpenPosts(true)
        }, 500)
      } catch (error) {
        if (isLoading) return <p>Loading...</p>;
      }
    } else {
      setOpenPosts(false)
    }
  }
  function handleOpenDetails() {
    setOpenDetails(!openDetails)
  }

  return (
    <div className="Projects">
      <h3 className="Projects-title">
        Projects
        <PopOut getProject={getProject} action={'new project'} postId={undefined} fetchEditPost={undefined} />
      </h3>

      <Row>
        <Col xs={6} className="mx-2">
          <ListGroup>
            {
              projects.map(project =>
                <ListGroup.Item key={project.id} className={projectData.id === project.id ? "Projects-project selected" : "Projects-project "}
                  onClick={async (e) => {
                    handleOpenDetails()
                    setProjectInfo(await infoGet(project.id))
                    setProjectData(p => ({
                      ...p, name: project.name, id: project.id
                    }
                    ))
                    isOpen(project.user_id, project.id)
                  }}>
                  <div className="Projects-project-title"
                    style={{ all: 'unset' }}
                  >
                    {project.name}{' - '}{project.description}
                  </div>
                  <AlertModal projectData={projectData} projectGet={getProject} isOpen={setOpenPosts} />
                  <button>
                    <FontAwesomeIcon icon={faAsterisk} />
                  </button>
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </Col>
        <Col><DetailsSlideOver open={openDetails} details={projectInfo} /></Col>
      </Row>
      <Row className="Projects-posts-post m-0">
        <div className="Project-collapse-background">
          <Col>
            <h3 className='Projects-post-title' style={{ width: '400px', textAlign: 'center' }}>Posts</h3>
            <Collapse in={openPosts} dimension="width">
              <Col>
                <div className="Project-User-posts">
                  <ProjectContext.Provider value={ProjectData}>
                    <Posts isPostsShowing={openPosts} posts={posts || []} />
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

