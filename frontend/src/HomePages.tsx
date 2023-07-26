//Dependencies
import React, { useState, useEffect } from "react";
import { postsGetAll } from './api'
//Components & models
import { Link } from 'react-router-dom';
import { IPost } from "./interface";
import "./style/HomePage.css"

/** Homepage for Bugly. Shows 5 most recent posts 
 * 
 * State: 
 * - Posts => [{title: '', content: '', userId: 0, id},{},...]
 * 
 * Users -> Homepage
*/
function HomePage() {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      let res = await postsGetAll();
      res.reverse();
      res = res.slice(0, 6)
      setPosts(res)
    }
    fetchPosts()
  }, [])

  return (
    <div id="Homepage">
      <h1 className="Homepage-title">Bugly Recent Posts</h1>
      {posts.map((post, i) =>
        <section className="Homepage-post" key={i}>
          <Link to={`/posts/${post.id}`}>
            <h2 className="Homepage-post-title">{post.title}</h2>
          </Link>
          <h4>{post.problem}</h4>
          {/* <h4>{<DraftEditorConvertFromRaw rawContent={post.content} />}</h4> */}
          <h6 className="Homepage-footer">By {post.firstName} {post.lastName} {post.createdAt}</h6>
        </section>
      )}

    </div>
  )
}

export default HomePage;