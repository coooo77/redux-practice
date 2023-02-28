import React from 'react'
import { Post } from './postsSlice'
import PostAuthor from './PostAuthor'

const PostExcerpt = (props: { post: Post }) => {
  const { id, content, title, userId } = props.post
  return (
    <article>
      <h3>{title}</h3>
      <p>{content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={userId} />
      </p>
    </article>
  )
}

export default PostExcerpt
