import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Slideshow.scss'
import { SlideshowData } from './SlideshowData'
// Slideshow array
const Slideshow = () => {
    const [id, setId] = useState(0);

    // Slideshow function using useEffect and useState
    useEffect(() => {
        const interval = setInterval(() => {
            setId(id => (id + 1) % SlideshowData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleIncrement = () => {
        setId((id + 1) % (SlideshowData.length));
    }
    const handleDecrement = () => {
        if (id === 0) {
            setId(SlideshowData.length - 1);
        }
        else {
            setId(Math.abs((id - 1) % (SlideshowData.length)));
        }

    }
    return (
        <section>
            <div className="slideshowSection">
                <div className="slideShowBox homePageImage" >
                    <img src={SlideshowData[id].url} className="homeImage" alt={SlideshowData[id].altText} width="80%" height="80%" />
                </div>

                <div className="slideShowBox">
                    <h1 className="slideshowHeading">{SlideshowData[id].heading}</h1>

                    <p className="slideshowContent">{SlideshowData[id].content}</p>

                    <div className="browserButton">
                        <Link className="products" to='/products'><b>BROWSE 1000+ PRODUCTS</b></Link>
                    </div>
                    <button onClick={handleIncrement} className="arrow arrowRight"></button>
                    <button onClick={handleDecrement} className="arrow arrowLeft"></button>
                </div>
            </div>
        </section>
    )
}

export default Slideshow