import React from 'react';
import PropTypes from 'prop-types';
import './Column.scss'
import Task from 'components/Task/Task';

Column.propTypes = {

};

function Column(props) {
    return (
        <div className="column">
            <header>
                Brainstorm
            </header>
            <ul className="task-list">
                <Task></Task>
                {/* <li className="task-item">
                    <img src='https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/94541117_2709832912475906_8713513338115457024_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=0oi2H1ZiKeAAX8QfKLa&_nc_ht=scontent.fhan5-2.fna&oh=e7ba0630a3795a137f0f08b1b223d5d5&oe=612CA2C4' alt="phamngochoan"></img>
                    Title: Ngọc Hoàn
                </li> */}
                <li className="task-item"> Add what you'd like to work on below </li>
                <li className="task-item"> Add what you'd like to work on below </li>
                <li className="task-item"> Add what you'd like to work on below </li>
                <li className="task-item"> Add what you'd like to work on below </li>
                <li className="task-item"> Add what you'd like to work on below </li>
            </ul>
            <footer>
                Add another card
            </footer>
        </div>
    );
}

export default Column;