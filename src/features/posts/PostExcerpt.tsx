import React from 'react'
import { Post } from './postsSlice'
import PostAuthor from './PostAuthor'

import { Link } from 'react-router-dom'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

import { useAppSelector } from '../../app/utils'
import { selectPostById } from './postsSlice'
import type { EntityId } from '@reduxjs/toolkit'

const PostExcerpt = (props: { postId: EntityId }) => {
  const post = useAppSelector((state) => selectPostById(state, props.postId))
  
  if (!post) return <></>

  const { title, content, id, userId, date } = post
  return (
    <article>
      <h3>{title}</h3>
      <p>{content.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${id}`}>View Post</Link>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default React.memo(PostExcerpt)
