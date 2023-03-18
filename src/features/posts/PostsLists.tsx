import { useAppSelector } from '../../app/utils'
import { selectPostIds, getPostsStatus, getPostsError } from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsLists = () => {
  const orderedPostIds = useAppSelector(selectPostIds)
  const postsError = useAppSelector(getPostsError)
  const postsStatus = useAppSelector(getPostsStatus)

  let content = null
  switch (postsStatus) {
    case 'loading':
      content = <p>"Loading ..."</p>
      break
    case 'succeeded':
      content = orderedPostIds.map((postId, index) => <PostExcerpt key={`${index}_${postId}`} postId={postId} />)
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
