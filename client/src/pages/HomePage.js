import React from 'react'
import ProductList from '../components/ProductList'


const HomePage =() => {
    return (
        <>
        <div className="flex justify-center items-center w-full my-12">
            <h1 className="text-3xl font-bold">Application Mcommerce</h1>
        </div>
        <ProductList></ProductList>
        </>
    )
};
export default HomePage;