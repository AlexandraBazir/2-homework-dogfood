import React from 'react';
import Carousel from 'react-elastic-carousel';
import Promo from "../components/Advertisement/Promo";
import Card from "../components/Card";
import BlockHeader from '../components/Advertisement/BlockHeader';
import BlockAdvertising from '../components/Advertisement/BlockAdvertising';
import BlockNews from '../components/Advertisement/BlockNews';
import "./style.css";


const Home = ({ goods, user, setActive }) => {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 576, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 3 }
      ];
    return <>
    <BlockHeader/>
    <div className="home">
    <Promo/>
    {user &&
        <div className="home-carousel">
        <Carousel breakPoints={breakPoints} enableAutoPlay autoPlaySpeed={1500}>
            {goods.map((pro, i) => (
    <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />))}
        </Carousel>
        </div>
        }
    {!user && <>
    <span className="info-link"
    onClick={() => setActive(true)}>Авторизуйтесь, чтобы получить доступ к сайту</span></>}
        <BlockAdvertising/>
        <BlockNews/>
        <Promo/>
    </div>
    </>
}

export default Home;

