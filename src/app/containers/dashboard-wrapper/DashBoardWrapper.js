import React from 'react';

import Dashboard from '../dashboard/Dashboard';
import ToDoBody from '../todo-body/ToDoBody';

export default function DashBoardWrapper(props) {
    return (
        <Dashboard>
            <ToDoBody />
        </Dashboard>
    );
}
