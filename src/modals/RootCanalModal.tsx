import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import { X } from 'lucide-react';

import SearchableDropdown from '../components/SearchableDropdown';
import {
  FILLING_OPTIONS,
  COMPLEX_OPTIONS,
  FILLING_FOR_TREATMENT_OPTIONS,
  VISIT_CHARGE_OPTIONS
} from '../data/mockData';
import { RootCanalDetails } from '../types/types';
import { useOrderContext } from '../context/OrderContext';

interface RootCanalModalProps {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedOrder: string;
}

const RootCanalModal = ({
  open,
  onClose,
  selectedCategory,
  selectedOrder
}: RootCanalModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { addOrder, getNextOrderCode } = useOrderContext();

  const [formData, setFormData] = useState<RootCanalDetails>({
    filling: '',
    complex: '',
    fillingForTreatment: '',
    visitCharge: [],
    anestheticUsed: false
  });

  const handleChange = (field: keyof RootCanalDetails, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    const orderCode = getNextOrderCode('rootCanal');
    const totalPrice = calculatePrice();
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      code: orderCode,
      orderName: 'รักษารากฟัน',
      netPrice: totalPrice,
      status: 'Pending' as const,
      qty: 1,
      doctorShare: totalPrice * 0.1,
      careProvider: 'Dr. Johnson',
      details: {
        subCategory: selectedCategory,
        orderName: selectedOrder,
        ...formData
      }
    };

    addOrder(newOrder);
    onClose();
    navigate('/summary');
  };

  const calculatePrice = () => {
    let price = 0;
    
    if (formData.filling) {
      const fillingOption = FILLING_OPTIONS.find(option => option.value === formData.filling);
      if (fillingOption?.price) price += fillingOption.price;
    }
    
    if (formData.complex) {
      const complexOption = COMPLEX_OPTIONS.find(option => option.value === formData.complex);
      if (complexOption?.price) price += complexOption.price;
    }
    
    if (formData.fillingForTreatment) {
      const fillingForTreatmentOption = FILLING_FOR_TREATMENT_OPTIONS.find(
        option => option.value === formData.fillingForTreatment
      );
      if (fillingForTreatmentOption?.price) price += fillingForTreatmentOption.price;
    }
    
    if (formData.visitCharge.length > 0) {
      formData.visitCharge.forEach(charge => {
        const visitOption = VISIT_CHARGE_OPTIONS.find(option => option.value === charge);
        if (visitOption?.price) price += visitOption.price;
      });
    }
    
    if (formData.anestheticUsed) {
      price += 500;
    }
    
    return price;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: '954px',
          maxHeight: 'fit-content',
          m: 2,
          borderRadius: '16px'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h5" component="div">
          Order Detail
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
          รักษารากฟัน
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={FILLING_OPTIONS}
              label="Filling"
              value={formData.filling}
              onChange={(value) => handleChange('filling', value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={COMPLEX_OPTIONS}
              label="Complex"
              value={formData.complex}
              onChange={(value) => handleChange('complex', value)}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={FILLING_FOR_TREATMENT_OPTIONS}
              label="อุดเพื่อรักษารากฟัน"
              value={formData.fillingForTreatment}
              onChange={(value) => handleChange('fillingForTreatment', value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={VISIT_CHARGE_OPTIONS}
              label="Visit (Charge)"
              value={formData.visitCharge}
              onChange={(value) => handleChange('visitCharge', value)}
              multiple
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.anestheticUsed}
                  onChange={(e) => handleChange('anestheticUsed', e.target.checked)}
                  color="primary"
                />
              }
              label="Anesthetic Used"
              sx={{ mt: 0 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={formData.visitCharge.length === 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RootCanalModal;