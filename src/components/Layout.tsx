import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Container, 
  CssBaseline, 
  IconButton, 
  Toolbar, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/order');
    }
  }, [location.pathname, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, fontWeight: 600, color: 'primary.main' }}
          >
            Dental Orders
          </Typography>
          
          {isMobile && (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                {mobileOpen ? <X /> : <Menu />}
              </IconButton>
            </>
          )}
        </Toolbar>
        
        {/* Mobile menu */}
        {isMobile && mobileOpen && (
          <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
            <Typography
              variant="body1"
              sx={{
                py: 1,
                px: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover', borderRadius: 1 }
              }}
              onClick={() => {
                navigate('/order');
                setMobileOpen(false);
              }}
            >
              Order
            </Typography>
            <Typography
              variant="body1"
              sx={{
                py: 1,
                px: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover', borderRadius: 1 }
              }}
              onClick={() => {
                navigate('/summary');
                setMobileOpen(false);
              }}
            >
              Summary
            </Typography>
          </Box>
        )}
      </AppBar>
      
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          mb: 4, 
          display: 'flex', 
          flexDirection: 'column',
          flexGrow: 1,
          px: { xs: 2, sm: 3 } 
        }}
      >
        {children}
      </Container>
      
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Dental Management System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;