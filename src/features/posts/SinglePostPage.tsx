import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import { useAppSelector } from '../../app/utils'

import { Link, useParams } from 'react-router-dom'
import ReactionButtons from './ReactionButtons'

const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useAppSelector((state) => selectPostById(state, postId || ''))
  return post ? (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ) : (
    <section>
      <h2>Post not found</h2>
    </section>
  )
}

export default SinglePostPage
