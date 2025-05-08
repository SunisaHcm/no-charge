import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useOrderContext } from '../context/OrderContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../types/types';

const SummaryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { orders } = useOrderContext();
  const navigate = useNavigate();
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');

  // Get unique care providers
  const careProviders = Array.from(new Set(orders.map(order => order.careProvider)));

  // Get unique statuses
  const statuses = Array.from(new Set(orders.map(order => order.status)));

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return '#E7F5FF';
      case 'Completed':
        return '#D3F9D8';
      case 'Pending':
        return '#FFF3BF';
      case 'Cancelled':
        return '#FFE3E3';
      default:
        return '#F5F5F5';
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesProvider = providerFilter === 'all' || order.careProvider === providerFilter;
    return matchesStatus && matchesProvider;
  });

  const renderFilters = () => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>Filters</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="provider-filter-label">Care Provider</InputLabel>
            <Select
              labelId="provider-filter-label"
              value={providerFilter}
              label="Care Provider"
              onChange={(e) => setProviderFilter(e.target.value)}
            >
              <MenuItem value="all">All Providers</MenuItem>
              {careProviders.map((provider) => (
                <MenuItem key={provider} value={provider}>{provider}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderTable = () => (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Code</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Order Name</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Net Price</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Status</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Qty</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Doctor Share</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Care Provider</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.orderName}</TableCell>
                <TableCell>฿{order.netPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      bgcolor: getStatusBgColor(order.status),
                      color: 'text.primary',
                      border: 'none',
                      '& .MuiChip-label': {
                        px: 2,
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{order.qty}</TableCell>
                <TableCell>฿{(order.netPrice * 0.1).toLocaleString()}</TableCell>
                <TableCell>{order.careProvider}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No orders found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCards = () => (
    <Box sx={{ mt: 3 }}>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <Card 
            key={order.id} 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" component="div">
                  {order.code}
                </Typography>
                <Chip 
                  label={order.status} 
                  size="small"
                  sx={{ 
                    fontWeight: 500,
                    bgcolor: getStatusBgColor(order.status),
                    color: 'text.primary',
                    border: 'none',
                    '& .MuiChip-label': {
                      px: 2,
                    }
                  }}
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {order.orderName}
              </Typography>
              
              <Divider sx={{ my: 1 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Net Price
                  </Typography>
                  <Typography variant="body1">
                    ฿{order.netPrice.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Quantity
                  </Typography>
                  <Typography variant="body1">
                    {order.qty}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Doctor Share
                  </Typography>
                  <Typography variant="body1">
                    ฿{(order.netPrice * 0.1).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Care Provider
                  </Typography>
                  <Typography variant="body1">
                    {order.careProvider}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No orders found.
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={() => navigate('/order')}
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'transparent',
              color: 'primary.main',
            }
          }}
        >
          Back to Order
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Order Summary
        </Typography>
        <Box sx={{ width: 100 }} /> {/* Spacer for alignment */}
      </Box>
      
      {renderFilters()}
      {isMobile ? renderCards() : renderTable()}
    </Box>
  );
};

export default SummaryPage;