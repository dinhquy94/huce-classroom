import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

 
export const loadMembers = createAction<any>('loadMembers')
export const loadMore = createAction<any>('loadMore')

const membersSlice = createSlice({
  name: 'memberReducer',
  initialState: {
    members: [],
    isLoading: false,
    isError: false,
    addSuccess: true
  },
  reducers: {
    loadMembersStart: state => {
        state.isLoading = true
    },
    addMember(state, action: PayloadAction<{ id: string, text: string }>) {
     state.addSuccess = true;
    },
    setMembers(state, action: PayloadAction<any>) { 
        state.members = action.payload 
    },
    setMoreMembers(state, action: PayloadAction<any>) { 
        state.members = action.payload.concat(state.members);
    },
    reloadMemberList() {
      
    }
  }
})
 

export const getMembers = (state: RootState) => state.MemberReducer

export const { addMember, loadMembersStart, setMembers, setMoreMembers } = membersSlice.actions

export default membersSlice.reducer
