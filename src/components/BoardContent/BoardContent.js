import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/mapOrder'
import { applyDrag } from 'utilities/drapDrop'

import { initalData } from 'actions/initalData'
import { Container as BSContainer, Col, Row, Form, Button } from 'react-bootstrap'

BoardContent.propTypes = {}

function BoardContent(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [opnenNewColumnForm, setOpnenNewColumnForm] = useState(false)
    const [newColumnTitle, setNewColumnTitle] = useState('')


    const newColumnInputRef = useRef(null)

    const onNewColumnTitleChange = useCallback((e) => { setNewColumnTitle(e.target.value) }, [])
    useEffect(() => {
        //inital data for board
        const boardOfDB = initalData.board.find(board => board.id === 'board-1')
        if (boardOfDB) {
            setBoard(boardOfDB)
            //sort column

            setColumns(mapOrder(boardOfDB.columns, boardOfDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [opnenNewColumnForm])
    // check board have data
    if (isEmpty(board)) {

        return (<div className='not-found' style={{ 'padding': '10px', 'background_color': 'while' }}>Board not found</div>)
    }
    //handle event drop column
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }
    //handle event drop card
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
            setColumns(newColumns)
        }
    }
    // handel show input title new column via state
    const toggleOpenNewColumnForm = () => { setOpnenNewColumnForm(!opnenNewColumnForm) }
    // handel add new column
    const addNewColumn = (e) => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            board: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }
        let newColumns = [...columns, newColumToAdd]
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        setColumns(newColumns)
        setBoard(newBoard)
        setNewColumnTitle('')
        toggleOpenNewColumnForm()


    }
    // handel update column
    const onUpdateColumn = (newColumnToUpdate) => {
        const idColumnToUpdate = newColumnToUpdate.id
        let newColumns = [...columns]
        const indexColumnsToUpdate = newColumns.findIndex(c => c.id === idColumnToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(indexColumnsToUpdate, 1)
        }
        else {
            //update column
            newColumns.splice(indexColumnsToUpdate, 1, newColumnToUpdate)
        }
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)


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
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn}></Column>
                    </Draggable>
                )}
            </Container>
            <BSContainer className='trello-container'>
                {
                    !opnenNewColumnForm &&
                    <Row>
                        <Col className='add-new-column' onClick={toggleOpenNewColumnForm}><i className="fa fa-plus icon" />Add another column</Col>
                    </Row>
                }
                {
                    opnenNewColumnForm &&
                    <Row>
                        <Col className='enter-new-column'>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter column title..."
                                className='input-enter-new-column'
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={onNewColumnTitleChange}
                                onKeyDown={(e) => (e.key === 'Enter') && addNewColumn()}
                            />
                            <Button size="sm" variant="success" onClick={addNewColumn}>Add new</Button>
                            <span className='cancel-new-column' onClick={toggleOpenNewColumnForm}> <i className='fa fa-trash icon '></i></span>
                        </Col>
                    </Row>
                }
            </BSContainer>

        </div>
    )
}

export default BoardContent