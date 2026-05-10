import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Candidates from "./pages/Candidates";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </BrowserRouter>
  );
}