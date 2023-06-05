import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../Context";
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

const Header = () => {
    const {
        user,
        setUser,
        baseData,
        setGoods,
        setSearchResult,
        setModalOpen,
        cart
    } = useContext(Context);
    const login = () => {
        setModalOpen(true)
    };
    const logout = () => {
        localStorage.removeItem("user")
        setUser(null);
    };
    return (
        <header>
            <Logo />
            <div className="search-block">
                <Search />
            </div>
            <nav className="header__menu">
                {user && <>
                    <Link to="/favorites">
                        <Heart title="Избранное" />
                    </Link>
                    <Link to="/cart" className="a-block">
                      <Bag title="Корзина"/>
                    {cart.length > 0 && <span className="header__badge" style={{fontSize: "0.9rem"}}>
                        {cart.reduce((acc, el) => acc + el.cnt, 0)}
                        </span>}
                    </Link>
                    <Link to="/">
                        <PersonCircle title="Личный кабинет" />
                    </Link>
                </>}
                <span>
                    {!user && <BuildingFillUp title="Войти" onClick={login} />}
                    {user && <BuildingFillDown title="Выйти" onClick={logout} />}
                </span>
            </nav>
        </header>
    )
}

export default Header;