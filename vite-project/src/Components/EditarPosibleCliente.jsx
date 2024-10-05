import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function EditarPosibleCliente({ posiblecliente, handleUpdate, handleClose }) {
    const [formData, setFormData] = useState({
        poC_nombre: '',
        poC_apellido: '',
        poC_empresa: '',
        poC_nit: '',
        poC_dpi: '',
        poC_correo_electronico: '',
        poC_telefono: '',
        poC_fuente_de_posible_cliente: '',
        poC_estado_de_posible_cliente: '',
        poC_correo_electronico_secundario: '',
        poC_telefono_secundario: '',
        poC_direccion: '',
        poC_departamento: '',
        poC_municipio: '',
        poC_codigo_postal: '',
        poC_pais: '',
        poC_imagenurl: '',
        CVE_id: ''
    });

    useEffect(() => {
        if (posiblecliente) {
            setFormData(posiblecliente);
        }
    }, [posiblecliente]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7228/api/PosibleCliente/${posiblecliente.poC_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (response.status === 204) {
                // Si la respuesta es 204, no hay cuerpo, simplemente actualizamos con formData
                handleUpdate(posiblecliente.poC_id, formData);
                Swal.fire('¡Éxito!', 'Posible cliente actualizado correctamente', 'success');
                handleClose();
            } else if (response.status === 201) {
                const newCliente = await response.json();
                handleUpdate(posiblecliente.poC_id, newCliente); // Actualizar con la nueva información del cliente creado
                Swal.fire('¡Éxito!', 'Posible cliente convertido a cliente correctamente', 'success');
                handleClose();
            } else if (response.ok) {
                const updatedCliente = await response.json();
                handleUpdate(posiblecliente.poC_id, updatedCliente);
                Swal.fire('¡Éxito!', 'Posible cliente actualizado correctamente', 'success');
                handleClose();
            } else {
                throw new Error('Error inesperado en la actualización');
            }
        } catch (error) {
            Swal.fire('Error', 'Hubo un problema al actualizar el posible cliente', 'error');
        }
    };
    

    
    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_nombre"
                    value={formData.poC_nombre}
                    onChange={handleChange}
                    required
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_apellido"
                    value={formData.poC_apellido}
                    onChange={handleChange}
                    required
                />
            </div>
    
            <div className="col-md-12">
                <label className="form-label">Empresa</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_empresa"
                    value={formData.poC_empresa}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">NIT</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_nit"
                    value={formData.poC_nit}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">DPI</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_dpi"
                    value={formData.poC_dpi}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Correo Electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    name="poC_correo_electronico"
                    value={formData.poC_correo_electronico}
                    onChange={handleChange}
                    required
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_telefono"
                    value={formData.poC_telefono}
                    onChange={handleChange}
                    pattern="[0-9]{8}"
                    title="Número de teléfono de 8 dígitos"
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Fuente de Posible Cliente</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_fuente_de_posible_cliente"
                    value={formData.poC_fuente_de_posible_cliente}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Estado de Posible Cliente</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_estado_de_posible_cliente"
                    value={formData.poC_estado_de_posible_cliente}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Correo Electrónico Secundario</label>
                <input
                    type="email"
                    className="form-control"
                    name="poC_correo_electronico_secundario"
                    value={formData.poC_correo_electronico_secundario}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Teléfono Secundario</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_telefono_secundario"
                    value={formData.poC_telefono_secundario}
                    onChange={handleChange}
                    pattern="[0-9]{8}"
                    title="Número de teléfono de 8 dígitos"
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Dirección</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_direccion"
                    value={formData.poC_direccion}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Departamento</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_departamento"
                    value={formData.poC_departamento}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Municipio</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_municipio"
                    value={formData.poC_municipio}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">Código Postal</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_codigo_postal"
                    value={formData.poC_codigo_postal}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-md-6">
                <label className="form-label">País</label>
                <input
                    type="text"
                    className="form-control"
                    name="poC_pais"
                    value={formData.poC_pais}
                    onChange={handleChange}
                />
            </div>
    
            <div className="col-12 d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                <button type="button" className="btn btn-danger ms-2" onClick={handleClose}>Cancelar</button>
            </div>
        </form>
    );
    
}

export default EditarPosibleCliente;
