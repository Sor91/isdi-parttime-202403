import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Confirm from './Confirm'
import UserView from './UserView'

import logic from '../../logic'
import { useState } from 'react'

import useContext from '../../useContext'

function User({ user, onUserRefreshed }) {
    const { alert } = useContext()

    const [viewUser, setViewUser] = useState(false)
    const handleViewUserClick = () => setViewUser(true)
    const handleProcessFinishClick = () => setViewUser(false)

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
    const handleDeleteUser = () => setConfirmDeleteVisible(true)
    const handleDeleteUserCanceled = () => setConfirmDeleteVisible(false)

    const handleDeleteUserAccepted = () => {
        try {
            logic.deleteUser(user.id)
                .then(() => onUserRefreshed() )
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteUserCancelled = () => setConfirmDeleteVisible(false)

    const [confirmModifyVisible, setConfirmModifyVisible] = useState(false)
    const handleModifyUser = () => setConfirmModifyVisible(true)
    const handleModifyUserCanceled = () => setConfirmModifyVisible(false)

    const handleModifyUserAccepted = () => {
        try {
            logic.modifyUserAvailable(user.id, !user.available)
                .then(() => {
                    onUserRefreshed()
                    setConfirmModifyVisible(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleModifyUserCancelled = () => setConfirmModifyVisible(false)

    return <div>
        <div className='flex items-center justify-between py-2 px-2'>
            <Text>Name: {user.name}</Text>
            <div className='flex gap-2'>
                {!confirmModifyVisible && logic.getUserRole() === 'admin' && user.available === true && <Button className='border-indigo-300' onClick={handleModifyUser}>Unsubscribe</Button>}
                {confirmModifyVisible && logic.getUserRole() === 'admin' && user.available === true && <Button className='border-none' onClick={handleModifyUserCanceled}>{<MdClose />}</Button>}
                
                {!confirmModifyVisible && logic.getUserRole() === 'admin' && user.available === false && <Button className='border-indigo-300' onClick={handleModifyUser}>Subscribe</Button>}
                {confirmModifyVisible && logic.getUserRole() === 'admin' && user.available === false && <Button className='border-none' onClick={handleModifyUserCanceled}>{<MdClose />}</Button>}
                
                {!viewUser && <Button className='border-none' onClick={handleViewUserClick}>{<FaEye />}</Button>}
                {viewUser && <Button className='border-none' onClick={handleProcessFinishClick}>{<FaEyeSlash />}</Button>}
                
                {!confirmDeleteVisible && logic.getUserRole() === 'admin' && <Button className='border-none' onClick={handleDeleteUser}>{<RiDeleteBin5Line/>}</Button>}
                {confirmDeleteVisible && logic.getUserRole() === 'admin' && <Button className='border-none' onClick={handleDeleteUserCanceled}>{<MdClose/>}</Button>}
            </div>
        </div>

        {confirmModifyVisible && user.available === true && <Confirm message='Unsubscribe user?' onAccept={handleModifyUserAccepted} onCancel={handleModifyUserCancelled} />}
        {confirmModifyVisible && user.available === false && <Confirm message='Subscribe user?' onAccept={handleModifyUserAccepted} onCancel={handleModifyUserCancelled} />}
        {viewUser && <UserView user={user} onProcessFinished={handleProcessFinishClick} />}
        {confirmDeleteVisible && <Confirm message='Delete user?' onAccept={handleDeleteUserAccepted} onCancel={handleDeleteUserCancelled} />}
    </div>
}

export default User