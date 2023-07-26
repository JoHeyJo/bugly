//dependencies
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//components / modules
import { projectGet, projectPostsGet } from './api';
import { IProject, IPost } from "./interface";



const defaultProject: IProject = {
  id: undefined, name: '', description: '', user_id: undefined
}
/** Renders project 
 * 
 * State:
 * - project = {}
*/
function Project() {
  const [project, setProject] = useState<IProject>(defaultProject)
  const [posts, setPosts] = useState<IPost[]>([])

  const params = useParams();
  const projectId = +params.project_id!;
  const userId = +params.user_id!;

  /** fetches project on mount*/
  useEffect(() => {
    async function fetchProject() {
      const res = await projectGet(projectId);
      setProject(res);
    };
    async function fetchPosts(){
      const res = await projectPostsGet(userId, projectId)
      setPosts(res)
    }
    fetchProject();
    fetchPosts();
  }, [])

  return (
    <>
      <Container>
        <Stack>
          <h1>{project.name}</h1>
          <h3>{project.description}</h3>
        </Stack>
        <Row className="justify-content-center">
          <Col className="col-6">
            <ListGroup className="align-items-start">
              {
                posts.map(post =>
                  <ListGroup.Item key={post.id} className="Projects-post">
                    {/* <Link to={`/posts/${post.id}`}>{post.title}</Link> */}
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Col>
        </Row>
      </Container></>
  )
}

export default Project;