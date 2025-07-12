// src/pages/costs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CostChart from '../components/CostChart';

export default function CostsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/costs')
      .then(res => {
        // res.data.top3 = [{product, cost}, ...]
        setData(res.data.top3);
      })
      .catch(() => setError('Cost data ophalen mislukt'));
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: 20 }}>{error}</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cost Analysis</h1>
      <CostChart data={data} />
    </div>
  );
}
