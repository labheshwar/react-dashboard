import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { PARKING_API } from '../../constants';

const Parkings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'location',
      headerName: 'Locaton',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      flex: 1,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      flex: 1,
    },
    {
      field: 'charges',
      headerName: 'Charges',
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          Rs. {params.row.charges}
        </Typography>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
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
    const response = await fetch(PARKING_API);
    const data = await response.json();
    const dataArray = data.map((item, index) => {
      const date = new Date(item?.createDate);
      const formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      return {
        id: index + 1,
        location: item?.parkingLocation?.slice(0, 20) + '...',
        latitude: item?.latitude,
        longitude: item?.longitude,
        charges: 182,
        date: formattedDate,
      };
    });
    setTableData(dataArray);
  };
  return (
    <Box m='20px'>
      <Header title='Parkings' />
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
          checkboxSelection
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Parkings;
