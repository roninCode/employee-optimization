import React from 'react'
import { IUser } from 'util/interfaces'

interface UserProps {
    user: IUser
}

const User = ({user}: UserProps) => {
    return (
        <div style={{display: 'flex'}}>
            <p>{user.first_name} {user.last_name}</p>
        </div>
    )
}

export default User