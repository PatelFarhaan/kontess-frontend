import React from 'react';

import PopUp from '../popup-window/PopUp';

export default class ToDo extends React.Component {
    renderList() {
        return (
            <div className="todo-item-list">
                <div className="todo-item">
                    <p>Kontess</p>
                </div>
                <div className="todo-item">
                    <p>Hello, world</p>
                </div>
                <div className="todo-item">
                    <p>JavaScript</p>
                </div>
                <div className="todo-item">
                    <p>Python</p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="todo-container">
                <h1>TO-DO List</h1>
                <div className="todo-content">
                    <section>
                        <div className="todo-item-title">
                            <h2>Working in Progress</h2>
                            <button onClick={
                                (event) => { this.toggleNewTodoPopUp(); event.preventDefault(); }
                            }>Add...</button>
                        </div>
                        {this.renderList()}
                    </section>
                    <section>
                        <div className="todo-item-title">
                            <h2>Complete</h2>
                        </div>
                        {this.renderList()}
                    </section>
                </div>
                {
                    this.state.shouldShowAddTodoPopUp ? (
                        <PopUp />
                    ) : null
                }
            </div>
        );
    }
}