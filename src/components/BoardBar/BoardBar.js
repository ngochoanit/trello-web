import React from 'react'
import { Container as BootstrapContainer , Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import './BoardBar.scss'

BoardBar.propTypes = {

}

function BoardBar(props) {
    return (
        <nav className="navbar-board">
            <BootstrapContainer className="trello-app-container">
                <Row>
                    <Col sm={10} xs={12} className="col-no-padding">
                    <div className="board-info">
                        <div className="item board-logo-icon">
                            <i className="fa fa-coffee"></i>
                            &nbsp;&nbsp;
                            <strong>Trello App</strong>
                        </div>
                        <div className="divider"></div>

                        <div className="item broad-type">Private Workspace</div>
                        <div className="divider"></div>

                        <div className="item member-avatar">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="avatar" title="avatar girl"></img>
                            <img src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80" alt="avatar" title="avatar girl"></img>
                            <img src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="avatar" title="avatar girl"></img>
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="avatar" title="avatar girl"></img>
                            <img src="https://images.unsplash.com/photo-1441123694162-e54a981ceba5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="avatar" title="avatar girl"></img>
                            <img src="https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="avatar" title="avatar girl"></img>
                            <img src="https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="avatar" title="avatar girl"></img>
                            <span className="more-members">+9</span>
                            <span className="invite">invite</span>
                        </div>
                    </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="board-actions">
                            <div className="item menu">
                                <i className="fa fa-ellipsis-h mr-2" ></i>
                                <span> Show move</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}

export default BoardBar