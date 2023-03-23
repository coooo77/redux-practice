import { useAppSelector } from '../../app/utils'
import { selectPostIds, useGetPostsQuery } from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsLists = () => {
  const orderedPostIds = useAppSelector(selectPostIds)
  
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery()
  const content = isLoading ? (
    <p>"Loading ..."</p>
  ) : isSuccess ? (
    orderedPostIds.map((postId, index) => <PostExcerpt key={`${index}_${postId}`} postId={postId} />)
  ) : isError ? (
    <p>{error.toString()}</p>
  ) : null

  return <section>{content}</section>
}

export default PostsLists
