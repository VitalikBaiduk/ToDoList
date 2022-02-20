import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

let slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, actions: PayloadAction<{ error: string | null }>) => {
            state.error = actions.payload.error
        },
        setAppStatusAC: (state, actions: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = actions.payload.status
        },
        setIsInitialized: (state) => {
            state.isInitialized = true
        }
    }
})

export const appReducer = slice.reducer
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppStatusAC = slice.actions.setAppStatusAC
export const setIsInitialized = slice.actions.setIsInitialized


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
    })
        .finally(() => {
            dispatch(setIsInitialized())
        })
}
