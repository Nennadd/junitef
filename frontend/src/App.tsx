import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConverterPage from "./pages/ConverterPage";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import NavBar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route path="/" element={<ConverterPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
