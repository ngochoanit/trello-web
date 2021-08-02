import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types';

import './BoardContent.scss'

import Column from 'components/Column/Column';
import { mapOrder } from 'utilities/mapOrder';

import { initalData } from 'actions/initalData';

BoardContent.propTypes = {

};

function BoardContent(props) {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        //inital data for board
        const boardOfDB = initalData.board.find(board => board.id === 'board-1')
        if (boardOfDB) {
            setBoard(boardOfDB);
            //sort column

            setColumns(mapOrder(boardOfDB.columns, boardOfDB.columnOrder, 'id'))
        }
    }, [])

    // check board have data 
    if (isEmpty(board)) {

        return (<div className='not-found' style={{ 'padding': '10px', 'background_color': 'while' }}>Board not found</div>)
    }
    return (
        <div className="broad-content">
            {
                columns.map((column, index) => <Column key={column.id} column={column}></Column>)
            }
        </div>
    );
}

export default BoardContent;