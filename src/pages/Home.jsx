import React from 'react';
import Carousel from 'react-elastic-carousel';
import Promo from "../components/Advertisement/Promo";
import Card from "../components/Card";
import BlockHeader from '../components/Advertisement/BlockHeader';
import BlockAdvertising from '../components/Advertisement/BlockAdvertising';
import BlockNews from '../components/Advertisement/BlockNews';
import "./style.css";


const Home = ({ goods, user, setActive }) => {
    return <>
    <div>
    <BlockHeader/>
    </div>
    <div>
    <Promo/>
    </div>
    <div>
    {user &&
        <div className="home-carousel">
        <Carousel itemsToShow={6} enableAutoPlay autoPlaySpeed={1500}>
            {goods.map((pro, i) => (
    <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />))}
        </Carousel>
        </div>
        }
    {!user && <>
    <span className="info-link"
    onClick={() => setActive(true)}>Авторизуйтесь</span>, чтобы получить доступ к сайту</>}
    </div>
    <div>
        <BlockAdvertising/>
        <BlockNews/>
        <Promo/>
    </div>
    </>
}

export default Home;

