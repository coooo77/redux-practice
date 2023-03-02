import { useState } from 'react'

import { addNewPost, PostStatus } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useAppDispatch, useAppSelector } from '../../app/utils'

const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState<PostStatus>('idle')

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!canSave) return

    try {
      //  Redux Toolkit adds a .unwrap() function to the returned Promise, which will return a new Promise that either has the actual action.payload value from a fulfilled action, or throws an error if it’s the rejected action. This lets us handle success and failure in the component using normal try/catch logic
      dispatch(addNewPost({ title, body: content, userId })).unwrap()
      setTitle('')
      setContent('')
      setUserId('')
    } catch (error) {
      console.error('Failed to save the post', error)
    } finally {
      setAddRequestStatus('idle')
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
