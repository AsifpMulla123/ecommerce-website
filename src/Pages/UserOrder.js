import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

const UserOrder = () => {
    return (
        <div>
            <Navbar>
                <h1 className='mx-auto text-2xl'>My Orders</h1>
                <UserOrders />
            </Navbar>
        </div>
    )
}

export default UserOrder