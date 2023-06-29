import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import PeopleAlt from '@mui/icons-material/PeopleAltOutlined';
import GroupAdd from '@mui/icons-material/GroupAddOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import StatBox from '../../components/StatBox';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dashboardData, setDashboardData] = useState(null);
  const [parkingData, setParkingData] = useState(null);

  useEffect(() => {
    callDashboardApi();
    callParkingApi();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      callDashboardApi();
      callParkingApi();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const callDashboardApi = async () => {
    try {
      const response = await fetch(
        'http://192.168.10.24:8042/dashboard/dashboardCounts'
      );
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const callParkingApi = async () => {
    try {
      const response = await fetch('http://192.168.10.24:8042/parking');
      const data = await response.json();
      console.log(data);
      setParkingData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {dashboardData ? (
        <Box m='20px'>
          {/* HEADER */}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Header
              title='DASHBOARD'
              subtitle='Welcome to My Parking Buddy insights'
            />
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display='grid'
            gridTemplateColumns='repeat(12, 1fr)'
            gridAutoRows='140px'
            gap='20px'
          >
            {/* ROW 1 */}
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalUsers?.toLocaleString()}
                subtitle='Total Users'
                increase={`+${(
                  (parseFloat(dashboardData?.totalUsers) /
                    parseFloat(dashboardData?.totalUsersLastWeek)) *
                    100 -
                  100
                ).toFixed(2)}%`}
                icon={
                  <PeopleAlt
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalCustomers?.toLocaleString()}
                subtitle='Total Customers'
                increase={`+${(
                  (parseFloat(dashboardData?.totalCustomers) /
                    parseFloat(dashboardData?.totalCustomersLastWeek)) *
                    100 -
                  100
                ).toFixed(2)}%`}
                icon={
                  <GroupAdd
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalHosts?.toLocaleString()}
                subtitle='Total Hosts'
                increase={`+${(
                  (parseFloat(dashboardData?.totalHosts) /
                    parseFloat(dashboardData?.totalHostsLastWeek)) *
                    100 -
                  100
                ).toFixed(2)}%`}
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalParkingSpaces?.toLocaleString()}
                subtitle='Total Parking Spaces'
                increase={`+${(
                  (parseFloat(dashboardData?.totalParkingSpaces) /
                    parseFloat(dashboardData?.totalParkingSpacesLastWeek)) *
                    100 -
                  100
                ).toFixed(2)}%`}
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>

            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalBookings?.toLocaleString()}
                subtitle='Total Bookings'
                increase={`+${(
                  (parseFloat(dashboardData?.totalBookings) /
                    parseFloat(dashboardData?.totalBookingsLastWeek)) *
                    100 -
                  100
                ).toFixed(2)}%`}
                icon={
                  <PeopleAlt
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalBookingsLastWeek?.toLocaleString()}
                subtitle='Total Bookings Last Week'
                icon={
                  <GroupAdd
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalBookingsLastMonth?.toLocaleString()}
                subtitle='Total Bookings Last Month'
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn='span 3'
              backgroundColor={colors.primary[400]}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <StatBox
                title={dashboardData?.totalBookingsLastYear?.toLocaleString()}
                subtitle='Total Bookings Last Year'
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                  />
                }
              />
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn='span 8'
              gridRow='span 2'
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt='25px'
                p='0 30px'
                display='flex '
                justifyContent='space-between'
                alignItems='center'
              ></Box>
              <Box height='250px' m='-20px 0 0 0'>
                <LineChart
                  isDashboard={true}
                  lineChartData={dashboardData?.chartData}
                />
              </Box>
            </Box>
            <Box
              gridColumn='span 4'
              gridRow='span 2'
              backgroundColor={colors.primary[400]}
              overflow='auto'
            >
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p='15px'
              >
                <Typography
                  color={colors.grey[100]}
                  variant='h5'
                  fontWeight='600'
                >
                  Parkings
                </Typography>
              </Box>
              {parkingData?.map((data, index) => {
                const date = new Date(data?.createDate);
                const formattedDate = date.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
                return (
                  <Box
                    key={data.id}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p='15px'
                  >
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant='h5'
                        fontWeight='600'
                      >
                        {`Parking # ${index + 1}`}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        <p>{data?.latitude}</p>
                        {data?.longitude}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{formattedDate}</Box>
                    <Box
                      backgroundColor={colors.greenAccent[500]}
                      p='5px 10px'
                      borderRadius='4px'
                      fontWeight='600'
                    >
                      Rs. {data?.parkingCharges}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Dashboard;
