import Background from "./components/Background";
import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";
import "./scss/index.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import MyList from "./pages/MyList";
import About from "./pages/About";
function App() {
  return (
    <div className="main-container">
      <Background />
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
            <Route element={<MyList />} path="/list" />
            <Route element={<About />} path="/about" />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
