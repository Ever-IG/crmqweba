import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//const options = [];

const CustSelect = (props) => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    var apiurl = "";

    // Agregar aquí las opciones de API.
    // Hacer lo mismo en el otro switch más adelante para hacer el map del resultado.
    switch (props.info){
      case "Clientes":
        apiurl = "https://localhost:7228/api/Cliente";
        break;
      case "Servicios":
        apiurl = "https://localhost:7228/api/Servicio";
        break;
      default:
        apiurl = "https://localhost:7228/api/Cliente";
    }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(apiurl);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log('API Response:', result);
          //setData(result);

          // Agregar aquí las opciones para el mapeo del resultado.
          switch (props.info){
            case 'Clientes':
              setOptions(result.map(item => ({ value: item.clI_id, label: item.clI_nombre + " " +  item.clI_apellido })));
              console.log('Options Array:', result.map(item => ({ value: item.clI_id, label: item.clI_nombre + " " +  item.clI_apellido })));
              break;
              case 'Servicios':
                setOptions(result.map(item => ({ value: item.sER_id, label: item.seR_nombre })));
                console.log('Options Array:', result.map(item => ({ value: item.sER_id, label: item.seR_nombre })));
                break;
            default:
              setOptions(result.map(item => ({ value: item.clI_id, label: item.clI_nombre + " " +  item.clI_apellido })));
              console.log('Options Array:', result.map(item => ({ value: item.clI_id, label: item.clI_nombre + " " +  item.clI_apellido })));
          }
          
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

    }, []);

  return (
    <select className='form-select' 
            value={selectedOption} 
            onChange={event => setSelectedOption(event.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustSelect;  