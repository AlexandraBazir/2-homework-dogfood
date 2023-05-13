import "./style.css";
import { Link } from "react-router-dom";
import { Journals } from "react-bootstrap-icons";

const Promo = ({ user, setActiveModal }) => {
    return <> <div className="promo">
        <h1>Крафтовые <br />
            лакомства для <br /> собак
            </h1>
        <p>Всегда свежие лакомства ручной <br /> работы с доставкой по России и Миру</p>
        <div>
            {user && <Link to="/catalog">
                <button className="promo-button"><span>Каталог</span></button>
            </Link>}
            {!user && <>
                <span className="info-link" onClick={() => setActiveModal(true)}>Авторизуйтесь</span>, чтобы получить доступ к каталогу
            </>}
        </div>
    </div>
    <div className="promo-feed">
    <div className="promo-text">
        <h2>Подарок за первый заказ!</h2>
        <p>Натуральный корм</p>
        </div>
    </div>
    </>
}

export default Promo;