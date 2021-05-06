import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';



function Media(props) {
  const { loading=true } = props;

  return (
    <Grid container wrap="wrap" spacing={1}>
      {(loading && Array.from(new Array(8))).map((item, index) => (
          <Grid item md={4} sm={12} xs={12} lg={4} key={index}>
        <Box key={index}  marginRight={0.5} my={5}>
          
            <Skeleton variant="rect" height={118} />
          
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
         
        </Box>
        </Grid>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Productskeleton() {
  return (
    <Box overflow="hidden">
      <Media loading />      
    </Box>
  );
}