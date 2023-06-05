import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Telegram, Whatsapp, Instagram } from "react-bootstrap-icons";

import "./style.css";

const links = [
    { name: "Каталог", src: "/catalog" },
    { name: "Акции", src: "/" },
    { name: "Избранное", src: "/favorites" },
    { name: "Корзина", src: "/cart" },
    { name: "Оплата и доставка", src: "/" },
    { name: "Часто спрашивают", src: "/" },
    { name: "Обратная связь", src: "/" },
    { name: "Контакты", src: "/" }
]

const Footer = () => {
    return (
        <footer>
            <div className="footer__logo">
                <Logo />
                <span className="footer__copy">©️ &laquo;Интернет-магазин DogFood.ru&raquo;</span>
            </div>
            <ul className="footer__nav">
                {links.map(el => <li key={el.name}>
                    <Link to={el.src}>{el.name}</Link>
                </li>)}
            </ul>
            <div className="footer__contacts">
                <h3>Мы на связи</h3>
                <p>8 (999) 00-00-00</p>
                <p>dogfood.ru@gmail.com</p>
                <span>
                    <Link to="/">
                        <Telegram />
                    </Link>
                    <Link to="/">
                        <Whatsapp />
                    </Link>
                    <Link to="/">
                        <Instagram />
                    </Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer;