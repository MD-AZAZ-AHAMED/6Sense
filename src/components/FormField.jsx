import React, { useState } from 'react';

const DynamicForm = () => {
  const [formData, setFormData] = useState([{ input: '', select: '' }]);
  const [errors, setErrors] = useState([{ input: '', select: '' }]);

  const handleChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const addRow = () => {
    setFormData([...formData, { input: '', select: '' }]);
    setErrors([...errors, { input: '', select: '' }]);
  };

  const deleteRow = (index) => {
    const newData = formData.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setFormData(newData);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = formData.map((data) => ({
      input: data.input ? '' : 'Input is required',
      select: data.select ? '' : 'Select is required',
    }));
    setErrors(newErrors);

    const hasErrors = newErrors.some((err) => err.input || err.select);
    if (!hasErrors) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {formData.map((data, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ marginRight: '15px', flex: 1 }}>
              <input
                type="text"
                placeholder="Enter text"
                value={data.input}
                onChange={(e) => handleChange(index, 'input', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
              {errors[index].input && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '12px' }}>{errors[index].input}</p>}
            </div>
            <div style={{ marginRight: '15px', flex: 1 }}>
              <select
                value={data.select}
                onChange={(e) => handleChange(index, 'select', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', backgroundColor: '#fff' }}
              >
                <option value="">Select option</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
              {errors[index].select && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '12px' }}>{errors[index].select}</p>}
            </div>
            <button
              type="button"
              onClick={() => deleteRow(index)}
              style={{ padding: '8px 12px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          style={{ padding: '8px 12px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', marginBottom: '15px' }}
        >
          + Add Row
        </button>
        <br />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Submit</button>
      </form>
      <div>
        <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>Form State</h2>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Row</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Input</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{index + 1}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{data.input}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{data.select}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicForm;