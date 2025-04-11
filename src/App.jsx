import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./Components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import MyFooter from "./Components/MyFooter";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Details from "./Components/Details";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-vh-100 d-flex flex-column">
          <header>
            <MyNavbar />
          </header>
          <main className="flex-grow-1 bg-info d-flex align-items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/details/" element={<Details />} />
            </Routes>
          </main>
          <footer className="bg-primary">
            <MyFooter />
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
