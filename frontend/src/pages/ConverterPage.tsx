import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { data } from "../data/units";

// import { useGetPosts } from "../hooks/usePosts";

// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };

const ConverterPage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState<number>(0);
  const [calculated, setCalculated] = useState<number>(0);

  const toggleUnits = () => {
    const oldTo = to;
    const oldValue = value;
    setTo(from);
    setFrom(oldTo);
    setValue(calculated);
    setCalculated(oldValue);
  };

  const units = new Set();
  data.forEach((item) => {
    units.add(item.unit_to);
    units.add(item.unit_from);
  });

  const convert = () => {
    if (!from || !to) return;

    let result = value;
    let current = from;
    let previous = "";

    let i = 0;

    if (!Array.from(units).includes(from) || !Array.from(units).includes(to)) {
      return "Unknown unit !!!";
    }

    while (current !== to) {
      if (data[i].unit_from === from && data[i].unit_to === to) {
        setCalculated(value * data[i].ratio);
        return;
      } else if (
        data[i].unit_from === current &&
        previous !== data[i].unit_to
      ) {
        result *= data[i].ratio;
        previous = current;
        current = data[i].unit_to;
      } else if (
        data[i].unit_to === current &&
        previous !== data[i].unit_from
      ) {
        result /= data[i].ratio;
        previous = current;
        current = data[i].unit_from;
      } else if (data[i].unit_from === current) {
        result *= data[i].ratio;
        previous = current;
        current = data[i].unit_to;
      } else if (data[i].unit_to === current) {
        result /= data[i].ratio;
        previous = current;
        current = data[i].unit_from;
      }

      if (i === data.length - 1) {
        i = 0;
      } else {
        i++;
      }
    }
    setCalculated(+result.toFixed(3));
  };

  useEffect(() => {
    convert();
  }, [value]);

  return (
    <>
      <h1>Unit Converter</h1>

      <div
        className="select-box"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          marginTop: "5rem",
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
          <InputLabel id="demo-simple-select-standard-label">From</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={from}
            onChange={(e: SelectChangeEvent<string>) => {
              setValue(0);
              setCalculated(0);
              setFrom(e.target.value);
            }}
            label="From"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="millimeter">Millimeter</MenuItem>
            <MenuItem value="centimeter">Centimeter</MenuItem>
            <MenuItem value="meter">Meter</MenuItem>
            <MenuItem value="inch">Inch</MenuItem>
            <MenuItem value="feet">Feet</MenuItem>
          </Select>
        </FormControl>
        <div
          style={{
            cursor: "pointer",
            width: "2rem",
            marginTop: "1rem",
          }}
          onClick={toggleUnits}
        >
          <SyncAltIcon color="primary" />
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
          <InputLabel id="demo-simple-select-filled-label">To</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={to}
            onChange={(e: SelectChangeEvent<string>) => {
              setValue(0);
              setCalculated(0);
              setTo(e.target.value);
            }}
            label="To"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="millimeter">Millimeter</MenuItem>
            <MenuItem value="centimeter">Centimeter</MenuItem>
            <MenuItem value="meter">Meter</MenuItem>
            <MenuItem value="inch">Inch</MenuItem>
            <MenuItem value="feet">Feet</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        className="input-box"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          marginTop: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          multiline
          maxRows={8}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={calculated.toFixed(3)}
          multiline
          maxRows={8}
        />
      </div>
    </>
  );
};
export default ConverterPage;
