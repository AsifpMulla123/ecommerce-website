import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails'
import Navbar from '../features/Navbar/Navbar'

const ProductDetailsPage = () => {
    return (<div>
        <Navbar>
            <ProductDetails />
        </Navbar>
    </div>
    )
}

export default ProductDetailsPage