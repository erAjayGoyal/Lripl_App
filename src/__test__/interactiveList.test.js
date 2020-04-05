// Link.react.test.js
import React from 'react';
import ineractiveList from '../components/InteractiveList';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
    let buttonConfig = ['edit', 'delete']
    let data = ["Category Name 1", "Category Name 2", "Category Name 3","Category Name 4", "Category Name 5"];
    
    
    
    const component = renderer.create(
    <ineractiveList
    buttonConfig = {buttonConfig}
    data = {data}
   // history = {this.props.history}
    pageName = "category"
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//  expect(tree).toMatchSnapshot();
});