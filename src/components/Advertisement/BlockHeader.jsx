import "./style.css";
import { Link } from "react-router-dom";

const BlockHeader = () => {
    return <>
    <div className="block-header">
        <h1>Крафтовые <br />
            лакомства для <br /> собак
            </h1>
        <p>Всегда свежие лакомства ручной <br /> работы с доставкой по России и Миру</p>
        <div>
            <Link to="/catalog">
                <button className="header-button"><span>Каталог</span></button>
            </Link>
        </div>
        </div>
    </>
}

export default BlockHeader;