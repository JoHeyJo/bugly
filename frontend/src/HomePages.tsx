//Dependencies
import React, { useState, useEffect } from "react";
import { postsGetAll } from './api'
//Components & models
import { Link } from 'react-router-dom';
import { IPostWithProject } from "./interface";
import "./style/HomePage.css"
import { errorHandling } from "./utils/errorHandling";
import DraftEditorConvertFromRaw from "./DraftEditorConvertFromRaw";
import LoadingSpinner from "./LoadingSpinner";
import Grid from "./Grid";

/** Homepage for Bugly. Shows 5 most recent posts 
 * 
 * State: 
 * - Posts => [{title: '', content: '', userId: 0, id},{},...]
 * 
 * RouteList -> Homepage
*/
function HomePage() {
  const [posts, setPosts] = useState<IPostWithProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  try {
    useEffect(() => {
      async function fetchPosts() {
        try {
          let res = await postsGetAll();
          res.reverse();
          res = res.slice(0, 6)
          setPosts(res)
          setIsLoading(false);
        } catch (error:any) {
          errorHandling("HomePage: fetchPost -> postsGetAll", error)
          setIsLoading(false);
        }
      }
      fetchPosts()
    }, [])
  } catch (error: any) {
    errorHandling("HomePage: fetchPosts", error)
  }

  if(isLoading) return <LoadingSpinner/>;

  return (
    <div id="Homepage">
      {/* <Grid /> */}
      <h1 className="Homepage-title">Bugly Recent Posts</h1>
      {posts.map((post, i) =>
        <section className="Homepage-post" key={i}>
          <Link to={`/posts/${post.id}`}>
            <h2 className="Homepage-post-title">{post.title}</h2>
          </Link>
          <h4><DraftEditorConvertFromRaw rawContent={post.content} /></h4>
          <h6 className="Homepage-footer">Project: {post.name} - {post.createdAt}</h6>
        </section>
      )}

    </div>
  )
}

export default HomePage;