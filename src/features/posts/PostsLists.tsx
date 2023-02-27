import { useAppDispatch, useAppSelector } from '../../app/utils'
import { selectAllPosts } from './postsSlice'

const PostsLists = () => {
  const posts = useAppSelector(selectAllPosts)

  const renderedPosts = posts.map(({ id, content, title }) => (
    <article key={id}>
      <h3>{title}</h3>
      <p>{content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsLists
