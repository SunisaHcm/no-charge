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
  useTheme
} from '@mui/material';
import { X } from 'lucide-react';

import SearchableDropdown from '../components/SearchableDropdown';
import {
  BONE_MATERIAL_OPTIONS,
  MEMBRANE_OPTIONS,
  TENTING_SCREW_OPTIONS,
  FIXING_SCREW_OPTIONS,
  PERIODENTAL_DRESSING_OPTIONS,
  SUTURE_MATERIAL_OPTIONS
} from '../data/mockData';
import { GumSurgeryDetails } from '../types/types';
import { useOrderContext } from '../context/OrderContext';

interface GumSurgeryModalProps {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  selectedOrder: string;
}

const GumSurgeryModal = ({
  open,
  onClose,
  selectedCategory,
  selectedOrder
}: GumSurgeryModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { addOrder, getNextOrderCode } = useOrderContext();

  const [formData, setFormData] = useState<GumSurgeryDetails>({
    boneMaterial: '',
    membrane: '',
    tentingScrew: '',
    fixingScrew: [],
    periodentalDressing: '',
    sutureMaterial: '',
    anestheticUsed: false
  });

  const handleChange = (field: keyof GumSurgeryDetails, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    const orderCode = getNextOrderCode('gumSurgery');
    const netPrice = calculatePrice();
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      code: orderCode,
      orderName: 'ผ่าตัดเหงือก',
      netPrice: netPrice,
      status: 'Pending' as const,
      qty: 1,
      doctorShare: netPrice * 0.1,
      careProvider: 'Dr. Lee',
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
    let price = 3000;
    price += formData.fixingScrew.length * 400;
    if (formData.anestheticUsed) price += 500;
    return price;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          maxWidth: '954px',
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
        <Typography variant="h5" component="div">
          Order Detail
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
          ผ่าตัดเหงือก
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={BONE_MATERIAL_OPTIONS}
              label="Bone material"
              value={formData.boneMaterial}
              onChange={(value) => handleChange('boneMaterial', value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={MEMBRANE_OPTIONS}
              label="Membrane"
              value={formData.membrane}
              onChange={(value) => handleChange('membrane', value)}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={TENTING_SCREW_OPTIONS}
              label="Tenting screw"
              value={formData.tentingScrew}
              onChange={(value) => handleChange('tentingScrew', value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={FIXING_SCREW_OPTIONS}
              label="Fixing Screw"
              value={formData.fixingScrew}
              onChange={(value) => handleChange('fixingScrew', value)}
              multiple
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={PERIODENTAL_DRESSING_OPTIONS}
              label="Periodental dressing"
              value={formData.periodentalDressing}
              onChange={(value) => handleChange('periodentalDressing', value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SearchableDropdown
              options={SUTURE_MATERIAL_OPTIONS}
              label="Suture material"
              value={formData.sutureMaterial}
              onChange={(value) => handleChange('sutureMaterial', value)}
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
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GumSurgeryModal;