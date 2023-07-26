//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

// components/ modules
import { IPost } from './interface';
import { postGet } from './api'
import Post from "./Post";
import PopOut from "./PopOut";
import { PostContextType, PostContext } from "./userContext";

//styles
import './style/Posts.css';
import { ProjectContextType } from "./userContext";

type PostsProps = {
  posts: IPost[];
  isPostsShowing: () => void;
}
/** Renders list of posts by title
 * 
 * Props:
 * - userId: number
 * 
 * State:
 * - posts: [
 * {
 * id: number;
 * title='',
 * content='',  
 * title: '', 
  firstName: '';
  lastName: '';
  user_id: number;
  created_at: '';
  imageUrl: '' | null;}
  ,{},{}]
 * 
 *  Projects - Posts
 */
function Posts({ posts, isPostsShowing }: PostsProps) {
  const [isPostRendering, setIsPostRendering] = useState<boolean>(false)
  const [post, setPost] = useState<IPost>()


  const PostData: PostContextType = {
    fetchEditPost: undefined,
    setIsPostRendering,
  }

  /** fetches Project post onClick */
  async function fetchPost(postId: number) {
    const res = await postGet(postId);
    setPost(res);
  }

  /** Sets boolean state if a post should be rendering */
  function handlePostRender() {
    setIsPostRendering(true);
  }

  useEffect(() => {
    // Update child state when parent state changes
    setIsPostRendering(false);
    setPost(undefined)
  }, [isPostsShowing]);

  return (
    <>
      <div className="Post">
        
          <Row className="justify-content-center">
            <Col className="col-4">
              <Card className="custom-card" key={'Warning'} style={{ width: '400px' }}>
                <div className="Posts-posts-container">
                <ListGroup className="align-items-start">
                  <PopOut getProject={()=>{}} action={'new post'} postId={undefined} fetchEditPost={fetchPost} />
                  {
                    posts.map(p =>
                      <ListGroup.Item key={p.id} className="Posts-post" onClick={() => {
                        fetchPost(p.id);
                        handlePostRender();
                      }
                    }>
                        <span className={`${p.id === (post && post.id) ? 'title-selected' : ''}`}>{p.title}
                          </span>
                        {p.id === (post && post.id)
                        && 
                        <FontAwesomeIcon className={`${p.id === (post && post.id) ? 'Posts-post-icon-right-selected' : 'Posts-post-icon-right'}`} icon={faAnglesRight} />
                      }
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </div>

              </Card>
            </Col>
            <Col>
            <PostContext.Provider value={PostData}>
              {isPostRendering && post && <Post initialPost={post} handlePostRender={setIsPostRendering} fetchEditPost={fetchPost}/>}
            </PostContext.Provider>
            </Col>
          </Row>
        
      </div>
    </>
  )
}

export default Posts;
