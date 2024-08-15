import enrollUser from './enrollUser'
import login from './login'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import logout from './logout'

import addTask from './addTask'
import getMyTasks from './getMyTasks'
import getMyPrivateTasks from './getMyPrivateTasks'
import getMyInProgressTasks from './getMyInProgressTasks'
import deleteTask from './deleteTask'

const logic = {
    enrollUser,
    login,
    isUserLoggedIn,
    getUserId,
    logout,

    addTask,
    getMyTasks,
    getMyInProgressTasks,
    getMyPrivateTasks,
    deleteTask
}

export default logic