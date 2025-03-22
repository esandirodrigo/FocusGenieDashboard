import * as React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import "./Table.css";

export default function DescriptionAlerts() {
  return (
    <div className="Pie">
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Lighting</AlertTitle>
        Ideal brightness level detected.
      </Alert>
      <Alert severity="info">
        <AlertTitle>Noise</AlertTitle>
        Moderate noise detected.
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Temperature</AlertTitle>
        Extreme temperature detected.
      </Alert>
      
    </Stack>
    </div>
  );
 
}