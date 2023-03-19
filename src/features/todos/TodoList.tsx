import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

import { useGetTodosQuery } from '../api/apiSlice'

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

  const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery()

  // prettier-ignore
  const content = isLoading ? <p>Loading ...</p>
    : isSuccess ? JSON.stringify(todos)
    : isError ? <p>{error.toString()}</p>
    : null

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  )
}

export default TodoList
