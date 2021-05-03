import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import PhoneIcon from '@material-ui/icons/Phone';
// import TabletIcon from '@material-ui/icons/Tablet';

import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDeviceseller = ({ className,userdata, ...rest }) => {

  const classes = useStyles();
  const theme = useTheme();
  
  const total_users = ((+userdata.likedcount) + (+userdata.interestcount)).toFixed(1)
  const percentage_sellers = ((+userdata.likedcount/parseInt(total_users+1)) * 100).toFixed(1)
  const percentage_buyers = ((+userdata.interestcount/parseInt(total_users+1)) * 100).toFixed(1)
  // const percentage_sellers = 2
  // const percentage_buyers = 4
  const data = {
    datasets: [
      {
        data: [percentage_sellers, percentage_buyers],
        backgroundColor: [
          colors.indigo[500],
          // colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Favorites', 'Interests']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  
  const devices = [
    {
      title: 'Favorites',
      value: percentage_sellers,
      icon: GroupAddOutlinedIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Interests',
      value: percentage_buyers,
      icon: GroupOutlinedIcon,
      color: colors.red[600]
    },
    // {
    //   title: 'TotalUsers',
    //   value: total_users,
    //   icon: GroupWorkOutlinedIcon,
    //   color: colors.orange[600]
    // }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Likes vs Interests" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h5"
              >
                {isNaN(value)? 0:value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDeviceseller.propTypes = {
  className: PropTypes.string
};

export default TrafficByDeviceseller;
