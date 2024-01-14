import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "flex-start", paddingLeft: "2rem" }}>
          <Button>
            <Link
              className={"link " + (location.pathname === "/" ? "active" : "")}
              to="/"
            >
              Converter
            </Link>
            <Link
              className={
                "link " + (location.pathname === "/table" ? "active" : "")
              }
              to="/table"
            >
              Table
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
