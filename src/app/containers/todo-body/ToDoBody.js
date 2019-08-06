import React from 'react';
import './style.scss';

import ToDo from '../../components/todo/ToDo';

export default class Body extends React.Component {
    render() {
        return (
            <div>
                <ToDo />
            </div>
        );
    }
}