import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
  Bar,
} from 'recharts';
import { useQuery } from '@apollo/client';
import { BEST_CLIENTS } from '@/graphql/reports';
import { CircularProgress } from '@material-ui/core';
import { NotSignIn } from '../layout/AuthLayout';

export default function ChartClient() {
  const theme = useTheme();
  const { data, loading, error } = useQuery(BEST_CLIENTS);
  const clienteGrafica = [];

  if (loading) return <CircularProgress />;
  if (error) return <NotSignIn />;

  data.mejoresClientes.map((cliente, index) => {
    clienteGrafica[index] = {
      ...cliente.cliente[0],
      total: cliente.total.toFixed(2),
    };
  });

  return (
    <React.Fragment>
      <ResponsiveContainer width={'100%'} height={500}>
        <BarChart
          data={clienteGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
