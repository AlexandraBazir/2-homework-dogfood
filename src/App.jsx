import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/General/Header";
import Footer from "./components/General/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Modal from "./components/Modal";
import BlockHeader from "./components/Advertisement/BlockHeader"
import Promo from "./components/Advertisement/Promo";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("token12"));
  const [baseData, setBaseData] = useState([]); 
  const [goods, setGoods] = useState(baseData);
  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
    console.log("token", token);
    if (token) {
      fetch("https://api.react-learning.ru/products", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      setBaseData(data.products);
    })
    }
  }, [token])

  useEffect(() => {
    setGoods(baseData)
  },[baseData])
  return (
  <>
  <Header
  user={user}
  upd={setUser}
  searchArr={baseData}
  setGoods={setGoods}
  setSearchResult={setSearchResult}
  setModalOpen={setModalOpen}
  />
  <Routes>
          <Route path="/" element={<Home user={user} setActive={setModalOpen} goods={goods}/>}/>
          <Route path="/catalog" element={<Catalog goods={goods} user={user} setActive={setModalOpen}/>}/>
          <Route path="/catalog" element={<BlockHeader user={user} setActive={setModalOpen}/>}/>
          {/* <Route path="/catalog" element={<Promo goods={goods}/>}/> */}
          {/* <Route path="/old" element={
            <OldPage
              searchText={searchResult}
              goods={goods}
            /> */}
        </Routes>
  <Footer/>
  <Modal
        isActive={modalOpen}
        setIsActive={setModalOpen}
        setUser={setUser}
      />
  </>
  )
}

export default App;