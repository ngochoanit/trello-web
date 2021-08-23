import React from 'react'
import './AppBar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import trelloappLogo from 'Resources/images/logo512.png'
AppBar.propTypes = {}

function AppBar(props) {
    return (
        <nav className="navbar-app">
            <BootstrapContainer className="trello-app-container">
            <Row>
                <Col sm={5} xs={12}className="col-no-padding">
                    <div className="app-action">
                        <div className="item all"><i className="fa fa-th"></i></div>
                        <div className="item home"><i className="fa fa-home"></i></div>
                        <div className="item boards"><i className="fa fa-columns"></i>&nbsp;&nbsp;<strong>Boards</strong></div>
                        <div className="item search">
                            <InputGroup className="group-search">
                                <FormControl className="input-search" placeholder="Jumpto..">
                                </FormControl>
                                <InputGroup.Text className="input-icon-search"><i className="fa fa-search"></i>
                                    </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>
                </Col>
                <Col sm={2} xs={12} className="col-no-padding">
                    <div className="app-branding text-center">
                        <a href="https://www.facebook.com/pnh.it/" target="blank">
                            <img src={ trelloappLogo } className="top-logo" alt="trello-app-logo"></img>
                            <span className="trello-app-slogan">Trello App</span>
                        </a>
                    </div>
                </Col>
                <Col sm={5} xs={12} className="col-no-padding">
                    <div className="user-action">
                        <div className=" item quick"><i className="fa  fa-plus-square-o"></i></div>
                        <div className=" item news"><i className="fa fa-info-circle"></i></div>
                        <div className=" item notification"><i className="fa  fa-bell-o"></i></div>
                        <div className=" item user-avatar">
                            <img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/94541117_2709832912475906_8713513338115457024_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=_qexZer0UmAAX-rLh64&_nc_ht=scontent.fhan5-2.fna&oh=47f1fca1cb8783231088d6b542e3267f&oe=61485244" alt="Pham Ngoc Hoan" title="Pham Ngoc Hoan Avatar"></img>
                        </div>
                    </div>
                </Col>
            </Row>
            </BootstrapContainer>
        </nav>
    )
}

export default AppBar
