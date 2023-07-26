//dependencies
import React, { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
//components / modules
import { postDelete, postGet } from './api';
import { ProjectContext } from "./userContext";
import PopOut from "./PopOut";
import DraftEditorConvertFromRaw from "./DraftEditorConvertFromRaw";
import ViewPopOut from "./ViewPopOut";
//styles
import './style/Post.css'


type PostProp = {
  postId: number;
  handlePostRender: () => void;
  fetchEditPost?: (postId: number) => void;
}
/** Renders individual post
 * 
 * State:
 *  - post = {id=0, title='', content='', user_id,...}
 * 
 * User -> [Posts/Homepage] -> Post
 */
function Post({ initialPost, handlePostRender, fetchEditPost }: any) {
  const [post, setPost] = useState(initialPost)
  const { fetchProjectPosts, projectId } = useContext(ProjectContext);
  const postId = +useParams().post_id!;

  if (!post) {
    fetchPost();
  }

  /** retrieves post corresponding to id */
  async function fetchPost() {
    try {
      const res = await postGet(postId);
      setPost(res);
      console.log('res in  fetchPost', res)
      return res;
    } catch (error: any) {
      console.error(`Error in fetchPost => ${error}`)
    }
  }

  const title = post ? post.title : null;
  const problem = post ? <DraftEditorConvertFromRaw rawContent={post.problem} /> : null;
  const solution = post ? <DraftEditorConvertFromRaw rawContent={post.solution} /> : null;
  const content = post ? <DraftEditorConvertFromRaw rawContent={post.content} /> : null;

  const convertedPost = { 'title': title, 'problem': problem, 'solution': solution, 'content': content };

  useEffect(
    ()=>{
      setPost(initialPost)
    },[initialPost])

    return (
    <div className="Post-post">
      <Stack gap={3}>
        <h2 className="Post-title">{title}</h2>
        <span className="d-flex justify-content-end">
          <PopOut getProject={()=>{}}  action={'edit'} postId={post?.id || postId} fetchEditPost={fetchEditPost} />
          {/* { initialPost && <ViewPopOut post={convertedPost} />} */}
          <ViewPopOut post={convertedPost} />
        </span>
        <Stack direction="vertical" className="" >
          <h6 className="Post-subtitle">Context:</h6>
          <h5 className="Post-content ms-2">{content}</h5>
        </Stack>
        <Stack direction="vertical" className="" id="problem-stack">
          <h6 className="Post-subtitle">Problem:</h6>
          <div className="Post-problem ms-2">{problem}</div>
        </Stack>
        <Stack direction="vertical" className="">
          <h6 className="Post-subtitle">Solution:</h6>
          <div className="Post-solution container ms-2">{solution}</div>
        </Stack>
        {/* <h6 className="Post-author">By: {post.firstName} {post.lastName}</h6> */}
      </Stack>
    </div>
  )
}

export default Post;