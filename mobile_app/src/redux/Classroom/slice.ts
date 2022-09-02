import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const LoadAuthorInfo = createAction('LoadAuthorInfo')

export const loadFeeds = createAction<any>('loadFeeds')
export const loadHomeworks = createAction<any>('loadHomeworks')
export const getFeedDetail = createAction<any>('getFeedDetail')
export const loadMoreFeed = createAction<any>('loadMoreFeed')

const classroomSlice = createSlice({
  name: 'classroomReducer',
  initialState: {
    feeds: [],
    homeworks: [],
    isLoading: false,
    isHomeworkLoading: false,
    isError: false,
    addSuccess: true,
    reload: false,
    feedDetail: {
      title: "",
      content: "",
      userId: {},
      comments: [],
      createdAt: "",
      attatchments: []
    },
    userInfo: {
      role: "user",
      isEmailVerified: false,
      email: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      address: "",
      avatar: null,
      id: null
    }
  },
  reducers: { 
    setFeeds(state, action: PayloadAction<any>) { 
        state.feeds = action.payload 
    },
    setHomeworks(state, action: PayloadAction<any>) { 
        state.homeworks = action.payload 
    },
    setCurrentInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setMoreFeed(state, action: PayloadAction<any>) { 
      state.feeds = action.payload.concat(state.feeds);
    },
    setFeedsLoading(state) { 
      state.isLoading = true;
    },
    setHomeworkLoading(state) { 
      state.isHomeworkLoading = true;
    },
    setHomeworkLoadingDone(state) { 
      state.isHomeworkLoading = false;
    },
    reloadFeed(state) { 
      state.reload = true;
    },
    setFeedsLoadingDone(state) { 
      state.isLoading = false;
    },
    setCurrentFeedToDefault(state) {
      state.feedDetail = {
        title: "",
        content: "",
        userId: {},
        comments: [],
        createdAt: "",
        attatchments: []
      }
    },
    setCurrentFeedDetail(state, action: PayloadAction<any>) { 
      state.feedDetail = action.payload;
    },
  }
})
 

export const getFeeds = (state: RootState) => state.classroomReducer

export const { 
  setFeeds,
  setMoreFeed,
  setFeedsLoading,
  setFeedsLoadingDone,
  reloadFeed,
  setCurrentFeedDetail,
  setCurrentFeedToDefault,
  setCurrentInfo,
  setHomeworkLoadingDone,
  setHomeworkLoading,
  setHomeworks
} = classroomSlice.actions

export default classroomSlice.reducer
