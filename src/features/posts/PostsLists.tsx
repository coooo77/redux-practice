import { useAppDispatch, useAppSelector } from '../../app/utils'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import PostExcerpt from './PostExcerpt'
import { useEffect } from 'react'

const PostsLists = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectAllPosts)
  const postsError = useAppSelector(getPostsError)
  const postsStatus = useAppSelector(getPostsStatus)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus])

  let content = null
  switch (postsStatus) {
    case 'loading':
      content = <p>"Loading ..."</p>
      break
    case 'succeeded':
      content = posts.slice().map((post) => <PostExcerpt key={post.id} post={post} />)
      break
    case 'failed':
      content = <p>{postsError}</p>
      break
    default:
      break
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsLists
