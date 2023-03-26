import { useState } from 'react'

import { useAddNewPostMutation } from './postsSlice'
import { useGetUsersQuery } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
  const navigate = useNavigate()

  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const { data: users, isSuccess } = useGetUsersQuery()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const usersOptions = isSuccess
    ? users.ids.map((id) => (
        <option key={id} value={id}>
          {users.entities[id]?.name}
        </option>
      ))
    : null

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!canSave) return

    try {
      await addNewPost({ title, body: content, userId }).unwrap()
      setTitle('')
      setContent('')
      setUserId('')
      navigate('/')
    } catch (error) {
      console.error('Failed to save the post', error)
    }
  }

  return (
    <section>
      <h2>Add a new Post</h2>

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

        <button disabled={!canSave} onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
