import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type NewPost, type Post, PostStatus, type PostUpdated } from './posts.types'
import type { RootState } from '@/app/store/store'

const initialState: Post[] = []

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
        post.authorId = action.payload.authorId
        post.content = action.payload.content
        post.tags = action.payload.tags
        post.slug = action.payload.slug
        post.status = action.payload.status
        post.updatedAt = Date.now()
      }
    },
    postDeleted: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((post) => post.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    postPublished: (state, action: PayloadAction<{ id: string }>) => {
      const post = state.find((post) => post.id === action.payload.id)
      if (post) {
        if (post.status === PostStatus.published) {
          post.status = PostStatus.draft
        } else {
          post.status = PostStatus.published
        }
      }
    },
  },
})

export const { postAdded, postUpdated, postDeleted, postPublished } = postsSlice.actions

export const postsReducer = postsSlice.reducer

export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) => {
  return state.posts.find((post) => post.id === postId)
}

export const selectPostByTag = (state: RootState, tags: string[]) => {
  return state.posts.filter((post) => tags.every((t) => post.tags.includes(t)))
}
