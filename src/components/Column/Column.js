import React from 'react';
import PropTypes from 'prop-types';
import './Column.scss'
import Card from 'components/Card/Card';
import { mapOrder } from 'utilities/mapOrder';

Column.propTypes = {

};

function Column(props) {
    const { column } = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    return (
        <div className="column">
            <header>
                {column.title}
            </header>
            <ul className="card-list">

                {cards.map((card, index) => <Card key={card.id} card={card}></Card>)}
            </ul>
            <footer>
                Add another card
            </footer>
        </div>
    );
}

export default Column;