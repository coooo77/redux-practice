import { useState } from 'react'

import { useAddNewPostMutation } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useAppSelector } from '../../app/utils'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
  const navigate = useNavigate()
  
  const [addNewPost, {isLoading}] = useAddNewPostMutation()

  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!canSave) return

    try {
      await addNewPost({title, content, userId}).unwrap()
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
