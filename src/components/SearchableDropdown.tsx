import { useState } from 'react';
import { 
  Autocomplete, 
  TextField, 
  Chip,
  Box, 
  InputAdornment,
  FormHelperText,
  FormControl,
  Typography,
  Checkbox
} from '@mui/material';
import { Search, Check } from 'lucide-react';
import { OptionItem } from '../types/types';

interface SearchableDropdownProps {
  options: OptionItem[];
  label: string;
  value: any;
  onChange: (newValue: any) => void;
  multiple?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

const SearchableDropdown = ({
  options,
  label,
  value,
  onChange,
  multiple = false,
  required = false,
  fullWidth = true,
  error = false,
  helperText = '',
  disabled = false,
  placeholder = ''
}: SearchableDropdownProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <Autocomplete
        multiple={multiple}
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            const matchingOption = options.find(o => o.value === option);
            return matchingOption ? matchingOption.label : option;
          }
          return option.label;
        }}
        isOptionEqualToValue={(option, value) => {
          if (typeof value === 'string') {
            return option.value === value;
          }
          return option.value === value.value;
        }}
        value={value}
        onChange={(_event, newValue) => {
          if (multiple) {
            onChange(newValue.map(item => 
              typeof item === 'string' ? item : item.value
            ));
          } else {
            onChange(newValue ? (typeof newValue === 'string' ? newValue : newValue.value) : null);
          }
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            {multiple && (
              <Checkbox
                icon={<Box sx={{ width: 20, height: 20, border: '1px solid', borderColor: 'grey.400', borderRadius: '4px' }} />}
                checkedIcon={<Box sx={{ width: 20, height: 20, bgcolor: 'primary.main', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} color="white" />
                </Box>}
                checked={selected}
                sx={{ mr: 1 }}
              />
            )}
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                {label}
                {required && (
                  <Typography component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                    *
                  </Typography>
                )}
              </Box>
            }
            placeholder={placeholder || (focused ? 'Search...' : '')}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {focused && (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  )}
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            error={error}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const label = typeof option === 'string' 
              ? options.find(o => o.value === option)?.label || option
              : option.label;
            
            return (
              <Chip
                {...getTagProps({ index })}
                key={index}
                label={label}
                sx={{
                  bgcolor: 'info.main',
                  color: 'info.contrastText',
                  '& .MuiChip-deleteIcon': {
                    color: 'info.contrastText',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      opacity: 0.8,
                      color: 'info.contrastText',
                    },
                  },
                }}
              />
            );
          })
        }
        disabled={disabled}
        fullWidth={fullWidth}
        disableCloseOnSelect={multiple}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SearchableDropdown;