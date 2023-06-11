import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Context from "../../Context";

const ProductСounter = ({ cnt }) => {
    const { setCart } = useContext(Context);
    const { id } = useParams();
    const [n, setN] = useState(cnt);
    const [flag, setFlag] = useState(false);
    const increment = () => {
        setFlag(true);
        setN(n + 1);

    }
    const decrement = () => {
        setFlag(true);
        setN(n - 1);
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
    return <>
        <div className="button-group-count">
            <button className="button__dec" onClick={decrement}>-</button>
            <button className="button__cnt" disabled>{n}</button>
            <button className="button__inc" onClick={increment}>+</button>
        </div>
    </>
}

export default ProductСounter;