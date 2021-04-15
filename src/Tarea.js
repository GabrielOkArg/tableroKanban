import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { faArrowRight, faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tolltip from 'react-bootstrap/Tooltip';

export default class Tarea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            estado: '',
            descripcion: '',
            id: this.props.id,
            zona: this.props.zona
        }
        this.ubication = this.ubication.bind(this);
        this.handleChangeZone = this.handleChangeZone.bind(this);
    }

    handleChangeZone = (e) => {

        var zone = this.state.zona;
        var id = this.state.id;
        this.props.sendData(zone, id);
    }

    handleChangeZoneL = (e) => {

        var zone = this.state.zona;
        var id = this.state.id;
        var left = true;
        this.props.sendData(zone, id, left);
    }

    render() {
        return (
            <React.Fragment>
                <Card id={this.state.id} className="cardItem" >
                    <Card.Header style={{ lineHeight: '16px' }}>
                        {this.ubication(this.state.zona)}
                    </Card.Header>
                    <Card.Body>
                        <span>{this.state.descripcion}</span>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
    componentDidMount() {
        this.setState({ descripcion: this.props.des });

    }


    ubication(zona) {
        if (zona == "process") {
            return (<div>

                <div>
                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tolltip id={'idas'} >Avanzar</Tolltip>}>
                        <span style={{ float: 'right' }}>
                            <FontAwesomeIcon className="arrowIcon" icon={faArrowRight} onClick={this.handleChangeZone}></FontAwesomeIcon>
                        </span>
                    </OverlayTrigger>
                </div>
                <OverlayTrigger key={'top'} placement={'top'} overlay={<Tolltip id={'idas1'} style={{ float: 'left' }}>Volver</Tolltip>}>
                    <span>
                        <FontAwesomeIcon className="arrowIconR" icon={faArrowLeft} onClick={this.handleChangeZoneL}></FontAwesomeIcon>
                    </span>
                </OverlayTrigger>
            </div>)
        }
        else {
            if (zona === "done") {
                return (
                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tolltip id={'idas'} >Borrar</Tolltip>}>
                        <span style={{ float: 'right' }}>
                            <FontAwesomeIcon className="arrowIcon" icon={faTimesCircle} onClick={this.handleChangeZoneL}></FontAwesomeIcon>
                        </span>
                    </OverlayTrigger>)
            }
            else {
                return (
                    <OverlayTrigger key={'top'} placement={'top'} overlay={<Tolltip id={'idas'} >Avanzar</Tolltip>}>
                        <span style={{ float: 'right' }}>
                            <FontAwesomeIcon className="arrowIcon" icon={faArrowRight} onClick={this.handleChangeZone}></FontAwesomeIcon>
                        </span>
                    </OverlayTrigger>
                )
            }
        }
    }
}