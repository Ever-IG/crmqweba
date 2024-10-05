import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustSelect from './Utilities/CustSelect';
import { ToastContainer, toast } from 'react-toastify';
import FormItemInput from 'antd/es/form/FormItemInput';
import {Form, Button, FormGroup} from 'react-bootstrap';
import QuoteDetailTable from './Utilities/QuoteDetailTable';

const Cotizacion = () => {

    const now = new Date();

    const [formData, setFormData] = useState({
        cOT_Numero: 0,
        cOT_fecha_cotizacion: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        cOT_fecha_vencimiento: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()+5}`,
        cOT_total: 0,
        cOT_estado: ''  
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {};
    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return(
        <div className='NuevoCliente'>
            <div className="form-container">
                <ToastContainer />
                <h2 className="mb-4">Cotización</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3" id='masterCot'>
                        <div className='row bottom-padding'>
                            <Form.Group className='col-md-4'>
                                <Form.Label>Numero</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cOT_Numero"
                                    value={formData.cOT_Numero}
                                    onChange={handleChange}
                                    min = "0"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='col-md-4'>
                            <Form.Label>Fecha Cotización</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="cOT_fecha_cotizacion"
                                    value={formData.cOT_fecha_cotizacion}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='col-md-4'>
                                <Form.Label>Fecha Vencimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="cOT_fecha_vencimiento"
                                    value={formData.cOT_fecha_vencimiento}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </div>                        
                        <div className="row bottom-padding">
                            <Form.Group className='col-md-8'>
                                <Form.Label>Cliente</Form.Label>
                                <CustSelect name='Cliente'></CustSelect>
                            </Form.Group>
                        </div>
                        <div className="row bottom-padding">
                            <Form.Group className='col-md-12'>
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cOT_asunto"
                                    value={formData.cOT_asunto}
                                    onChange={handleChange}
                                    required
                                />                                
                            </Form.Group>
                        </div>
                        <div className='row bottom-padding'>
                            <FormGroup className='col-md-6'>
                                <Form.Label>Total</Form.Label>
                                <Form.Control
                                        type="text"
                                        name="cOT_asunto"
                                        value={formData.cOT_total}
                                        onChange={handleChange}
                                        readOnly
                                    /> 
                            </FormGroup>
                            <FormGroup className='col-md-6'>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                        type="text"
                                        name="cOT_estado"
                                        value={formData.cOT_estado}
                                        onChange={handleChange}
                                        readOnly
                                    /> 
                            </FormGroup>
                        </div>
                    </div>                                        
                    <div className="row bottom-padding" id='detailCot'>
                        <h2 className="mb-4">Detalle</h2>
                        <QuoteDetailTable />
                    </div>
                </form>
            </div>
        </div>
    );

};

export default Cotizacion;