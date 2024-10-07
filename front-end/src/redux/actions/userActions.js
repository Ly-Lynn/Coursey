import * as types from '../types/types';

export const saveUserData = (data) => {
    return {
        type: types.SAVE_USER_DATA,
        payload: data,
    }
}
