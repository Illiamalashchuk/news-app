import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox, ListItemText, OutlinedInput } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  value: string[];
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string[]) => void;
};

export const MultiSelect: React.FC<Props> = ({
  value,
  label,
  options,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="checkbox-label">{label}</InputLabel>
        <MuiSelect
          labelId="checkbox-label"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected: string[]) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
};
