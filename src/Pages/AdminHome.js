import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/Admin/components/AdminProductList'

const AdminHome = () => {
    return (
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
    )
}

export default AdminHome