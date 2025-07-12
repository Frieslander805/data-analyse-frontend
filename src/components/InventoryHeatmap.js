import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function InventoryHeatmap({ data }) {
  // data = [{product, qty},…]
  const maxQty = Math.max(...data.map(i => i.qty), 1);

  return (
    <Grid container spacing={1}>
      {data.map(item => {
        const intensity = Math.round((item.qty / maxQty) * 255);
        const bg = `rgb(255,${255 - intensity},${255 - intensity})`;
        return (
          <Grid item xs={12} sm={6} md={4} lg={3}
                key={item.product}>
            <Paper sx={{ bgcolor: bg, p: 1 }}>
              <Typography variant="body2">{item.product}</Typography>
              <Typography variant="h6">{item.qty}</Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
