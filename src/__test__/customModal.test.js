import TestRenderer from 'react-test-renderer';

import customModal from '../components/customModal'
/** @jsx jsx */
import { jsx } from '@emotion/core';



const testRenderer = TestRenderer.create(<customModal buttonLabel="Add Manager"></customModal>);
const testInstance = testRenderer.root;


test('Should render modal component', () => {
    
    
    //button
const Button = testInstance.find(
    (el) => 
    el.type == 'Button'
    );
    console.log("this is", options)
expect(Button.children).toEqual(['Add Manager']);
expect(Button.length).toEqual(1);

Button.props.onClick()

// Dropdown


const Button = testInstance.findAll(
    (el) => 
    el.type == 'option'
    );
expect(Button.length).toEqual(7);

//input Field



const Button = testInstance.findAll(
    (el) => 
    el.type == 'input'
    );
expect(Button.length).toEqual(3);})
