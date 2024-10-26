import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustSelect from './Utilities/CustSelect';
import { ToastContainer, toast } from 'react-toastify';
import FormItemInput from 'antd/es/form/FormItemInput';
import {Form, Button, FormGroup} from 'react-bootstrap';
import QuoteDetailTable from './Utilities/QuoteDetailTable';
import Swal from 'sweetalert2';

const NuevaCotizacion = () => {

    const now = new Date();

    const [formData, setFormData] = useState({
        cOT_id: 0,
        cOT_Numero: '',
        cOT_fecha_cotizacion: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 2}`,
        cOT_fecha_vencimiento: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 5}`,
        uSU_ID: 1,
        cLI_ID: 0,
        cOT_asunto: '',
        cOT_total: 0,
        cOT_estado: 'Ingresada'  
    });

    const [detData, setDetData] = useState({
        dET_id: 0,
        cOT_id: 0,
        sER_id: 0,
        dET_cantidad: 0,
        dET_precio: 0,
        dET_descuento: 0,
        dET_tipo_descuento: "",
        dET_subtotal: 0
    });

    const [detDataApi, setDetDataApi] = useState({
        cOT_id: 0,
        dET_id: 0,
        detalleCotizacion: [
          {
            sER_id: 0,
            dET_cantidad: 0,
            dET_precio: 0,
            dET_descuento: 0,
            dET_tipo_descuento: "Directo",
            dET_subtotal: 0
          }
        ]      
    });

    const navigate = useNavigate();

    //const handleSubmit = (e) => {};

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });     
    };

    const handleCancel = (e) => {};

    /*
    const handleDetChange = (DetState) => {
        const updatedData = DetState.data.map(item =>
            ({
                dET_id: 0,
                cOT_id: formData.cOT_id,
                sER_id: item.id,
                dET_cantidad: item.quantity,
                dET_precio: item.unitPrice,
                dET_descuento: item.discount,
                dET_tipo_descuento: item.discounttype,
                dET_subtotal: item.total
            })
          );
          setData(updatedData);
    };
    */

    const handleDetailDataChange = (items) => {
        const newDetData = items.map(item => (
            { 
              sER_id: item.name, // O el campo que corresponda
              dET_cantidad: item.quantity,
              dET_precio: item.unitPrice,
              dET_descuento: item.discount,
              dET_tipo_descuento: item.discounttype,
              dET_subtotal: item.total
            }));
        setDetData(newDetData);
        setDetDataApi(
            {
                cOT_id: 0,
                dET_id: 0,
                detalleCotizacion: newDetData
            }
        );
        //console.log('Datos actualizados en el padre:', detData); // Verificar el resultado
            formData.cOT_total = accumulate(newDetData);            
      };

      function accumulate(arr) {
        let result = 0;
        for (let i = 0; i < arr.length; i++) {
          result = result + arr[i].dET_subtotal;
        }
        return result;
      }

      const calculateTotal = () => {        
        //return detData.reduce((acc,item) => acc + item.dET_subtotal,0);        
        return accumulate(detData);
      };

      

    // Manejar la creación de la cotizacion
    const handleSubmit = (e) => {
        e.preventDefault();



        // Validar que los campos obligatorios estén completos
        /*
        if (!newCliente.CLI_nombre || !newCliente.CLI_correo_electronico) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nombre y correo electrónico son campos obligatorios!",
              });
            return; 
        }
            */
        
    /*    
    const clienteConValoresPorDefecto = {
        ...newCliente,
        CVE_id: newCliente.CVE_id || 1, 
    };
    */

    console.log('Datos a enviar:', formData);
    console.log('Detalle a enviar: ', detDataApi);

        // Crear nueva cotizacion
        fetch('https://localhost:7228/api/Cotizacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error('Error al agregar cotizacion');                
            }            
            return response.json();
        })
        .then(data => {               
            
            detDataApi.cOT_id = data.coT_id;
                
                console.log("***STRINGIFY*****:" + JSON.stringify(detDataApi));

                // Insertar detalle de cotización
         
                    fetch('https://localhost:7228/api/DetalleCotizacion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(detDataApi)
                    })
                    .then(response => {
                        if (!response.ok) {
                            console.log(response);
                            throw new Error('Error al agregar detalle de cotizacion');                
                        }
                        return response.json();
                    })        
                    .catch(error => {
                        console.error('Error al agregar el detalle de la cotización:' + error, error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Ocurrió un error al agregar el detalle de la cotizacion!"
                        });
                    });

            setFormData({
                cOT_id: 0,
                cOT_Numero: 0,
                cOT_fecha_cotizacion: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 0}`,
                cOT_fecha_vencimiento: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 5}`,
                uSU_ID: 0,
                cLI_ID: 0,
                cOT_asunto: '',
                cOT_total: 0,
                cOT_estado: '' 
            });
            setDetData({
                dET_id: 0,
                cOT_id: 0,
                sER_id: 0,
                dET_cantidad: 0,
                dET_precio: 0,
                dET_descuento: 0,
                dET_tipo_descuento: "Directo",
                dET_subtotal: 0
            });
            setDetDataApi({
                cOT_id: 0,
                dET_id: 0,
                detalleCotizacion: [
                  {
                    sER_id: 0,
                    dET_cantidad: 0,
                    dET_precio: 0,
                    dET_descuento: 0,
                    dET_tipo_descuento: "Directo",
                    dET_subtotal: 0
                  }
                ]      
            });
            /*
            Swal.fire({
                title: "Excelente!",
                text: "Cotizacion agregada correctamente!",
                icon: "success"
              });
            */
        })
        .catch(error => {
            console.error('Error al agregar la cotización:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al agregar la cotizacion!"
              });
        });        
        Swal.fire({
            title: "Excelente!",
            text: "Cotizacion agregada correctamente!",
            icon: "success"
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
                        <Form.Control
                            type="hidden"
                            name="cOT_id"
                            value={formData.cOT_id}
                            onChange={handleChange}
                        />
                            <Form.Group className='col-md-4'>
                                <Form.Label>Numero</Form.Label>
                                <Form.Control
                                    type="text"
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
                                <CustSelect 
                                    name="cLI_ID"
                                    value={formData.cLI_ID}
                                    onChange={handleChange}
                                    required
                                />
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
                                        type="number"
                                        name="cOT_total"
                                        value={formData.cOT_total}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        disabled
                                    /> 
                            </FormGroup>
                            <FormGroup className='col-md-6'>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                        type="text"
                                        name="cOT_estado"
                                        value={formData.cOT_estado}
                                        onChange={handleChange}
                                        
                                    /> 
                            </FormGroup>
                        </div>
                    </div>                                        
                    <div className="row bottom-padding" id='detailCot'>
                        <h2 className="mb-4">Detalle</h2>
                        <QuoteDetailTable
                            onDetailDataChange={handleDetailDataChange} />
                    </div>
                    <div className="row bottom-padding"> 
                        {/* Div para los botones fijos */}
                        <div> {/*className="fixed-bottom-button"*/}
                        <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                            Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary"
                            style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}>
                                Agregar
                            </button>
                        </div>
                    </div>                    
                </form>
            </div>
        </div>
    );

};

export default NuevaCotizacion;