import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { selectAllInlineText, saveContentAfterPressEnter } from 'utilities/contentEditable'
import { cloneDeep } from 'lodash'
import './Column.scss'

import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/mapOrder'
import { Button, Dropdown, Form } from 'react-bootstrap'
import ConfirmModal from 'common/ConfirmModal'
import { createNewCard, updateColumn } from 'actions/ApiCall'

Column.propTypes = {

}

function Column(props) {

    const { column, onCardDrop, onUpdateColumnState } = props
    const cards = mapOrder(column.cards, column.cardOrder, '_id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    //handel show modal confirm edit column
    const toggleShowConfirmModal = () => { setShowConfirmModal(!showConfirmModal) }

    const [columnTitle, setColumnTitle] = useState('')
    useEffect(() => { setColumnTitle(column.title) }, [column.title])

    const [opnenNewCardForm, setOpnenNewCardForm] = useState(false)
    // handel show input title new card via state
    const toggleOpenNewCardForm = () => { setOpnenNewCardForm(!opnenNewCardForm) }

    const [newCardTitle, setNewCardTitle] = useState('')
    const onNewCardTitleChange = (e) => { setNewCardTitle(e.target.value) }

    const newCardInputRef = useRef(null)
    useEffect(() => {
        if (newCardInputRef && newCardInputRef.current) {
            newCardInputRef.current.focus()
            newCardInputRef.current.select()
        }
    }, [opnenNewCardForm])

    //hendle event on confirm modal remove column
    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            //remove column
            const updatedColumn = { ...column, _destroy: true }
            //call API update Column
            updateColumn(updatedColumn._id, updatedColumn).then(updatedColumn => {
                onUpdateColumnState(updatedColumn)
            })
        }
        toggleShowConfirmModal()
    }

    // hendle event on change input
    const handleColumnTitleChange = (e) => { setColumnTitle(e.target.value) }
    //handel event on change blur=> update title column
    const handleColumnTitleBlur = () => {
        if (column.title !== columnTitle) {
            const newColumn = { ...column, title: columnTitle }
            //call API update Column
            updateColumn(newColumn._id, newColumn).then(updatedColumn => {
                onUpdateColumnState(updatedColumn)
            })
        }
    }
    // add new Card
    const addNewCard = () => {
        if (!newCardTitle) {
            newCardInputRef.current.focus()
            return
        }
        const newCardToAdd = {
            boardId: column.boardId,
            columnId: column._id,
            title: newCardTitle.trim()
        }
        // call API
        createNewCard(newCardToAdd).then(card => {
            let newColumn = cloneDeep(column)
            newColumn.cards.push(card)
            newColumn.cardOrder.push(card._id)
            onUpdateColumnState(newColumn)
            setNewCardTitle('')
            setOpnenNewCardForm(false)
        })
    }
    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className='trallo-content-editable'
                        value={columnTitle}
                        spellCheck='false'
                        onClick={selectAllInlineText}
                        onChange={handleColumnTitleChange}
                        onBlur={handleColumnTitleBlur}
                        onKeyDown={saveContentAfterPressEnter}
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle size='sm' id="dropdown-basic" className='dropdow-btn'>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={toggleOpenNewCardForm} >Add Card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column</Dropdown.Item>
                            <Dropdown.Item >Move all card in this column(beta)...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    orientation="vertical"
                    groupName="card-group"
                    onDrop={dropResult => onCardDrop(column._id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) =>
                        <Draggable key={card._id}>
                            <Card card={card}></Card>
                        </Draggable>
                    )}
                </Container>
                {
                    opnenNewCardForm &&
                    <div className="add-new-card-area">
                        <Form.Control
                            size="sm"
                            as="textarea"
                            rows='3'
                            placeholder="Enter a title for this card..."
                            className='textarea-enter-new-card'
                            ref={newCardInputRef}
                            value={newCardTitle}
                            onChange={onNewCardTitleChange}
                            onKeyDown={(e) => (e.key === 'Enter') && addNewCard}
                        />

                    </div>
                }
            </div>

            <footer>
                {
                    opnenNewCardForm &&
                    <div className="add-new-card-actions">
                        <Button size="sm" variant="success" onClick={addNewCard} >Add new</Button>
                        <span className='cancel-icon' onClick={toggleOpenNewCardForm}> <i className='fa fa-trash icon '></i></span>
                    </div>
                }
                {
                    !opnenNewCardForm &&
                    <div className="footer-actions" onClick={toggleOpenNewCardForm}>
                        <i className="fa fa-plus icon" />Add another card
                    </div>
                }
            </footer>

            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={'Remove Column'}
                content={`Are you sure youcwant to remove <strong> ${column.title} </strong>.</br> All related cards will also be remove`}
            />
        </div >
    )
}

export default Column