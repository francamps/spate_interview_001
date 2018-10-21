import _ from 'lodash';
import * as types from '../actions/user.actiontypes'


const videoReducer = (user = {}, action) => {

    switch (action.type) {
        case types.USER_GET:
            return action.data
        case types.USER_UPDATE:
            return _.merge(user, action.data)
        case types.USER_LOGOUT:
            return {}
        default:
            return user
    }

}

export default videoReducer
