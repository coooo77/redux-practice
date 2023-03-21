import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, type Todo } from '../api/apiSlice'

import type { FormEvent } from 'react'

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTodo({ userId: 1, title: newTodo, completed: false })
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

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery()

  const getHtmlTodo = (todo: Todo) => (
    <article key={todo.id}>
      <div className="todo">
        <input type="checkbox" checked={todo.completed} id={String(todo.id)} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
        <label htmlFor={String(todo.id)}>{todo.title}</label>
      </div>
      <button className="trash" onClick={() => deleteTodo(todo.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  )

  // prettier-ignore
  const content = isLoading ? <p>Loading ...</p>
    : isSuccess ? todos.map(getHtmlTodo)
    : isError ? <p>Fail to fetch todos</p>
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
