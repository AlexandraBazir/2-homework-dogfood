import { Link } from "react-router-dom";
import { Journals } from "react-bootstrap-icons";
import Promo from "../components/Promo";

const Home = ({user, setActive}) => {
    return <>
    <Promo/>
    {/* <div className="info">
    {user && <Link to="/catalog" className="info-link">
        <Journals style={{marginRight: "10px"}}/>
        Каталог товаров
        </Link>}
    {!user && <>
    <span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь</span>, чтобы получить доступ к сайту</>}
    </div> */}
    </>
}

export default Home;