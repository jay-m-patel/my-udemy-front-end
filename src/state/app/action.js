import axios from 'axios'
import { get as _get } from 'lodash'

import { serverURL } from './../serverURL'
import { UPDATEPAIDSTATUS } from './../actionTypes'

// export const uploadPaidStatus = body => async dispatch => {
//     console.log('uploadPaidStatus action body', body)
//     const tokenCookie = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('token'))

//     const token = tokenCookie ? tokenCookie
//     .split('=')[1] : null;

//     console.log(token)

//     const response = await axios.post(`${serverURL}/updatePaidStatus`, body, {
//         headers: { Authorization: `Bearer ${token}` }
//     })
//     console.log(response)

//     dispatch({
//         type: UPDATEPAIDSTATUS,
//         payload: response.data
//     })
// }
