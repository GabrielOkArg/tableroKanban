import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Tarea from './Tarea';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default class Tablero extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            des1: this.props.des1,
            descripcion: this.props.des,
            des2: this.props.des2,
            ArrayFase1: [],
            ArrayFase2: [],
            ArrayFase3: [],
            zona: '',
            ButtonTask: 'Nueva tarea',
            ButtonVariant: 'primary',
            desc_new_taks: ''
        }
        this.handleSelectedZone = this.handleSelectedZone.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handlewAddTarea = this.handlewAddTarea.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
    }

    handleSelectedZone = (ZoneValue, id, left) => {
        this.Avanzar(ZoneValue, id, left)
    }
    handleNew() {
        if (this.state.ButtonTask === 'Cancelar') {
            document.getElementById("formNew").style.display = 'none';
            this.setState({ ButtonTask: 'Nueva tarea' });
            this.setState({ ButtonVariant: 'primary' })
        }
        else {
            document.getElementById("formNew").style.display = 'block';
            this.setState({ ButtonTask: 'Cancelar' });
            this.setState({ ButtonVariant: 'secondary' })
        }
    }

    handlewAddTarea = (e) => {
        e.preventDefault();
        var newState = this.state.ArrayFase1;
        newState.push(this.state.desc_new_taks);
        this.handleNew();
        this.setState({ ArrayFase1: newState });
    }

    handleDescription = (e) => {
        var text = e.target.value;
        this.setState({ desc_new_taks: text });
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="encabezado">
                        <div style={{ justifyContent: 'center' }}>
                            <h1 style={{ color: 'white' }}>Tablero Kanban</h1>
                        </div>
                    </Row>
                    <Row className="RowNew">
                        <Col sm={4}>
                            <Button id="tareanueva" className="buttonNewitem" variant={this.state.ButtonVariant} onClick={this.handleNew}>{this.state.ButtonTask}</Button>
                            <div hidden={this.state.openmodal_} id="formNew">
                                <Form onSubmit={this.handlewAddTarea}>
                                    <Form.Group>
                                        <Form.Label style={{color:'white'}}>Agregue la descripción para la tarea</Form.Label>
                                        <Form.Control required as="textarea" row={4} onChange={this.handleDescription}></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type="submit">Guardar</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row className="rowCards">
                        <Col id='todo' className="columnaEstado">
                            <div style={{ textAlign:'center' }}>
                                <h2 style={{ color: 'white' }}>Sin realizar</h2>
                            </div>
                            {
                                this.state.ArrayFase1.map((item, i) => {
                                    return (<Tarea des={item} id={i} zona="todo" sendData={this.handleSelectedZone}></Tarea>)
                                })
                            }
                        </Col>

                        <Col id='process' className="columnaEstado">
                            <div style={{ textAlign:'center' }}>
                                <h2 style={{ color: 'white' }}>En proceso</h2>
                            </div>
                            {
                                this.state.ArrayFase2.map((item, i) => {
                                    return (<Tarea des={item} id={i} zona="process" sendData={this.handleSelectedZone} ></Tarea>)
                                })
                            }
                        </Col>
                        <Col id='done' className="columnaEstado">
                            <div style={{ textAlign:'center' }}>
                                <h2 style={{ color: 'white' }}>Realizado</h2>
                            </div>
                            {
                                this.state.ArrayFase3.map((item, i) => {
                                    return (<Tarea des={item} id={i} zona="done" sendData={this.handleSelectedZone}></Tarea>)
                                })
                            }
                        </Col>
                    </Row>
                    <Row  className="columnaEstado">
                        <div className="footer">
                            <span>Click sobre las flechas para avanzar las tareas</span>
                        </div>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
    componentDidMount() {

        this.setState({ ArrayFase1: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", "Segundo elemento", "tercer elemento"] });
        this.setState({ ArrayFase2: ["primer elemento", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", "tercer elemento"] });
        this.setState({ ArrayFase3: ["primer elemento", "Segundo elemento", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "] });

    }

    Avanzar(zone, id, left) {
        if (zone == "todo") {
            var newVector = this.state.ArrayFase2;
            newVector.push(this.state.ArrayFase1[id]);
            this.setState({ ArrayFase2: newVector });
            var vectoraux = this.state.ArrayFase1;
            vectoraux.pop(this.state.ArrayFase1[id]);
            this.setState({ ArrayFase1: vectoraux });
        }
        if (zone == "process" && left != true) {
            var newVector = this.state.ArrayFase3;
            newVector.push(this.state.ArrayFase2[id]);
            this.setState({ ArrayFase3: newVector });
            var vectoraux = this.state.ArrayFase2;
            vectoraux.pop(this.state.ArrayFase2[id]);
            this.setState({ ArrayFase2: vectoraux });
        }
        if (zone == "process" && left == true) {
            var newVector = this.state.ArrayFase1;
            newVector.push(this.state.ArrayFase2[id]);
            this.setState({ ArrayFase1: newVector });
            var vectoraux = this.state.ArrayFase2;
            vectoraux.pop(this.state.ArrayFase2[id]);
            this.setState({ ArrayFase2: vectoraux });
        }
        if (zone == "done") {
            var newVector = this.state.ArrayFase3;
            newVector.pop(this.state.ArrayFase3[id]);
            this.setState({ ArrayFase3: newVector });
        }
    }
}