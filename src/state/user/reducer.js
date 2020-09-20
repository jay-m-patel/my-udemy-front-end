import { REGISTER, LOGIN, LOGOUT, CHECKLOGGEDIN, UPDATEPAIDSTATUS, UPLOAD, SELECTCOURSE } from './../actionTypes'


export default (state = {}, action) => {
    const { type, payload } = action

    switch(type) {
        case REGISTER:
            return {
                ...state,
                user: {
                    allCourses: state.user.allCourses,
                    selectedCourseId: state.user.selectedCourseId, 
                    ...payload
                }
            }
        case LOGIN:
            return {
                ...state,
                user: {
                    allCourses: state.user.allCourses, 
                    selectedCourseId: state.user.selectedCourseId, 
                    ...payload
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: {
                    allCourses: state.user.allCourses,
                    selectedCourseId: state.user.selectedCourseId, 
                    ...payload
                }
            }
        case CHECKLOGGEDIN:
            return {
                ...state,
                user: payload
            }
        case UPDATEPAIDSTATUS:
            return {
                ...state,
                user: {
                    allCourses: state.user.allCourses, 
                    selectedCourseId: state.user.selectedCourseId, 
                    ...payload
                }
            }
        case UPLOAD:
            return {
                ...state,
                user: {
                    selectedCourseId: state.user.selectedCourseId, 
                    ...payload
                },
            }
        case SELECTCOURSE:
            return {
                ...state,
                user: {...state.user, selectedCourseId: payload}
            }
        default:
            return state
    }
}