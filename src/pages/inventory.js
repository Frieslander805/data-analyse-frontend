// src/pages/inventory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InventoryChart from '../components/InventoryChart';

export default function InventoryPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/inventory')
      .then(res => {
        // res.data.inventory = { product: qty, ... }
        const arr = Object.entries(res.data.inventory).map(
          ([product, qty]) => ({ product, qty })
        );
        setData(arr);
      })
      .catch(() => setError('Inventory data ophalen mislukt'));
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: 20 }}>{error}</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Inventory Analysis</h1>
      <InventoryChart data={data} />
    </div>
  );
}
