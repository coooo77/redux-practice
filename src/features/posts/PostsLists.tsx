import { useAppSelector } from '../../app/utils'
import { selectAllPosts, getPostsStatus, getPostsError } from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsLists = () => {
  const posts = useAppSelector(selectAllPosts)
  const postsError = useAppSelector(getPostsError)
  const postsStatus = useAppSelector(getPostsStatus)

  let content = null
  switch (postsStatus) {
    case 'loading':
      content = <p>"Loading ..."</p>
      break
    case 'succeeded':
      content = posts.slice().map((post, index) => <PostExcerpt key={`${index}_${post.id}`} post={post} />)
      break
    case 'failed':
      content = <p>{postsError}</p>
      break
    default:
      break
  }

  return <section>{content}</section>
}

export default PostsLists
