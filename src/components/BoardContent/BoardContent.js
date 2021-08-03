import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/mapOrder'
import { applyDrag } from 'utilities/drapDrop'

import { initalData } from 'actions/initalData'

BoardContent.propTypes = {}

function BoardContent(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    useEffect(() => {
        //inital data for board
        const boardOfDB = initalData.board.find(board => board.id === 'board-1')
        if (boardOfDB) {
            setBoard(boardOfDB)
            //sort column

            setColumns(mapOrder(boardOfDB.columns, boardOfDB.columnOrder, 'id'))
        }
    }, [])

    // check board have data
    if (isEmpty(board)) {

        return (<div className='not-found' style={{ 'padding': '10px', 'background_color': 'while' }}>Board not found</div>)
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        setColumns(newColumns)
        // setBoard(newBoard)
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
            setColumns(newColumns)
        }
    }
    return (
        <div className="broad-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index =>
                    columns[index]
                }
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) =>
                    <Draggable key={column.id} >
                        <Column column={column} onCardDrop={onCardDrop}></Column>
                    </Draggable>
                )}
            </Container>
            <div className='add-new-column'>
                <i className="fa fa-plus icon" />Add another column
            </div>
        </div>
    )
}

export default BoardContent