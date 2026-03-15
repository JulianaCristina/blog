import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from '@/features/cms/posts/postsSlices'
import { tagsReducer } from '@/features/cms/tags/tagsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
