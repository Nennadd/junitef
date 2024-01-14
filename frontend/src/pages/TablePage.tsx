import React, { useState, useReducer, useEffect, useRef } from "react";
import { useAddPost } from "../hooks/usePosts";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../components/MultiSelect";
import { data } from "../data/data";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Data = {
  month: number;
  sales: number;
};

type ActionType = { string?: string; months?: string[] };

const getMonthName = (monthNumber: number): string => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString([], {
    month: "long",
  });
};

const reducer = (state: Data[], action: ActionType) => {
  if (action.months) {
    return data
      .filter((item) => action.months?.includes(getMonthName(item.month)))
      .sort((a, b) => a.month - b.month);
  }
  if (action.string) {
    return [...data]
      .filter((item) =>
        getMonthName(item.month)
          .toLowerCase()
          .startsWith(
            action.string !== undefined ? action.string.toLowerCase() : ""
          )
      )
      .sort((a, b) => a.month - b.month);
  } else {
    return data;
  }
};

const TablePage = () => {
  const [state, dispatch] = useReducer(reducer, data);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const input = useRef();

  useEffect(() => {
    if (selectedMonths.length) {
      dispatch({ months: selectedMonths });
      console.log(input);
    }
  }, [selectedMonths]);

  return (
    <>
      <h1>Search Data</h1>
      <div className="search-wrapper">
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Search month..."
            onChange={(e) => dispatch({ string: e.target.value })}
            multiline
            maxRows={2}
          />
        </div>
        <div>
          <MultiSelect
            selectedMonths={selectedMonths}
            setSelectedMonths={setSelectedMonths}
          />
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Month</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {state &&
              state.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <img
                          src={`https://picsum.photos/40/40?${index}`}
                          alt="data-img"
                        />
                      </div>
                    </td>
                    <td>{getMonthName(row.month)}</td>
                    <td>{row.sales}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TablePage;
