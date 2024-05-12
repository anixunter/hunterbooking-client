import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import SearchList from "./pages/searchList/SearchList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Booking from "./pages/booking/Booking";
function App() {
  return (
    <BrowserRouter basename="/hunterbooking-client">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchList" element={<SearchList />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
