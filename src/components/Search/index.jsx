import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchHeart } from "react-bootstrap-icons";
import Context from "../../Context";

import "./style.css";

const Search = () => {
    const { baseData, setGoods, setSearchResult } = useContext(Context);
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
        let result = baseData.filter(el => el.name.toLowerCase().includes(text));
        setGoods(result);
        setNum(result.length);
    }, [text, baseData]);
    return <div className="search-container">
        <input className="search" type="search" placeholder="Поиск" value={text} onChange={changeValue} />
        <i><SearchHeart /></i>
    </div>
}

export default Search;