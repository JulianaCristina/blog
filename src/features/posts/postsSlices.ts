import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type NewPost, type Post, PostStatus, type PostUpdated } from './posts.types'
import type { RootState } from '@/app/store/store'

const initialState: Post[] = [
  {
    id: '',
    authorId: '',
    content: '',
    title: '',
    commentCount: 0,
    slug: '',
    deletedAt: 0,
    tags: [],
    status: PostStatus.draft,
    likeCount: 0,
  },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<NewPost>) => {
      state.push(action.payload)
    },
    postUpdated: (state, action: PayloadAction<PostUpdated>) => {
      const post = state.find((post) => post.id === action.payload.id)
      if (post) {
        post.title = action.payload.title
        post.content = action.payload.content
        post.tags = action.payload.tags
        post.slug = action.payload.slug
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export const postsReducer = postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) => {
  state.posts.find((post) => post.id === postId)
}

export const selectPostByTag = (state: RootState, tags: string[]) => {
  state.posts.filter((post) => tags.every((t) => post.tags.includes(t)))
}
