import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Tag } from '@/features/cms/tags/tags.types'
import type { RootState } from '@/app/store/store'

const initialState: Tag[] = []

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    tagAdded: (state, action: PayloadAction<Tag>) => {
      state.push(action.payload)
    },
    tagUpdated: (state, action) => {
      const tag = state.find((tag) => tag.id === action.payload.id)
      if (tag) {
        tag.name = action.payload.name
      }
    },
    tagDeleted: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tag) => tag.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const { tagAdded, tagUpdated, tagDeleted } = tagsSlice.actions
export const tagsReducer = tagsSlice.reducer

export const selectAllTags = (state: RootState) => state.tags

export const selectTagById = (state: RootState, tagId: string) => {
  return state.tags.find((tag) => tag.id === tagId)
}
