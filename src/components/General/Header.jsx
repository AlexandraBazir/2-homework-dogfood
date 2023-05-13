import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
    Heart,
    Bag,
    PersonCircle,
    BuildingFillUp,
    BuildingFillDown
} from "react-bootstrap-icons";
import Search from "../Search";

import "./style.css";

const Header = ({user, upd, searchArr, setGoods, setSearchResult, setModalOpen}) => {
    const login = () => {
        setModalOpen(true)
    };
    const logout = () => {
        localStorage.removeItem("user")
        upd(null);
    };
    return (
        <header>
            <Logo />
            <div className="search-block">
                <Search
                data={searchArr}
                setGoods={setGoods}
                setSearchResult={setSearchResult}
                />
            </div>
            <nav className="header__menu">
            { user && <>
            <Link to="/">
            <Heart title="Избранное"/>
            </Link>
            <Link to="/">
                <Bag title="Корзина"/>
                </Link>
                <Link to="/">
                <PersonCircle title="Личный кабинет"/>
                </Link>
                </>}
                <span>
                    {!user && <BuildingFillUp title="Войти" onClick={login}/>}
                    {user && <BuildingFillDown title="Выйти"onClick={logout}/>}
                </span>
            </nav>
        </header>
    )
}

export default Header;