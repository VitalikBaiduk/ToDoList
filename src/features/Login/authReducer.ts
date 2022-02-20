import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
let slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, actions: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = actions.payload.value
        }
    }

})


export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions
// (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
// actions
// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status:'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

// types
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType