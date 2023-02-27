import { useState } from 'react'

import { postAdded } from './postsSlice'
import { useAppDispatch } from '../../app/utils'

const AddPostForm = () => {
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSavePostClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (!(title || content)) return

    dispatch(postAdded(title, content))

    setTitle('')
    setContent('')
  }
  return (
    <section>
      <h2>Add a new Post</h2>

      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={(e) => setContent(e.target.value)} />

        <button onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm
