// src/pages/forecast.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ForecastChart from '../components/ForecastChart'

export default function ForecastPage() {
  const [hist, setHist] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8000/forecast')
      .then(res => {
        // res.data.historical is een object { date: qty, … }
        const histObj = res.data.historical || {}
        const arr = Object.entries(histObj).map(([date, qty]) => ({
          date,
          qty
        }))
        setHist(arr)
      })
      .catch(() => setError('Forecast data ophalen mislukt'))
  }, [])

  if (error) {
    return <div style={{ color: 'red', padding: 20 }}>{error}</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sales Forecast</h1>
      <ForecastChart data={hist} />
    </div>
  )
}
