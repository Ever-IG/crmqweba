import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import dayjs from "dayjs";

function ModalQueja({ handleClose, queja, handleUpdate }) {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    quE_id: "",
    usU_id: "",
    clI_id: "", // Cliente ID
    quE_prioridad: "",
    quE_fecha_queja: "",
    quE_motivo: "",
    quE_estado: "",
    quE_descripcion: "",
  });

  // Cargar lista de clientes al montar el componente
  useEffect(() => {
    fetch("https://localhost:7228/api/Cliente")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar clientes");
        }
        return response.json();
      })
      .then((data) => {
        const clientesConNombre = data.map((cliente) => ({
          ...cliente,
          nombreCompleto: `${cliente.clI_nombre} ${cliente.clI_apellido}`,
        }));
        setClientes(clientesConNombre);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  // Actualizar los datos del formulario si cambia la queja
  useEffect(() => {
    if (queja) {
      setFormData({
        quE_id: queja.quE_id || "",
        usU_id: queja.usU_id || "",
        clI_id: queja.clI_id || "",
        quE_prioridad: queja.quE_prioridad || "",
        quE_fecha_queja: queja.quE_fecha_queja
          ? dayjs(queja.quE_fecha_queja).format("YYYY-MM-DD")
          : "",
        quE_motivo: queja.quE_motivo || "",
        quE_estado: queja.quE_estado || "",
        quE_descripcion: queja.quE_descripcion || "",
      });
    }
  }, [queja]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = queja ? "PUT" : "POST";
      const url = queja
        ? `https://localhost:7228/api/Queja/${queja.quE_id}`
        : "https://localhost:7228/api/Queja";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la queja");
      }

      // Si la respuesta es 204, no intentamos convertirla a JSON
      const updatedQueja =
        response.status === 204 ? formData : await response.json();

      handleUpdate(formData.quE_id || updatedQueja.quE_id, updatedQueja);

      Swal.fire({
        icon: "success",
        title: "Queja guardada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      handleClose();
    } catch (error) {
      console.error("Error al guardar la queja:", error);
      Swal.fire({
        icon: "error",
        title: "Error al guardar la queja",
        text: error.message,
      });
    }
  };

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="text-center mb-4">
        {queja ? "" : ""}
        <hr/>
      </h3>

      <Form.Group controlId="clI_id" className="mt-3">
        <Form.Label>Cliente</Form.Label>
        <Form.Control
          as="select"
          name="clI_id"
          value={formData.clI_id} // Preseleccionar cliente
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.clI_id} value={cliente.clI_id}>
              {cliente.nombreCompleto}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="quE_prioridad" className="mt-3">
        <Form.Label>prioridad</Form.Label>
        <Form.Control
          as="select"
          name="quE_prioridad"
          value={formData.quE_prioridad}
          onChange={handleChange}
          required
          >
          <option value="">Selecciona una prioridad</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </Form.Control>
      </Form.Group>


      <Form.Group controlId="quE_fecha_queja" className="mt-3">
        <Form.Label>Fecha de la queja</Form.Label>
        <Form.Control
          type="date"
          name="quE_fecha_queja"
          value={formData.quE_fecha_queja}
          onChange={handleChange}
          max={today}
        />
      </Form.Group>
      <Form.Group controlId="quE_motivo" className="mt-3">
        <Form.Label>Motivo</Form.Label>
        <Form.Control
          as="select" // Cambiado a 'select'
          name="quE_motivo"
          value={formData.quE_motivo} // Preselecciona el valor devuelto por la API
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un motivo</option>
          <option value="Atencion al cliente">Atención al cliente</option>
          <option value="Insatisfaccion con producto">
            Insatisfacción con producto
          </option>
          <option value="Desacuerdo con resolucion">
            Desacuerdo con resolución
          </option>
          <option value="Insatisfaccion con tiempos de entrega">
            Insatisfacción con tiempos de entrega
          </option>
          <option value="Insatisfaccion por servicio">
            Insatisfacción por servicio
          </option>
          <option value="Discriminacion">Discriminación</option>
          <option value="Experiencia pobre con representante">
            Experiencia pobre con representante
          </option>
          <option value="No escalado cuando solicito">
            No escalado cuando solicito
          </option>
          <option value="Lenguaje inapropiado o maltrato">
            Lenguaje inapropiado o maltrato
          </option>
          <option value="Tiempo en espera">Tiempo en espera</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="quE_estado" className="mt-3">
        <Form.Label>ESTADO</Form.Label>
        <Form.Control
          as="select"
          name="quE_estado"
          value={formData.quE_estado}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un estado</option>
          <option value="Capturada">Capturada</option>
          <option value="Escalada">Escalada</option>
          <option value="Cerrada">Cerrada</option>
          
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="quE_descripcion" className="mt-3">
        <Form.Label>DESCRIPCIÓN</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="quE_descripcion"
          value={formData.quE_descripcion}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </div>
    </Form>
  );
}

export default ModalQueja;
