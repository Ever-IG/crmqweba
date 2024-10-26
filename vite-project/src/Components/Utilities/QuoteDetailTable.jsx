import React, { useState, useEffect } from 'react';
import CustSelect from './CustSelect';

const QuoteDetailTable = ({ onDetailDataChange }) => {
  const [items, setItems] = useState([
    { id: 0, name: "", 
      quantity: 1, 
      unitPrice: 0, 
      discount: 0,
      discounttype: "Directo",
      total: 0 }
  ]);

//const [items, setItems] = useState([]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    
    // Recalcular el total de la fila
    var Discount = 0;
    switch (updatedItems[index].discounttype){
      case "Directo": Discount = updatedItems[index].discount; break;
      case "Porcentaje": Discount = updatedItems[index].quantity * updatedItems[index].unitPrice*(updatedItems[index].discount/100); break;
    }
    
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice - Discount;
    
    setItems(updatedItems);
  };

  const handleCustSelectChange = (e) => {
    //console.log("*** Entro a handle de QuoteDetailTable con: " + e.target.id + "; " + e.target.name + "; " + e.target.value);
    handleItemChange(e.target.id, e.target.name, e.target.value);
  }

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, name: 0, quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  // Usar useEffect para notificar al padre sobre los cambios en un ítem en específico
  useEffect(() => {
    if (onDetailDataChange) {
      // Pasar el primer item de ejemplo; puedes adaptar esto para que maneje varios ítems
      onDetailDataChange(items); // Pasando el primer item a modo de ejemplo
    }
  }, [items]);

  return (
    <div className="util-container mt-4">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Servicio</th>
            <th>Cantidad</th>
            <th>Precio U.</th>
            <th>Descuento</th>
            <th>Tipo Desc.</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>                
                <CustSelect
                  className="form-control"
                  info="Servicios"
                  value={item.name} 
                  name="name"
                  itemindex = {index}
                  onChange={handleCustSelectChange} 
                  />
              </td>
              <td>
                <input 
                  type="number" 
                  className="form-control" 
                  value={item.quantity} 
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)} 
                />
              </td>
              <td>
                <input 
                  type="number" 
                  className="form-control" 
                  value={item.unitPrice} 
                  onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} 
                />
              </td>
              <td>
                <input 
                  type="number" 
                  className="form-control" 
                  value={item.discount} 
                  onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)} 
                />
              </td>
              <td>
                <select 
                  className="form-control" 
                  value={item.discounttype} 
                  onChange={(e) => handleItemChange(index, 'discounttype', e.target.value)} 
                >
                  <option value="Directo">Directo</option>
                  <option value="Porcentaje">Porcentaje</option>
                </select>
              </td>
              <td>{item.total.toFixed(2)}</td>
              <td>
                <button 
                  className="btn btn-danger" 
                  onClick={() => removeItem(index)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn btn-primary" onClick={addItem}>
        Agregar   Servicio
      </div>
      <h3 className="mt-4">Total Cotización: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default QuoteDetailTable;
