import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* UPDATED: :code instead of :name */}
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="/favourites" element={<div>Favourites Page</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;