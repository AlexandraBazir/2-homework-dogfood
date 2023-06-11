import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Context from "./Context";
import Header from "./components/General/Header";
import Footer from "./components/General/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Modal from "./components/Modal";
import Banner from "./components/Advertisement/Banner"
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("token12"));
  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);
  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  let cartStorage = localStorage.getItem("cart12");
  if (cartStorage && cartStorage[0] === "[") {
    cartStorage = JSON.parse(cartStorage);
  } else {
    cartStorage = [];
  }
  const [cart, setCart] = useState(cartStorage);
  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem("user12-id"));
      setToken(localStorage.getItem("token12"));
    } else {
      localStorage.removeItem("user12-id")
      localStorage.removeItem("token12")
      setUserId(null);
      setToken(null);
    }
  }, [user])

  useEffect(() => {
    if (token) {
      fetch("https://api.react-learning.ru/products", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setBaseData(data.products);
        })
    }
  }, [token])

  useEffect(() => {
    setGoods(baseData)
  }, [baseData])
  useEffect(() => {
    localStorage.setItem("cart12", JSON.stringify(cart))
  }, [cart])
  return (
    <Context.Provider value={{
      searchResult,
      setSearchResult,
      setBaseData,
      setUser,
      setModalOpen,
      setGoods,
      modalOpen,
      baseData,
      goods,
      user,
      userId,
      token,
      cart,
      setCart
    }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog" element={<Banner />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
      <Modal />
    </Context.Provider>
  )
}

export default App;
