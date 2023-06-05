import { useContext } from "react";
import Context from "../Context";
import Card from "../components/Card";

import "./style.css";

const Catalog = () => {
    const {
        searchResult,
        setModalOpen,
        goods,
        user
    } = useContext(Context);
    return <div className="container">
        {searchResult && <p className="search-result">{searchResult}</p>}
        {user && <>
            <h1 style={{ margin: 0, justifySelf: "flex-start" }}>Каталог</h1>
            <div className="container-card">{goods.map((pro, i) => (
                <Card key={i}
                    img={pro.pictures}
                    name={pro.name}
                    price={pro.price}
                    _id={pro._id}
                    likes={pro.likes}
                    discount={pro.discount}
                />))}</div>
        </>}
        {!user && <>
            <span className="info-link"
                onClick={() => setModalOpen(true)}>Авторизуйтесь, чтобы получить доступ к сайту</span></>}
    </div>
}

export default Catalog;