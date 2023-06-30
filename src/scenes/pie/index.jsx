import { Box } from '@mui/material';
import Header from '../../components/Header';
import PieChart from '../../components/PieChart';
import { useState, useEffect } from 'react';
import { DASHBOARD_API } from './../../constants';

const Pie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => callApi(), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    const response = await fetch(DASHBOARD_API);
    const data = await response.json();
    setData(data);
  };
  return data ? (
    <Box m='20px'>
      <Header title='Pie Chart' subtitle='Simple Pie Chart' />
      <Box height='75vh' style={{ display: 'flex' }}>
        <PieChart
          title='Users'
          data={{
            label1: 'users',
            value1: data.totalUsers,
            label2: 'hosts',
            value2: data.totalHosts,
          }}
        />
        <PieChart
          title='Parking Bookings'
          data={{
            label1: 'expired',
            value1: data.expiredBookings,
            label2: 'not expired',
            value2: data.totalBookings - data.expiredBookings,
          }}
        />
      </Box>
    </Box>
  ) : null;
};

export default Pie;
