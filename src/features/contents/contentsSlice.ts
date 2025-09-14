import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ContentItem } from './contentsTypes'

export const fetchContents = createAsyncThunk('contents/fetch', async () => {
  const res = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data');
  console.log(res.data)
  return res.data
})

type State = {
  items: ContentItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string | null,
}

const initialState: State = { items: [], status: 'idle', error: null }

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ContentItem[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Fetch failed'
      })
  }
})

export const { setItems } = contentsSlice.actions
export default contentsSlice.reducer
