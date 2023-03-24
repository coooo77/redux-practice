import type { Post, Reactions } from './postsSlice'

import { useAddReactionMutation } from './postsSlice'

const reactionEmoji: Record<keyof Reactions, string> = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
}

const ReactionButtons = ({ post }: { post: Post }) => {
  const [addReaction] = useAddReactionMutation()

  const handleAddReaction = async (post: Post, name: keyof Reactions) => {
    const newValue = post.reactions ? post.reactions[name] + 1 : 1
    await addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } as Post['reactions'] })
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const emojiName = name as keyof Reactions
    return (
      <button key={name} type="button" className="reactionButton" onClick={() => handleAddReaction(post, emojiName)}>
        {emoji} {post.reactions?.[emojiName]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
export default ReactionButtons
