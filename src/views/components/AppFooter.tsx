import * as React from 'react';
import { Typography } from '@material-ui/core';

export const AppFooter = () => (
  <div id="footer" role="contentinfo" style={{ textAlign: 'center' }}>
    <Typography id="footer-info-copyright" variant="body1">
      Released under the <a href="https://github.com/mui-org/material-ui/blob/master/LICENSE/">MIT License</a>.
    </Typography>
    <Typography id="footer-author" variant="body1">Developed by Luke Chang, 2018</Typography>
  </div>
);
