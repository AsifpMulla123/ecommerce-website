import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails'
import Navbar from '../features/Navbar/Navbar'
import Footer from '../features/common/Footer'

const ProductDetailsPage = () => {
    return (<div>
        <Navbar>
            <ProductDetails />
        </Navbar>
        <Footer/>
    </div>
    )
}

export default ProductDetailsPage