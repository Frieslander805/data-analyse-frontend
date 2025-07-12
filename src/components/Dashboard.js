"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import ParetoChart       from "./ParetoChart";
import StackedCostChart  from "./StackedCostChart";
import InventoryHeatmap  from "./InventoryHeatmap";
import ForecastBandChart from "./ForecastBandChart";

import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [profitData, setProfitData] = useState([]);
  const [costData, setCostData]       = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [forecastData, setForecastData]   = useState({
    historical: [], next: 0, peak: null
  });
  const [tab, setTab]       = useState(0);
  const [error, setError]   = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/profile/"),
      axios.get("http://localhost:8000/profit"),
      axios.get("http://localhost:8000/costs"),
      axios.get("http://localhost:8000/inventory"),
      axios.get("http://localhost:8000/forecast")
    ])
    .then(([profRes, prRes, coRes, invRes, foRes]) => {
      // PROFILE
      setProfile(profRes.data);

      // PROFIT → backend geeft array [{product,profit},…]
      setProfitData(prRes.data.all_profits || []);

      // COSTS → backend geeft array [{product,cost},…]
      setCostData(
        (coRes.data.all_costs || []).map(item => ({
          product: item.product,
          purchaseCost: item.cost,
          storageCost: 0
        }))
      );

      // INVENTORY → backend geeft [{product,qty},…]
      setInventoryData(invRes.data.inventory || []);

      // FORECAST → backend geeft [{date,qty},…]
      setForecastData({
        historical: foRes.data.historical || [],
        next: foRes.data.forecast.next,
        peak: foRes.data.peak_day
      });
    })
    .catch(err => {
      console.error(err);
      setError("Data ophalen mislukt (console voor details).");
    });
  }, []);

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  if (!profile) {
    return (
      <Box p={2}>
        <Typography>Laden…</Typography>
      </Box>
    );
  }

  // KPI‐values
  const omzet       = profile.total_sales  ?? 0;
  const winst       = profile.total_profit ?? 0;
  const kosten      = profile.total_cost   ?? 0;
  const brutomargeP = omzet > 0
    ? ((winst / omzet) * 100).toFixed(1)
    : "0.0";

  return (
    <Box p={2}>
      {/* KPI Cards */}
      <Box display="flex" gap={2} mb={3}>
        {[["Omzet", omzet], ["Winst", winst], ["Kosten", kosten]].map(([label, val]) => (
          <Card key={label}>
            <CardContent>
              <Typography variant="subtitle2">{label}</Typography>
              <Typography variant="h6">€{val.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Brutomarge</Typography>
            <Typography variant="h6">{brutomargeP}%</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="PROFIT" />
        <Tab label="COSTS" />
        <Tab label="INVENTORY" />
        <Tab label="FORECAST" />
      </Tabs>

      {/* Tab Content */}
      <Box mt={3}>
        {tab === 0 && <ParetoChart data={profitData} />}
        {tab === 1 && <StackedCostChart data={costData} />}
        {tab === 2 && <InventoryHeatmap data={inventoryData} />}
        {tab === 3 && (
          <ForecastBandChart
            data={forecastData.historical}
            next={forecastData.next}
            peak={forecastData.peak}
          />
        )}
      </Box>
    </Box>
  );
}
