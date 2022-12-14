import React from 'react'
import useFetch from '../../../config/useFetch';
import fetchUrls from '../../../config/config.json';
import LatestProduct from '../LatestProduct/LatestProduct';
import './latestProduct.scss'
const LatestProducts = ({ urlParam = '/?_limit=3&_sort=added&_order=asc' }) => {

    const products = useFetch(fetchUrls.productApi + urlParam, "GET");

    let productList = null;
    if (products.apiData !== null) {
        productList = products.apiData.map((product,id) => {

            return (<LatestProduct key={id} product = {product}></LatestProduct>)
        });
    }
    // productList={} //for checking the loading products spinner
    return (
        <section>

            {productList && productList.length > 0 ?
                <div className="listingSection">
                {productList}
                </div>
                :
                <section>
                    <p className='latestProductsText'><strong>Loading Latest Products</strong></p>
                    <div className="loader"/>
                </section>
            }
        </section>
    )
}

export default LatestProducts;