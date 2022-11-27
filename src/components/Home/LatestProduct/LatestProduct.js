
import React from 'react';
import Carousel from "react-elastic-carousel";
import Item from './CarouselUtility';
import UpdateQuantity from '../../shared/Cart/UpdateQuantity'
import {Link} from "react-router-dom"
import './CarouselStyle.scss'


// Idividual Product Rendering part for Home Page
let LatestProduct = ({ product }) => {

    //console.log(product.imageURLs);

    return (
        <div className="product" id={`product${product.id}`} data-testid='c1'>
            <div className="imageBox">
                <div className={`images${product.id}`}>
                    <Carousel itemsToShow={1} >
                        <Item><img src={`${product.imageURLs[0].thumbnail}`} alt={`${product.imageURLs[0].altText}`} width="225" height="225" id={`thumbnail${product.id}`} /></Item>
                        <Item><img src={`${product.imageURLs[1].thumbnail}`} alt={`${product.imageURLs[1].altText}`} width="225" height="225" id={`thumbnail${product.id}`} /></Item>
                        <Item><img src={`${product.imageURLs[2].thumbnail}`} alt={`${product.imageURLs[2].altText}`} width="225" height="225" id={`thumbnail${product.id}`} /></Item>
                        <Item><img src={`${product.imageURLs[3].thumbnail}`} alt={`${product.imageURLs[3].altText}`} width="225" height="225" id={`thumbnail${product.id}`} /></Item>
                    </Carousel>
                </div>
            </div>
            <div className="text-box">
                <h2 className="item"><Link to={`./products/${product.id}`} id={`productName${product.id}`}>{product.productName}</Link></h2>
                <h3 className="price" id={`productPrice${product.id}`}>Rs.{product.price}</h3>
                {/* Add to Cart functionality Button */}
                <UpdateQuantity product={product} />
            </div>
        </div>
    )

}

export default LatestProduct;
