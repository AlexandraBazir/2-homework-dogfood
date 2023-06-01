import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";
import Context from "../../Context";

import "./style.css";

const Card = ({ name, _id, img, likes, price }) => {
    const { setBaseData, userId, token } = useContext(Context);
    const [isLike, setIsLike] = useState(likes?.includes(userId));
    const [likeFlag, setLikeFlag] = useState(false);
    const path = "https://api.react-learning.ru";
    const likeHandler = () => {
        setIsLike(!isLike);
        setLikeFlag(true);
    }
    useEffect(() => {
        if (likeFlag) {
            fetch(`${path}/products/likes/${_id}`, {
                method: isLike ? "PUT" : "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => res.json())
                .then(data => {
                    setLikeFlag(false);
                    fetch(`${path}/products`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(newData => {
                            setBaseData(newData.products);
                        })
                })

        }

    }, [isLike])
    return (
        <div className="card-lite" id={"pro_" + _id}>
            {userId && <span className="card-like" onClick={likeHandler}>
                {isLike ? <SuitHeartFill /> : <SuitHeart />}
            </span>}
            <img src={img} alt={name} />
            <h4>{price} ₽</h4>
            <p>{name}</p>
            <button>Купить</button>
            <Link to={`/product/${_id}`} className="card-link"></Link>
        </div>
    )
}

export default Card;