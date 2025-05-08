import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import theme from './theme/theme';
import Layout from './components/Layout';
import OrderPage from './pages/OrderPage';
import SummaryPage from './pages/SummaryPage';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <Router>
          <Layout>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <Routes>
                <Route path="/order" element={<OrderPage />} />
                <Route path="/summary" element={<SummaryPage />} />
                <Route path="*" element={<Navigate to="/order" replace />} />
              </Routes>
            </Box>
          </Layout>
        </Router>
      </OrderProvider>
    </ThemeProvider>
  );
}

export default App