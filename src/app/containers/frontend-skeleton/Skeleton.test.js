import React from 'react';
import { shallow } from 'enzyme';
import Skeleton from './Skeleton';

import kontessLogoImg from 'assets/images/logo_name_blue.png';

describe('<Skeleton />', () => {
    it('should render logo', () => {
        const renderedSkeleton = shallow(<Skeleton />);
        expect(
            renderedSkeleton.contains(
                <img src={kontessLogoImg} alt="Kontess Logo" />
            )
        ).toBe(true);
    });

    it('should render sidenav', () => {
        const sidenav = shallow(<Skeleton />).find('.sidenav');
        expect(sidenav.find('p').text).to.strictEqual('Main Menu');
        expect(sidenav.find('a').length).to.strictEqual(5);
        expect(sidenav.find('a').at(0).text).to.strictEqual('Dashboard');
        expect(sidenav.find('a').at(1).text).to.strictEqual('Activity');
        expect(sidenav.find('a').at(2).text).to.strictEqual('My Team');
        expect(sidenav.find('a').at(3).text).to.strictEqual('Team Info');
        expect(sidenav.find('a').at(4).text).to.strictEqual('Settings');
    });

    it('should change to corresponding page when clicking buttons in sidenav', () => {
        // TODO: add test code
    });

    it('should render topnav', () => {
        // TODO: add test code
    });

    it('should show up corresponding sub menu when clicking buttons in topnav', () => {
        // TODO: add test code
    });
});
