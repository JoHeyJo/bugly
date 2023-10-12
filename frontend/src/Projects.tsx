//dependencies
import React, { useState, useEffect, useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'


// components/ modules
import { IProject, IPost, IDetailData } from './interface';
import { projectsGet, projectPostsGet, infoGet } from './api';
import Posts from "./Posts";
import { ProjectContextType, ProjectContext, UserContext } from "./userContext";
import AlertModal from "./AlertModal";
import PopOut from "./PopOut";
import DetailsSlideOver from "./DetailsSlideOver";
import TechList from "./TechList";

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
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([])
  const [projectData, setProjectData] = useState<ProjectData>({ name: '', id: 0 });
  const [projectInfo, setProjectInfo] = useState<IDetailData>({ details: [], tech: [] })
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { user } = useContext(UserContext);

  const ProjectData: ProjectContextType = {
    projectId: projectData.id,
    projectName: projectData.name,
    fetchProjectPosts,
    setProjects,
    getProject,
    infoGet: () => infoGet(projectData.id),
    updateTechList
  }

  /**gets projects */
  async function getProject() {
    const projectData = await projectsGet(userId);
    // const projectInfo = await infoGet(projectData.id);
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

  /**Fetch project info after tech has been added to techList */
  async function updateTechList(projectId: number | undefined){
    const infoData = await infoGet(projectId);
    setProjectInfo(infoData)
  }

  /** controls when slideover opens/closes */
  async function handleOpenPosts(id?: number, projectId?: number) {
    // if closed, isPostsOpen slideover
    if (!isPostsOpen) {
      try {
        await fetchPosts(id, projectId)
        setIsLoading(false);
        setIsPostsOpen(true)
      } catch (error) {
        if (isLoading) return <p>Loading...</p>;
      }
      // if opening a different project, close current and isPostsOpen new project
    } else if (projectId !== projectData.id) {
      try {
        setIsPostsOpen(false);
        setIsDetailsOpen(false);

        setTimeout(async () => {
          await fetchPosts(id, projectId);
          const infoData = await infoGet(projectId)
          setProjectInfo(infoData)
          setIsPostsOpen(true)
        }, 500)
      } catch (error) {
        if (isLoading) return <p>Loading...</p>;
      }
    } else {
      setIsPostsOpen(false);
      setIsDetailsOpen(false);
    }
  }
  function handleOpenDetails() {
    setIsDetailsOpen(!isDetailsOpen)
  }

  /** Controls when slideover for project info opens/closes */
  async function handleOpenInfo(e: any, id: number | undefined, projectId: number | undefined) {
    e.stopPropagation()
    if (!isDetailsOpen) {
      const info = await infoGet(projectId)
      setProjectInfo(info)
      handleOpenDetails()
    } else {
      handleOpenDetails()
    }
  }
  return (
    <div className="Projects">
      <h3 className="Projects-title">
        Projects
        <PopOut id={projectData.id} getProject={getProject} action={'new project'} postId={undefined} fetchEditPost={undefined} />
      </h3>

      <Row className="Projects-projects-details-container">
        <Col xs={6} className="mx-2 my-1">
          <ListGroup className="Projects-ListGroup">
            {
              projects.map(project =>
                <ListGroup.Item key={project.id} className={projectData.id === project.id ? "Projects-project selected d-flex justify-content-start" : "Projects-project d-flex justify-content-start"}
                  onClick={async (e) => {
                    setProjectData(p => ({
                      ...p, name: project.name, id: project.id
                    }))
                    handleOpenPosts(project.user_id, project.id)
                  }}>
                  <div className="Projects-project-title" style={{ all: 'unset' }}>
                    {project.name}{' - '}{project.description}
                  </div>
                  <AlertModal projectData={projectData} projectGet={getProject} isOpen={setIsPostsOpen} />
                  {projectData.id === project.id &&
                    <span onClick={(e) => handleOpenInfo(e, project.user_id, project.id)} className="projects-asterisk ms-auto">
                      <FontAwesomeIcon icon={faAsterisk} />
                    </span>
                  }
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </Col>
        <Col>
          <ProjectContext.Provider value={ProjectData}>
            <DetailsSlideOver open={isDetailsOpen} details={projectInfo} />
          </ProjectContext.Provider>
        </Col>
      </Row>
      <Row className="Projects-posts-post m-0">
        <div className="Project-collapse-background">
          <Col>
            <h3 className='Projects-post-title' style={{ width: '400px', textAlign: 'center' }}>Posts</h3>
            <Collapse in={isPostsOpen} dimension="width">
              <Col>
                <div className="Project-User-posts">
                  <ProjectContext.Provider value={ProjectData}>
                    <Posts isPostsShowing={isPostsOpen} posts={posts || []} />
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

