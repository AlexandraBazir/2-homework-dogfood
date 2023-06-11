import { useContext, useEffect, useState } from "react";
import { EmojiFrown } from "react-bootstrap-icons";
import Context from "../Context";
import Row from "../components/RowProduct";
import { Link } from "react-router-dom";


const Cart = () => {
    const [gds, setGds] = useState([]);
    const { cart, goods, setCart } = useContext(Context);
    const sumGoods = cart.reduce((acc, el) => Math.ceil(acc + el.price * el.cnt), 0);
    const sumAllDiscount = cart.reduce((acc, el) => {
        return Math.ceil(acc + (el.price * el.cnt * ((100 - el.discount) / 100)));
    }, 0);

    const countGoods = cart.reduce((acc, el) => {
        let res = acc + el.cnt;
        return res;
    }, 0)
    const clearCart = () => {
        localStorage.removeItem("cart12");
        setCart([]);
    }
    useEffect(() => {
        let arr = [];
        if (goods.length) {
            cart.forEach(e => {
                arr.push(goods.filter(g => g._id === e.id)[0])
            })
        }
        setGds(arr);
    }, [cart, goods])
    return <> {cart.length > 0 ? <div className="cart-container"><h1>Корзина</h1>
        <table>
            <thead>
                <tr>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Цена за 1 шт.</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map((el, i) => <Row key={el.id} {...gds[i]} {...el} />)}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="6" style={{ textAlign: "end" }}>Количество товаров: {countGoods}</td>
                </tr>
                <tr>
                    <td colspan="6" style={{ textAlign: "end" }}>Общая стоимость: {sumGoods === sumAllDiscount ? <span>{sumGoods} ₽</span>
                        : <>
                            <span style={{ color: "red" }}>{sumAllDiscount} ₽ </span>
                            <del>{sumGoods} ₽</del>
                        </>
                    }
                    </td>
                </tr>
                <tr>
                    <td colspan="3" className="td__clear-cart">
                        <button onClick={clearCart} className="button__clear-cart">Очистить корзину</button>
                    </td>
                    <td colspan="3" className="td__buy">
                        <button className="button__buy">Оформить заказ</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
        : <div className="cart-empty">
            <EmojiFrown style={{ color: "#ebeff0", fontSize: "15rem" }} />
            <h2>В корзине нет товаров</h2>
            <p>Добавьте товар, нажав на кнопку &laquo;В корзину&raquo; в карточке товара</p>
            <Link to="/"><button className="button-home">На главную</button></Link>
        </div>
    }
    </>
}

export default Cart;