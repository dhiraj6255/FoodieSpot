import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Contect from "./pages/Contact"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Verify from "./pages/Verify"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <main className="overflow-hidden bg-light text-[#404040]">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </main>
  )
}