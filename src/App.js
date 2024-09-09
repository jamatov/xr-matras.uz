import './App.scss';
import './Adaptive.scss'
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Products';
import Contacts from './Pages/Contacts';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import PrivateRoutes from "./Pages/PrivateRoutes";
import AddMattress from "./Pages/AddMattress";
import MattressDetail from "./Components/MattressDetail";
import Order from "./Pages/Order";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const top = () => {
    window.scrollTo(0, 0);
  }

  const [navbar, setNavbar] = useState(false);
  function setNav() {
    if (window.scrollY >= 350) {
        setNavbar(true);
    } else {
        setNavbar(false)
    }
  };

  window.addEventListener("scroll", setNav)

  return (
    <div className="App">
      <Navbar/>
      <ScrollToTop/>
      <a href="tel:+998950322226" className="btn-call">
        <div className="btn-call__ico">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
        </div>
      </a>
      <svg onClick={top} className={navbar ? 'scrol-top fixed' : 'scrol-top'} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_133_2717)">
        <rect width="50" height="50" rx="3.33333" fill="#EECB6D"/>
        <path d="M24.1667 30C24.1667 30.4602 24.5398 30.8333 25 30.8333C25.4602 30.8333 25.8333 30.4602 25.8333 30L24.1667 30ZM25.5893 16.9107C25.2638 16.5853 24.7362 16.5853 24.4107 16.9107L19.1074 22.214C18.782 22.5395 18.782 23.0671 19.1074 23.3926C19.4329 23.718 19.9605 23.718 20.286 23.3926L25 18.6785L29.714 23.3926C30.0395 23.718 30.5671 23.718 30.8926 23.3926C31.218 23.0671 31.218 22.5395 30.8926 22.214L25.5893 16.9107ZM25.8333 30L25.8333 17.5L24.1667 17.5L24.1667 30L25.8333 30Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_133_2717">
        <rect width="50" height="50" fill="white"/>
        </clipPath>
        </defs>
      </svg>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/онас' element={<About/>}/>
        <Route path='/продукция' element={<Products/>}/>
        <Route path='/контакты' element={<Contacts/>}/>

        <Route path="/order/:id" element={<Order />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<AddMattress />} />
          <Route path="/admin/detail/:id" element={<MattressDetail />} />
        </Route>
      </Routes>
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;
