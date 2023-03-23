import { useState } from 'react'

import { useAppSelector } from '../../app/utils'
import { selectPostById } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from '../users/usersSlice'
import { useUpdatePostMutation, useDeletePostMutation } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useAppSelector((state) => selectPostById(state, postId || ''))
  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)
  const [userId, setUserId] = useState(post?.userId)

  const [updatePost, {isLoading}] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const postToUpdate = Object.assign(post, {
          title,
          content,
          userId,
        })

        await updatePost(postToUpdate).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (err) {
        console.error('Failed to save the post', err)
      } 
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const onDeletePostClicked = async () => {
    try {
      await deletePost(post).unwrap()

      setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
    } catch (err) {
      console.error('Failed to delete the post', err)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>

      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={(e) => setContent(e.target.value)} />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>

        <button className="deleteButton" type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
