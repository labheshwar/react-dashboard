import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useState, useEffect } from 'react';

const Bookings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'expired', headerName: 'Expired' },
    {
      field: 'totalCharges',
      headerName: 'Total Charges',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
    },
    {
      field: 'bookingDates',
      headerName: 'Booking Dates',
      flex: 1,
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => callApi(), 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    const response = await fetch('http://192.168.10.24:8042/bookings');
    const data = await response.json();
    const dataArray = data?.map((item, index) => {
      const dates = item?.bookingDates?.map((data) => {
        const date = new Date(data?.bookingDate);
        const formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
      });
      console.log(dates);
      return {
        id: index + 1,
        expired: item?.parkingBookingRecords?.isExpired ? 'Yes' : 'No',
        totalCharges: item?.parkingBookingRecords?.totalParkingCharges,
        location:
          item?.parkingBookingRecords?.parking?.parkingLocation?.slice(0, 20) +
          '...',
        bookingDates: dates.length !== 0 ? dates?.join(', ') : 'N/A',
      };
    });
    setTableData(dataArray);
  };

  return (
    <Box m='20px'>
      <Header title='Parking Bookings' />
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Bookings;
