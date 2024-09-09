import "./App.scss";
import "./Adaptive.scss";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Contacts from "./Pages/Contacts";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import Admin from "./Pages/Admin";
import PrivateRoutes from "./Pages/PrivateRoutes";
import AddMattress from "./Pages/AddMattress";
import MattressDetail from "./Components/MattressDetail";
import Order from "./Pages/Order";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/онас" element={<About />} />
        <Route path="/продукция" element={<Products />} />
        <Route path="/контакты" element={<Contacts />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<AddMattress />} />
          <Route path="/admin/detail/:id" element={<MattressDetail />} />
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
