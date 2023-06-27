import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Context from "../Context";
import Carousel from 'react-elastic-carousel';
import { Trash3, PencilFill, XOctagon } from "react-bootstrap-icons";
import ProductСounter from "../components/ProductСounter";
import UpdProductInput from "../components/UpdProductInput";

import "./style.css";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 576, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 }
];

const Product = () => {
    const { userId, token, cart, setCart, setBaseData } = useContext(Context);
    const { id } = useParams();
    const [data, setData] = useState({});
    const [rev, setRev] = useState([]);
    const [revText, setRevText] = useState("");
    const [revRating, setRevRating] = useState(0);
    const [hideForm, setHideForm] = useState(true);
    const [modalUpdProduct, setModalUpdProduct] = useState(false);
    const inCart = cart.filter(el => id === el.id).length > 0;
    const path = "https://api.react-learning.ru";
    const st = {
        display: modalUpdProduct ? "flex" : "none",
    }
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const addReview = (e) => {
        const body = {
            text: revText,
            rating: revRating,
        }
        e.preventDefault();
        fetch(`${path}/products/review/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(d => {
                setData(d);
                setRevRating(0);
                setRevText("");
                setHideForm(true);
            })
    }
    const delReview = (id, r_id) => {
        fetch(`${path}/products/review/${id}/${r_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(d => {
                setData(d);
            })
    }
    const addToBasket = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCart(prev => [...prev, {
            id: id,
            price: data.price,
            discount: data.discount,
            cnt: 1
        }])
    }
    const delProduct = () => {
        fetch(`${path}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(d => {
                setBaseData(prev => prev.filter(el => el._id !== id));
                setCart(prev => prev.filter(e => e.id !== id))
                navigate("/catalog");
            })
    }
    useEffect(() => {
        fetch(`${path}/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(serverData => {
                setData(serverData);
            })
    }, [id, token, data])

    useEffect(() => {
        fetch(`${path}/products/review/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(serData => {
                setRev(serData);
            })
    }, [rev])
    return <div className="product-page">
        <span><button onClick={goBack} className="button__goback">Назад</button></span>
        {data.name ? <div>
            {data.author._id === userId ? <div className="product-name"><h1>{data.name}</h1><span className="product-delete"><Trash3 onClick={delProduct} /></span>
                <span className="product-upd" style={{ cursor: "pointer" }} onClick={() => setModalUpdProduct(true)}><PencilFill /></span></div>
                : <h1>{data.name}</h1>
            }
            <div className="product-card">
                <div className="product-img"><img src={data.pictures} alt={data.name} /></div>
                <h2 className="product-price">{data.price} ₽</h2>
                <div className="product-button-group">
                    <button className="product-button" disabled={inCart} onClick={addToBasket}>{inCart ? "В корзине" : "В корзину"} </button>
                    {inCart && <>{cart.map((el, i) => el.id === id && <ProductСounter key={i} cnt={el.cnt} />)}</>}
                </div>
                <div className="product-text_1">
                    <h3>Доставка по всему Миру!</h3>
                    <p>Доставка курьером - от 399 ₽ <br />
                        <br />
                        Доставка в пункт выдачи - от 199 ₽
                    </p>
                </div>
                <div className="product-text_2">
                    <h3>Гарантия качества</h3>
                    <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды
                    </p>
                </div>
            </div>
            <div>
                <h3>Описание</h3>
                <p>{data.description}</p>
            </div>
            <div>
                <h3>Характеристики</h3>
                <ul>
                    <li>
                        <div class="specifications">
                            <span class="specifications-name">Количество</span>
                        </div>
                        <span class="specifications-value">{data.wight ? data.wight : "нет данных"}</span>
                    </li>
                    <li>
                        <div class="specifications">
                            <span class="specifications-name">Цена</span>
                        </div>
                        <span class="specifications-value">{data.price} ₽</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3>Отзывы</h3>
                {rev.length ?
                    <Carousel breakPoints={breakPoints}>
                        {rev.map((e) => <div className="review-card" key={e._id}>
                            <h3>{e.author.name}</h3>
                            <h4 style={{ color: "grey" }}>{new Date(e.created_at).toLocaleDateString()}</h4>
                            <p><b>Рейтинг:</b> {e.rating}</p>
                            <p><b>Комментарий:</b> {e.text}</p>
                            {e.author._id === userId && <span className="review-delete"><Trash3 title="Удалить отзыв"
                                onClick={() => delReview(e.product, e._id)} /></span>}
                        </div>)}
                    </Carousel>
                    : <p>Еще никто не оценил...</p>}
            </div>
            <div>
                {hideForm && <button className="button-review" onClick={() => setHideForm(false)}>Написать отзыв</button>}
                {!hideForm && <div className="container-rev"><h3>Новый отзыв</h3>
                    <form onSubmit={addReview}>
                        <div className="form-rev">
                            <label htmlFor="rating">Рейтинг (1-5)</label>
                            <input type="number" id="rating" min={1} max={5} value={revRating}
                                onChange={(e) => setRevRating(+e.target.value)} />
                        </div>
                        <div className="form-rev">
                            <label htmlFor="text">Комментарий:</label>
                            <textarea id="text" style={{ height: "100px" }} value={revText}
                                onChange={(e) => setRevText(e.target.value)} />

                        </div>
                        <button className="button-review__reset" type="reset" onClick={(e) => {
                            e.preventDefault();
                            setRevText("");
                            setRevRating(0);
                            setHideForm(true);
                        }}>Отмена</button>
                        <button className="button-review__set" type="submit">Добавить</button>
                    </form>
                </div>
                }
            </div>
        </div>
            : <div className="info" style={{ textAlign: "center" }}>
                Товара {id} не существует или он еще не загружен
            </div>
        }
        <div className="modal-wrapper" style={st}>
            <div className="modal modal-upd">
                <button
                    className="modal-close"
                    onClick={() => setModalUpdProduct(false)}>
                    <XOctagon />
                </button>
                <div className="modal-container_upd">
                    {data.name && <UpdProductInput value={data.name} setProduct={setData} id={id} type="name" tagMain="h1" tagInp="input" />}
                    {data.price >= 0 && <UpdProductInput value={data.price} setProduct={setData} id={id} type="price" tagMain="div" tagInp="input" />}
                    {data.pictures && <UpdProductInput value={data.pictures} setProduct={setData} id={id} type="pictures" tagMain="img" tagInp="input" />}
                    {data.discount >= 0 && <UpdProductInput value={data.discount} setProduct={setData} id={id} type="discount" tagMain="div" tagInp="select" />}
                    {data.wight && <UpdProductInput value={data.wight} setProduct={setData} id={id} type="wight" tagMain="div" tagInp="input" />}
                </div>
                <div>
                    {data.description && <UpdProductInput value={data.description} setProduct={setData} id={id} type="description" tagMain="p" tagInp="textarea" />}
                </div>
            </div>
        </div>
    </div>
}

export default Product;