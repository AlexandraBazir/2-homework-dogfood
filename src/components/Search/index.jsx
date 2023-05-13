import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchHeart } from "react-bootstrap-icons"
import "./style.css";

const Search = ({data, setGoods, setSearchResult}) => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [num, setNum] = useState(0);
    const changeValue = (e) => {
        navigate("/catalog");
        let val = e.target.value.toLowerCase();
        setText(val);
    }
    useEffect(() => {
        let str = "";
        if (num && text) {
            str = `По запросу ${text} найдено ${num} товаров`;
        } else if (text) {
            str = `По запросу ${text} не найдено ни одного товара`;
        } else {
            str = "";
        }
        setSearchResult(str);
    }, [num, text]);
    useEffect(() => {
        let result = data.filter(el => el.name.toLowerCase().includes(text));
        setGoods(result);
        setNum(result.length);
        console.log(result);
    }, [text]);
    return <div className="search-container">
    <input className="search" type="search" placeholder="Поиск" value={text} onChange={changeValue}/>
    <i><SearchHeart/></i>
    </div>
}

export default Search;