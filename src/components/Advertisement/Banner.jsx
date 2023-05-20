import { Link } from "react-router-dom";

import "./style.css";


const Banner = () => {
    return <>
        <div className="banner">
            <h1>Крафтовые лакомства <br /> и качественные товары <br /> для собак</h1>
            <p>Всегда свежие лакомства ручной <br /> работы с доставкой по России и Миру</p>
            <div>
                <Link to="/catalog">
                    <button className="banner-button"><span>Каталог</span></button>
                </Link>
            </div>
        </div>
    </>
}

export default Banner;