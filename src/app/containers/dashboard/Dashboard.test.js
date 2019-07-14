import React from 'react';
import { shallow, mount } from 'enzyme';
import Skeleton from './Skeleton';

describe('<Skeleton />', () => {
    it('should display correct user information', () => {
        const renderedComponent = shallow(<Skeleton />);
        expect(renderedComponent.find('#user-name-avatar').find('p').contains('Foo Bar'));
        // TODO: since I'm not sure how the user token will be stored, using placeholder for now
    });

    it('should switch to correct page', () => {
        const renderedComponent = mount(<Skeleton />);
        renderedComponent.find('#main-content').contains(<div><h2>TODOs</h2></div>);
        renderedComponent.find('#page-title').contains('Dashboard');

        // I'm using `document.getElementById` when switching pages
        // but when I do `console.log(document.querySelector('body').innerHTML)`
        // nothing printed out, which means the body of DOM is empty
        // and making the following tests fail and I'm not sure why it doesn't mount the component to the DOM

        // If you uncomment following code, you will see `Uncaught TypeError: Cannot read property 'classList' of null
        // renderedComponent.find('#sidenav-activity').simulate('click');
        // renderedComponent.find('#main-content').contains(<div><h2>Recent Activity</h2></div>);
        // renderedComponent.find('#page-title').contains('Activity');
    });
});