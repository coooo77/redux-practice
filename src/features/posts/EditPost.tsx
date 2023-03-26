import { useState } from 'react'

import { useAppSelector } from '../../app/utils'
import { selectPostById } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { useGetUsersQuery } from '../users/usersSlice'
import { useUpdatePostMutation, useDeletePostMutation } from './postsSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useAppSelector((state) => selectPostById(state, postId || ''))
  const { data: users, isSuccess } = useGetUsersQuery()

  const [title, setTitle] = useState(post?.title)
  const [body, setBody] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)

  const [updatePost, { isLoading }] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canSave = [title, body, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          ...post,
          title: title || '',
          body: body || '',
          userId: userId || '',
        }).unwrap()

        setTitle('')
        setBody('')
        setUserId('')
        navigate(`/post/${postId}`)
      } catch (err) {
        console.error('Failed to save the post', err)
      }
    }
  }

  const usersOptions = isSuccess
    ? users.ids.map((id) => (
        <option key={id} value={id}>
          {users.entities[id]?.name}
        </option>
      ))
    : null

  const onDeletePostClicked = async () => {
    try {
      await deletePost(post).unwrap()

      setTitle('')
      setBody('')
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
        <textarea id="postContent" name="postContent" value={body} onChange={(e) => setBody(e.target.value)} />

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
