import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { MODAL_ACTION_CONFIRM } from 'utilities/contanst'
import { selectAllInlineText, saveContentAfterPressEnter } from 'utilities/contentEditable'
import './Column.scss'

import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/mapOrder'
import { Dropdown, Form } from 'react-bootstrap'
import ConfirmModal from 'common/ConfirmModal'

Column.propTypes = {

}

function Column(props) {

    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])
    //handel show modal confirm edit column
    const toggleShowConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal)
    }
    //hendle event on confirm modal remove column
    const onConfirmModalAction = (type) => {

        if (type === MODAL_ACTION_CONFIRM) {
            //remove column
            const newColumn = { ...column, _destroy: true }
            onUpdateColumn(newColumn)

        }
        toggleShowConfirmModal()
    }

    // hendle event on change input
    const handleColumnTitleChange = useCallback((e) => { setColumnTitle(e.target.value) }, [])
    //handelevent on change blur
    const handleColumnTitleBlur = () => {
        const newColumn = { ...column, title: columnTitle }
        onUpdateColumn(newColumn)
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
                            <Dropdown.Item >Add Card</Dropdown.Item>
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
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
                        <Draggable key={card.id}>
                            <Card card={card}></Card>
                        </Draggable>
                    )}
                </Container>
            </div>
            <footer>
                <div className="footer-actions">
                    <i className="fa fa-plus icon" />Add another card
                </div>
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