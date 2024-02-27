import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductDetails from '../features/Admin/components/AdminProductDetails'

const AdminProductDetailsPage = () => {
    return (<div>
        <Navbar>
            <AdminProductDetails />
        </Navbar>
    </div>
    )
}

export default AdminProductDetailsPage