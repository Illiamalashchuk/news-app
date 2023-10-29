import * as React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  value: string;
  label: string;
  options: string[];
  onChange: (value: string) => void;
};

export const Select: React.FC<Props> = ({
  value,
  label,
  options = [],
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
