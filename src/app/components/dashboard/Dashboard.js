import React from 'react';
import './style.scss';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {  // TODO: this is placeholder, maybe get this info from local storage
                id: 123456,
                name: 'Foo Bar',
                avatar: 'http://i.stack.imgur.com/Dj7eP.jpg'
            },
            todoList: [],
            completeList: [],
            shouldShowAddTodoPopUp: false
        }
    }

    getList() {
        // TODO: placeholder; wait for sever API document to implement this function
    }

    updateList(newTodoItem) {
        // TODO: placeholder; wait for sever API document to implement this function
        this.toggleNewTodoPopUp();
    }

    toggleNewTodoPopUp() {
        this.setState((state) => ({ shouldShowAddTodoPopUp: !state.shouldShowAddTodoPopUp }));
    }

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
                    <div className="popup-bg">
                        <div className="popup-window">
                            <h2>Create new todo item</h2>
                            {/* TODO: add a check when closing this pop-up */}
                            <button onClick={(event) => { this.toggleNewTodoPopUp(); event.preventDefault(); }}>Close</button>
                            <button onClick={(event) => { this.updateList('info'); event.preventDefault(); }}>Submit</button>
                        </div>
                    </div>
                    ) : null
                }
            </div>
        );
    }
}