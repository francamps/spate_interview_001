import * as UserAPI from '../../../utils/api/userAPI'
import * as types from './user.actionTypes'

export { types }

export const receiveUserData = (data) => {
    return {
        type: types.USER_GET,
        data
    }
}

export const receiveUpdatedUser = (data) => {
    return {
        type: types.USER_UPDATE,
        data
    }
}

export const getUserData = () => {
    return async (dispatch) => {
        try {
            const data = await UserAPI.getUserData();
            dispatch(receiveUserData(data))
        } catch (err) {
            console.log('getUserData.err: ', err)
        }
    }
}

export const updateUser = (data) => {
    return async (dispatch) => {
        try {
            // NOTE: Normally I would be calling an API here, but for demo
            // purposes I will just work from store once it has been created
            dispatch(receiveUpdatedUser(data))
        } catch (err) {
            console.log('updateUser.err: ', err)
        }
    }
}
