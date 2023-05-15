import newShop from "../../image/newshop.jpg";
import vetPharmacy from "../../image/vetpharmacy.jpg";
import dogInsurance from "../../image/dog-insurance.jpg";
import dogVacation from "../../image/dog-vacation.png";


const BlockNews = () => {
    return <>
    <h2>Новости</h2>
    <div className="news">
    <div className="block-news">
        <div className="card-news">
            <img src={newShop} alt=""/>
            <p>Открытие второго магазина <br/> &laquo;DogFood&raquo; в Санкт-Петербурге</p>
            </div>
        <div className="card-news">
        <img src={vetPharmacy} alt=""/>
            <p>Новый пет-сервис <br/> &laquo;Страхование питомцев по подписке&raquo;</p>
            </div>
        <div className="card-news">
        <img src={dogVacation} alt=""/>
            <p>Готовимся в отпуск <br/> с питомцем</p>
            </div>
        <div className="card-news">
        <img src={dogInsurance} alt=""/>
            <p>Новинки в разделе <br/> &laquo;Ветеринарная аптека&raquo;</p>
            </div>
    </div>
    </div>
    </>
}

export default BlockNews;