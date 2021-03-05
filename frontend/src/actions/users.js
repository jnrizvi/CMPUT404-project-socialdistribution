import axios from 'axios';
import { POST_REGISTER, POST_LOGIN } from './types';
import { returnErrors } from './messages';

// Register a new user
export const postRegister = (user) => dispatch => {
    axios.post('/api/auth/register', user)
        .then(res => {
            dispatch({
                type: POST_REGISTER,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const postLogin = (user) => dispatch => {
    axios.post('/api/auth/login', user)
        .then(res => {
            dispatch({
                type: POST_LOGIN,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}