import React from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type PropsData = {
  selectedMonths: string[];
  setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function MultiSelect({
  selectedMonths,
  setSelectedMonths,
}: PropsData) {
  const getMonthFromString = (mon: string): number => {
    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  };

  return (
    <FormControl sx={{ m: 1, width: 500 }}>
      <InputLabel>Multiple Select</InputLabel>
      <Select
        multiple
        value={selectedMonths}
        onChange={(event: SelectChangeEvent<string[]>) => {
          const {
            target: { value },
          } = event;
          setSelectedMonths(
            typeof value === "string" ? value.split(",") : value
          );
        }}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value: string) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedMonths(
                    selectedMonths.filter((item: string) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {months.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
            {selectedMonths.includes(name) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
