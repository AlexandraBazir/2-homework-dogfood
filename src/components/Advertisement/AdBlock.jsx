import "./style.css";

const AdBlock = () => {
    return <>
        <div className="adblock">
            <div className="adblock-clothes adblock-size">
                <h2>Летняя одежда</h2>
                <p>от 599 ₽</p>
            </div>
            <div className="adblock-shampoo adblock-size">
                <h2>Шампунь <br />
                    для щенков</h2>
                <p>Гипоаллергенный <br />
                    и натуральный</p>
            </div>
            <div className="adblock-toys adblock-size">
                <h2>Игрушки для собак</h2>
                <p>Большой выбор! <br />
                    От палок <br />
                    до летающих тарелок</p>
            </div>
            <div className="adblock-parfum adblock-size">
                <h2>Духи для собак</h2>
                <p>Французского качества</p>
            </div>
        </div>
    </>
}

export default AdBlock;