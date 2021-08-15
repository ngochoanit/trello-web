import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty, cloneDeep, isEqual } from 'lodash'
import { fetchBoardDetails, createNewColumn, updateBoard, updateColumn, updateCard } from 'actions/ApiCall'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/mapOrder'
import { applyDrag } from 'utilities/drapDrop'

import { Container as BSContainer, Col, Row, Form, Button } from 'react-bootstrap'

BoardContent.propTypes = {}

function BoardContent(props) {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    // handel show input title new column via state
    const toggleOpenNewColumnForm = () => { setOpenNewColumnForm(!openNewColumnForm) }

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = (e) => { setNewColumnTitle(e.target.value) }

    useEffect(() => {
        //inital data for board
        const boardId = '610eaae4a48f5feaaf37135f'
        fetchBoardDetails(boardId).then(board => {
            setBoard(board)
            //sort column
            setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
        })
    }, [])

    const newColumnInputRef = useRef(null)
    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [openNewColumnForm])

    // check board have data
    if (isEmpty(board)) {

        return (<div className='not-found' style={{ 'padding': '10px', 'background_color': 'while' }}>Board not found</div>)
    }
    //handle event drop column
    const onColumnDrop = (dropResult) => {
        let newColumns = cloneDeep(columns)
        newColumns = applyDrag(newColumns, dropResult)
        let newBoard = cloneDeep(board)
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        if (!isEqual(board.columnOrder, newBoard.columnOrder)) {
            /**
             * call Api update  column order on broad  when column order after diferent column order befor
             */
            updateBoard(newBoard._id, newBoard).catch(() => {
                setColumns(columns)
                setBoard(board)
            })
        }

    }
    //handle event drop card
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = cloneDeep(columns)
            let currentColumnBefore = columns.find(c => c._id === columnId)
            let currentColumn = newColumns.find(c => c._id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(i => i._id)
            setColumns(newColumns)
            if (dropResult.addedIndex !== null && dropResult.removedIndex !== null) {
                /**
                 * Action:move card inside its column
                 * call api update cardOder in current column
                 * call api when  index after diferent index befor
                 */
                if (!isEqual(currentColumn, currentColumnBefore)) {
                    updateColumn(currentColumn._id, currentColumn).catch(() => {
                        setColumns(columns)
                    })
                }

            }
            else {
                /**
                 * Action:move card beetween two column
                 * 1-call api update cardOder in current column
                 * 2-call api update culumnId in current card
                 */
                updateColumn(currentColumn._id, currentColumn).catch(() => {
                    setColumns(columns)
                })
                if (dropResult.addedIndex !== null) {
                    let currentCart = cloneDeep(dropResult.payload)
                    currentCart.columnId = currentColumn._id
                    // 2-call api update culumnId in current card
                    // updateColumn(currentColumn._id, currentColumn).catch(() => {
                    //     setColumns(columns)
                    // })
                    updateCard(currentCart._id, currentCart).catch(() => { })

                }
            }

        }
    }
    // handel add new column
    const addNewColumn = (e) => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumToAdd = {
            boardId: board._id,
            title: newColumnTitle.trim()
        }
        //call API
        createNewColumn(newColumToAdd).then(column => {
            let newColumns = cloneDeep(columns)
            newColumns.push(column)
            let newBoard = cloneDeep(board)
            newBoard.columnOrder = newColumns.map(c => c._id)
            setColumns(newColumns)
            setBoard(newBoard)
            setNewColumnTitle('')
            toggleOpenNewColumnForm()
        })
    }
    // handel update column
    const onUpdateColumnState = (newColumnToUpdate) => {
        const idColumnToUpdate = newColumnToUpdate._id
        let newColumns = cloneDeep(columns)
        const indexColumnsToUpdate = newColumns.findIndex(c => c._id === idColumnToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(indexColumnsToUpdate, 1)
        }
        else {
            //update column
            newColumns.splice(indexColumnsToUpdate, 1, newColumnToUpdate)
        }
        let newBoard = cloneDeep(board)

        newBoard.columnOrder = newColumns.map(c => c._id)
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
                    <Draggable key={column._id} >
                        <Column
                            column={column}
                            onCardDrop={onCardDrop}
                            onUpdateColumnState={onUpdateColumnState}
                        ></Column>
                    </Draggable>
                )}
            </Container>
            <BSContainer className='trello-container'>
                {
                    !openNewColumnForm &&
                    <Row>
                        <Col className='add-new-column' onClick={toggleOpenNewColumnForm}><i className="fa fa-plus icon" />Add another column</Col>
                    </Row>
                }
                {
                    openNewColumnForm &&
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
                            <span className='cancel-icon' onClick={toggleOpenNewColumnForm}> <i className='fa fa-trash icon '></i></span>
                        </Col>
                    </Row>
                }
            </BSContainer>

        </div>
    )
}

export default BoardContent