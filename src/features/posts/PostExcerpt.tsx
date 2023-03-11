import React from 'react'
import { Post } from './postsSlice'
import PostAuthor from './PostAuthor'

import { Link } from 'react-router-dom'

const PostExcerpt = (props: { post: Post }) => {
  const { id, content, title, userId } = props.post
  return (
    <article>
      <h3>{title}</h3>
      <p>{content.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${id}`}>View Post</Link>
        <PostAuthor userId={userId} />
      </p>
    </article>
  )
}

export default PostExcerpt
