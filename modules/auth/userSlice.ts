import { RootState } from "@/lib/store"
import { logger } from "@/logger"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type UserStore = {
    user: {
        id: number
        dob: string
        first_name: string
        last_name: string
        email: string
    }
}

const initialState: UserStore = {
} as UserStore

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserInfo(state, action: PayloadAction<{ value: UserStore }>) {
            console.debug({value: action.payload.value})
            state.user = action.payload.value.user
        },
    }
})

export const UserSelector = (state: RootState) => {
    return state.user.user
}
export const { updateUserInfo } = userSlice.actions
export default userSlice.reducer