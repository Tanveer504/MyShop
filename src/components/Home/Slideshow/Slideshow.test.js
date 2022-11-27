import React from 'react';
import Slideshow from './Slideshow';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer'

describe("Slideshow Component", () => {
    it('renders the component properly', () => {
        const divEl = document.createElement('div');
        ReactDom.render(<BrowserRouter><Slideshow/></BrowserRouter>, divEl);
    });

    it('should have products as text', () => {
        render(<BrowserRouter><Slideshow/></BrowserRouter>);
        const productsText = screen.getByText('BROWSE 1000+ PRODUCTS');
        expect(productsText).toBeInTheDocument();
    });

    it('should have right Slideshow comp snapshot', () => {
        const tree = renderer.create(<BrowserRouter><Slideshow/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
  
   
})