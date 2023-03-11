import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import { useAppSelector } from '../../app/utils'

import { useParams } from 'react-router-dom'

const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useAppSelector((state) => selectPostById(state, postId || ''))
  return post ? (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p>
    </article>
  ) : (
    <section>
      <h2>Post not found</h2>
    </section>
  )
}

export default SinglePostPage
