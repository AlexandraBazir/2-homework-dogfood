import React from 'react';
import { useContext } from 'react';
import Context from '../Context';
import Carousel from 'react-elastic-carousel';
import Promo from "../components/Advertisement/Promo";
import Card from "../components/Card";
import Banner from '../components/Advertisement/Banner';
import AdBlock from '../components/Advertisement/AdBlock';
import News from '../components/Advertisement/News';

import "./style.css";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 576, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 }
];

const Home = () => {
    const {
        goods,
        user,
        setModalOpen,
        token,
        userId
    } = useContext(Context)
    return <>
        <Banner />
        <div className="home">
            <Promo />
            {user &&
                <div className="home-carousel">
                    <Carousel breakPoints={breakPoints} enableAutoPlay autoPlaySpeed={1500}>
                        {goods.map((pro) => (
                            <Card key={pro._id} img={pro.pictures} name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes} token={token} userId={userId} discount={pro.discount} />))}
                    </Carousel>
                </div>
            }
            {!user && <>
                <span className="info-link"
                    onClick={() => setModalOpen(true)}>Авторизуйтесь, чтобы получить доступ к каталогу</span></>}
            <AdBlock />
            <News />
            <Promo />
        </div>
    </>
}

export default Home;