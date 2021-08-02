import React from 'react';
import PropTypes from 'prop-types';
import './BoardContent.scss'
import Column from 'components/Column/Column';

BoardContent.propTypes = {

};

function BoardContent(props) {
    return (
        <div className="broad-content">
            <Column></Column>
            <Column></Column>
            <Column></Column>
        </div>
    );
}

export default BoardContent;