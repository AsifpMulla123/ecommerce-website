import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'
import Footer from '../features/common/Footer'

const Home = () => {
    return (
        <>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Footer />
        </>
    )
}

export default Home