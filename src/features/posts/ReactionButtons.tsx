import { useAppDispatch } from "../../app/utils";
import {reactionAdded} from './postsSlice'
import type { Post, Reactions } from './postsSlice'

const reactionEmoji: Record<keyof Reactions, string> = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
}

const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const emojiName = name as keyof Reactions
    return (
      <button key={name} type="button" className="reactionButton" onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: emojiName }))}>
        {emoji} {post.reactions[emojiName]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
export default ReactionButtons