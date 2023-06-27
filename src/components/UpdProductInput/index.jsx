import { useState, useContext } from "react";
import { XCircle, CheckCircle, PencilSquare } from "react-bootstrap-icons";
import Context from "../../Context";
import "./style.css"

const UpdProductInput = ({ setData, id, setModalUpdProduct, type, value, tagMain, tagInp }) => {

    const { token } = useContext(Context)
    const [flag, setFlag] = useState(false);
    const [content, setContent] = useState(value);
    const updProduct = () => {
        let body = {
        };
        body[type] = content;
        fetch(`https://api.react-learning.ru/products/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(d => {
                setData(d);
                setContent(d[type]);
                setModalUpdProduct(false);
                setFlag(false);
            })
    }

    const cancel = (e) => {
        setFlag(false);
        setContent(value);
    }
    return <>
        <div className="container-upd">
            {
                flag ?
                    <>
                        {tagInp === "input" && <input type={type === "price" ? "number" : "text"} value={content} onChange={(e) => setContent(e.target.value)} />}
                        {tagInp === "textarea" && <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>}
                        {tagInp === "select" && <select value={content} onChange={(e) => setContent(e.target.value)}>
                            <option>0</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                        </select>}
                        <button onClick={() => {
                            updProduct();
                            setFlag(false);
                        }}
                            className="button-upd">
                            <CheckCircle />
                        </button>
                        <button onClick={cancel}
                            className="button-upd">
                            <XCircle /></button>
                    </>
                    :
                    <>
                        {tagMain === "img" && <img src={content} width="200" alt="Картинка с товаров"/>}
                        {tagMain === "h1" && <h1 style={{ fontSize: "1rem" }}>{content}</h1>}
                        {tagMain !== "img" && tagMain !== "h1" && tagInp === "select" && <div><p>Скидка: {content}</p></div>}
                        {tagInp === "input" && type === "wight" &&
                            <div><p>Количество: {content}</p></div>}
                        {tagInp === "input" && type === "price" &&
                            <div><p>Цена: {content}</p></div>}
                        {tagInp === "textarea" && type === "description" &&
                            <div><p>{content}</p></div>}
                        <span className="span-button_pencil">
                            <button onClick={(e) => {
                                e.preventDefault();
                                setFlag(true);
                            }}
                                className="button-pencil">
                                <PencilSquare />
                            </button></span>
                    </>
            }
        </div>
    </>
}

export default UpdProductInput;