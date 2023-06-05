import {useContext, useEffect, useState} from "react";
import Context from "../Context";
import Row from "../components/RowProduct";


const Cart = ({id}) => {
    const [gds, setGds] = useState([]);
    const {cart, goods, setCart} = useContext(Context);
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
    return <div className="cart-container">
    <h1>Корзина</h1>
    {cart.length > 0 && gds.length > 0 && <table>
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
                <td colspan="4" style={{textAlign: "end"}}>Количество товаров</td>
            <td colspan="2" style={{textAlign: "start"}}>{countGoods}</td>
        </tr>
            <tr>
                <td colspan="4" style={{textAlign: "end"}}>Общая стоимость</td>
                <td colspan="2" style={{textAlign: "start"}}>{sumGoods === sumAllDiscount ? <span>{sumGoods} ₽</span> 
                : <>
                <span style={{color: "red"}}>{sumAllDiscount} ₽ </span>
                <del>{sumGoods} ₽</del>
                </>
                }
                </td>
            </tr>
            <tr>
                <td colspan="3" style={{textAlign: "start"}} onClick={clearCart}><button className="button__clear-cart">Очистить корзину</button></td>
                <td colspan="3" style={{textAlign: "end"}}><button className="button__buy">Оформить заказ</button></td>
            </tr>
        </tfoot>
        </table>}
    </div>
}

export default Cart;