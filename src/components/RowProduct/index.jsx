import { useContext, useState, useEffect } from "react";
import { Trash3 } from "react-bootstrap-icons";

import Context from "../../Context";

import "./style.css";

const Row = ({ name, pictures, cnt, price, id, discount }) => {
    const { setCart } = useContext(Context);
    const [n, setN] = useState(cnt);
    const [flag, setFlag] = useState(false);
    const sum = price * n;
    const sumDiscount = Math.ceil(price * n * ((100 - discount) / 100))
    const increment = () => {
        setFlag(true);
        setN(n + 1);

    }
    const decrement = () => {
        setFlag(true);
        setN(n - 1);
    }

    const delProduct = (e) => {
        setCart(prev => prev.filter(e => e.id !== id))
    }

    useEffect(() => {
        if (flag) {
            setCart(prev => {
                if (n) {
                    return prev.map(el => {
                        if (el.id === id) {
                            el.cnt = n;
                        }
                        return el;
                    })
                } else {
                    return prev.filter(el => el.id !== id);
                }
            })
        }
    }, [n])
    return <tr>
        <td><img src={pictures} alt={name} className="image-cart" /></td>
        <td>{name}</td>
        <td>
            <div className="button-group">
                <button className="button__dec" onClick={decrement}>-</button>
                <button className="button__cnt" disabled>{n}</button>
                <button className="button__inc" onClick={increment}>+</button>
            </div>
        </td>
        <td className="price">{price} ₽</td>
        {sum === sumDiscount ? <td>{sum} ₽</td>
            : <td style={{ color: "red" }}>
                {sumDiscount} ₽ <del style={{ color: "black" }}>{sum} ₽</del>
            </td>}
        <td><Trash3 onClick={delProduct} className="icon-cart" /></td>
    </tr>
}

export default Row;