import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from 'providers/ThemeProvider/ThemeProvider.component';
import LayoutContainer from 'components/base/styles/LayoutContainer/LayoutContainer.component';

import Sidebar from 'components/presentational/Sidebar/Sidebar.component';
import DashboardPage from 'components/pages/DashboardPage/DashboardPage.component';

import './Application.module.scss';

const Application = () => {
  const themeOptions = {
    style: {
      borderRadius: '32px',
    },
  };

  return (
    <main className="fs-web-application">
      <ThemeProvider options={themeOptions}>
        <CssBaseline />
        <div className="fs-web-application--container">
          <LayoutContainer flex>
            <Sidebar />
            <DashboardPage />
          </LayoutContainer>
        </div>
      </ThemeProvider>
    </main>
  );
};

export default Application;
