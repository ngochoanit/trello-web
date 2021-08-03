import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/mapOrder'

Column.propTypes = {

}

function Column(props) {
    const { column, onCardDrop } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    return (
        <div className="column">
            <header className="column-drag-handle">
                {column.title}
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
        </div>
    )
}

export default Column