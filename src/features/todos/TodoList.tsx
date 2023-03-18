import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

import type { FormEvent } from 'react'

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    //addTodo
    setNewTodo('')
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input type="text" id="new-todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter new todo" />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  )

  let content
  // Define conditional content

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  )
}

export default TodoList
