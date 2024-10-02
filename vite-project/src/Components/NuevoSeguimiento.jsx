import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';

const dateFormat = 'DD-MM-YYYY'; // Formato de fecha dd-MM-yyyy

const App = () => {
    const [form] = Form.useForm();
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); // para almacenar la opción seleccionada
    const [lista, setLista] = useState([]); // para almacenar la lista de clientes o posibles clientes
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // para almacenar el valor seleccionado

    // Función para obtener clientes desde el API
    const obtenerClientes = () => {
        fetch('https://localhost:7228/api/Cliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setLista(data);
                } else {
                    console.error('Error: Los datos obtenidos no son válidos');
                }
            })
            .catch(error => console.error('Error fetching clients:', error));
    };

    // Función para obtener posibles clientes desde el API
    const obtenerPosiblesClientes = () => {
        fetch('https://localhost:7228/api/PosibleCliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los Posibles Clientes');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setLista(data);
                } else {
                    console.error('Error: Los datos obtenidos no son válidos');
                }
            })
            .catch(error => console.error('Error fetching prospects:', error));
    };

    useEffect(() => {
        // Cargar la lista correcta según la opción seleccionada
        if (opcionSeleccionada === 'clientes') {
            obtenerClientes();
        } else if (opcionSeleccionada === 'posiblesClientes') {
            obtenerPosiblesClientes();
        }

        // Resetear el valor seleccionado cuando se cambie entre clientes y posibles clientes
        setClienteSeleccionado(null);
        form.resetFields(['seleccionaCliente']); // Resetea el campo del select
    }, [opcionSeleccionada, form]);

    const handleReset = () => {
        form.resetFields(); // Resetear todos los campos del formulario
        setOpcionSeleccionada(''); // Limpiar la opción seleccionada
        setClienteSeleccionado(null); // Limpiar el cliente seleccionado
        setLista([]); // Limpiar la lista de clientes/posibles clientes
    };

    // Función para manejar el envío del formulario
    const onFinish = (values) => {
        const data = {
            usU_id: 1, // ID del usuario, se espera que esté definido en los valores del formulario
            clI_id: opcionSeleccionada === 'clientes' ? values.seleccionaCliente : null,
            poC_id: opcionSeleccionada === 'posiblesClientes' ? values.seleccionaCliente :null,
            seG_tipo_seguimiento: values.seG_tipo_seguimiento,
            seG_fecha_seguimiento: dayjs(values.seG_fecha_seguimiento).toISOString(), 
            seG_asunto: values.seG_asunto,
            seG_proposito_llamada: values.seG_proposito_llamada,
            seG_resultado: values.seG_resultado,
            seG_comentario: values.seG_comentario
        };

        fetch('https://localhost:7228/api/Seguimiento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al enviar el seguimiento');
                }
                return response.json();
            })
            .then(() => {
                message.success('Seguimiento enviado exitosamente');
                handleReset(); // Limpiar el formulario después de enviar
            })
            .catch((error) => {
                console.error('Error al enviar el seguimiento:', error);
                message.error('Error al enviar el seguimiento');
            });
    };

    return (
        <Form
            form={form}
            scrollToFirstError
            style={{
                paddingBlock: 20,
            }}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            onFinish={onFinish} // Se llama cuando se envía el formulario
        >
            <Form.Item
                wrapperCol={{
                    offset: 6,
                }}
            >
            </Form.Item>

            <Form.Item label="Tipo de Cliente" name="tipo">
                <Select
                    value={opcionSeleccionada}
                    onChange={(value) => setOpcionSeleccionada(value)}
                    options={[
                        { label: 'Clientes', value: 'clientes' },
                        { label: 'Posibles Clientes', value: 'posiblesClientes' }
                    ]}
                />
            </Form.Item>

            <Form.Item label="Selecciona" name="seleccionaCliente">
                <Select
                    showSearch // Habilita la búsqueda
                    placeholder="Seleccione un cliente" // Placeholder
                    optionFilterProp="children" // Filtra las opciones basadas en su texto
                    filterOption={(input, option) =>
                        option?.label?.toLowerCase().includes(input.toLowerCase()) // Función de filtrado
                    }
                    value={clienteSeleccionado} // Valor controlado
                    onChange={(value) => setClienteSeleccionado(value)} // Cambiar el valor seleccionado
                    options={lista?.map((item) => ({
                        label: opcionSeleccionada === 'clientes' ? item.clI_nombre : item.poC_nombre,
                        value: opcionSeleccionada === 'clientes' ? item.clI_id : item.poC_id
                    }))}
                    disabled={!opcionSeleccionada} // Deshabilitar si no se ha seleccionado un tipo
                />
            </Form.Item>

            <Form.Item
                name="seG_tipo_seguimiento"
                label="Tipo de seguimiento"
                rules={[
                    {
                        required: true,
                        message: 'Por favor selecciona el tipo de seguimiento',
                    },
                ]}
            >
                <Select placeholder="Selecciona un tipo de seguimiento">
                    <Select.Option value="llamada">Llamada</Select.Option>
                    <Select.Option value="correo">Correo</Select.Option>
                    <Select.Option value="visita">Visita</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="seG_fecha_seguimiento"
                label="Fecha de seguimiento"
                rules={[
                    {
                        required: true,
                        message: 'Por favor selecciona una fecha',
                    },
                ]}
            >
                <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item name="seG_asunto" label="Asunto">
                <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="seG_proposito_llamada" label="Proposito de llamada">
                <Input />
            </Form.Item>
            <Form.Item name="seG_resultado" label="Resultado">
                <Input />
            </Form.Item>
            <Form.Item
                name="seG_comentario"
                label="Comentario"
                rules={[
                    {
                        required: true,
                        message: 'Por favor añade un comentario',
                    },
                ]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button danger onClick={handleReset} style={{ marginLeft: 8 }}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default App;
