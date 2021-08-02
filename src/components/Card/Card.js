import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss'

Card.propTypes = {

};

function Card(props) {
    const { card } = props;
    card.cover && console.log(card.cover)
    return (
        <li className="card-item">
            {card.cover && <img src={card.cover} className="card-cover" alt={card.title} />}
            {card.title}
        </li>
    );
}

export default Card;