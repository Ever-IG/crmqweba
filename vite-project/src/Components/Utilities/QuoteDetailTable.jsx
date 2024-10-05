import React, { useState } from 'react';
import CustSelect from './CustSelect';

const QuoteDetailTable = () => {
  const [items, setItems] = useState([
    { id: 1, name: '', 
      quantity: 1, 
      unitPrice: 0, 
      discount: 0,
      discounttype: 0,
      total: 0 }
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    
    // Recalcular el total de la fila
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, name: '', quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

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
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)} 
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
                  onChange={(e) => handleItemChange(index, 'discounttype', parseFloat(e.target.value) || 0)} 
                >
                  <option value="1">Directo</option>
                  <option value="2">Porcentaje</option>
                </select>
              </td>
              <td>{item.total.toFixed(2)}</td>
              <td>
                <button 
                  className="btn btn-danger" 
                  onClick={() => removeItem(index)}>
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={addItem}>
        Agregar Producto/Servicio
      </button>
      <h3 className="mt-4">Total Cotización: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default QuoteDetailTable;
