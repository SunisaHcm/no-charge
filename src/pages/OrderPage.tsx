import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';

import SearchableDropdown from '../components/SearchableDropdown';
import BoneGraftModal from '../modals/BoneGraftModal';
import GumSurgeryModal from '../modals/GumSurgeryModal';
import { SUB_CATEGORIES } from '../data/mockData';
import { OptionItem } from '../types/types';

const OrderPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [subCategory, setSubCategory] = useState<string>('all');
  const [orderName, setOrderName] = useState<string | null>(null);
  const [filteredOrderNames, setFilteredOrderNames] = useState<OptionItem[]>(() => {
    // Initialize with all order names since 'all' is the default
    return SUB_CATEGORIES
      .filter(cat => cat.value !== 'all')
      .flatMap(cat => cat.orderNames);
  });
  
  // Modal states
  const [openBoneGraftModal, setOpenBoneGraftModal] = useState(false);
  const [openGumSurgeryModal, setOpenGumSurgeryModal] = useState(false);

  const handleSubCategoryChange = (value: string | null) => {
    setSubCategory(value || 'all');
    setOrderName(null);
    
    if (value) {
      const category = SUB_CATEGORIES.find(cat => cat.value === value);
      if (value === 'all') {
        // When "All" is selected, combine all order names from all categories
        const allOrderNames = SUB_CATEGORIES
          .filter(cat => cat.value !== 'all')
          .flatMap(cat => cat.orderNames);
        setFilteredOrderNames(allOrderNames);
      } else {
        setFilteredOrderNames(category?.orderNames || []);
      }
    } else {
      setFilteredOrderNames([]);
    }
  };

  const handleOrderNameChange = (value: string | null) => {
    setOrderName(value);
    if (value) {
      handleOpenModal(value);
    }
  };

  const handleOpenModal = (orderType: string) => {
    switch(orderType) {
      case 'boneGraft':
        setOpenBoneGraftModal(true);
        break;
      case 'gumSurgery':
        setOpenGumSurgeryModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Dental Order
      </Typography>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          mb: 4
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SearchableDropdown
              options={SUB_CATEGORIES}
              label="Sub Category"
              value={subCategory ? SUB_CATEGORIES.find(cat => cat.value === subCategory) || null : null}
              onChange={handleSubCategoryChange}
              required
              fullWidth
              placeholder="Search and select sub category"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SearchableDropdown
              options={filteredOrderNames}
              label="Order Name"
              value={orderName ? filteredOrderNames.find(order => order.value === orderName) || null : null}
              onChange={handleOrderNameChange}
              disabled={!subCategory}
              required
              fullWidth
              placeholder="Search and select order name"
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Modals */}
      <BoneGraftModal 
        open={openBoneGraftModal}
        onClose={() => setOpenBoneGraftModal(false)}
        selectedCategory={subCategory || ''}
        selectedOrder={orderName || ''}
      />
      
      <GumSurgeryModal 
        open={openGumSurgeryModal}
        onClose={() => setOpenGumSurgeryModal(false)}
        selectedCategory={subCategory || ''}
        selectedOrder={orderName || ''}
      />
    </Box>
  );
};

export default OrderPage;