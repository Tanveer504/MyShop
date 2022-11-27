import {configure,shallow} from 'enzyme'; //named export so u need curly braces
import Adapter from 'enzyme-adapter-react-16';//default export so that enzyme is connected with react version 16
import LatestProduct from './LatestProduct';
import {render, screen} from '@testing-library/react';
import React from 'react';
import { ITERATOR_SYMBOL } from 'enzyme/build/Utils';
import { mount } from 'enzyme/build';
configure({adapter:new Adapter});
import Carousel from "react-elastic-carousel";
import Item from './CarouselUtility';
import TestRenderer from 'react-test-renderer';

//shallow is the best way to render react components,not deep rendering


describe("Complete Test Suite",()=>{

    it("test case 1",()=>{  


        const commonProps = {id: '10',imageURLs:[
            {
                "url": "http://placehold.jp/3d4070/ffffff/600x600.png?text=Samsung%20Galaxy%20Z%20Flipe%205G",
                "thumbnail": "http://placehold.jp/3d4070/ffffff/150x150.png?text=Samsung%20Galaxy%20Z%20Flipe%205G",
                "altText": "Samsung Galaxy Z Flipe 5G"
            },
            {
                "url": "http://placehold.jp/3d4070/ffffff/600x600.png?text=Samsung%20Galaxy%20Z%20Flipe%205G%20first%20angle",
                "thumbnail": "http://placehold.jp/3d4070/ffffff/150x150.png?text=Samsung%20Galaxy%20Z%20Flipe%205G%20first%20angle",
                "altText": "Samsung Galaxy Z Flipe 5G first angle"
            },
            {
                "url": "http://placehold.jp/3d4070/ffffff/600x600.png?text=Samsung%20Galaxy%20Z%20Flipe%205G%20second%20angle",
                "thumbnail": "http://placehold.jp/3d4070/ffffff/150x150.png?text=Samsung%20Galaxy%20Z%20Flipe%205G%20second%20angle",
                "altText": "Samsung Galaxy Z Flipe 5G second angle"
            },
            {
                "url": "http://placehold.jp/3d4070/ffffff/600x600.png?text=Samsung%20Galaxy%20Z%20Flipe%205G%20third%20angle",
                "thumbnail": "http://placehold.jp/3d4070/ffffff/150x150.png?text=Samsung%20Galaxy%20Z%20Flipe%205G%20third%20angle",
                "altText": "Samsung Galaxy Z Flipe 5G third angle"
            }
                 ]};
        const wrapper=shallow(<LatestProduct product={commonProps} />);
        //wrapper.setProps({id:4});
        //console.log(expect(wrapper.find('#c1')));
        //console.log(screen.debug(null, Infinity));
        const testRenderer = TestRenderer.create(
            <LatestProduct product={commonProps} />
          );
          
          console.log(testRenderer.toTree());
        //expect(wrapper.containsMatchingElement(<div />)).toEqual(true);
    })


})