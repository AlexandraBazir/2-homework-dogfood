import newShop from "../../image/newshop.jpg";
import vetPharmacy from "../../image/vetpharmacy.jpg";
import dogInsurance from "../../image/dog-insurance.jpg";
import dogVacation from "../../image/dog-vacation.png";

import "./style.css";

const News = () => {
    return <>
        <div>
            <h2>Новости</h2>
            <div className="news">
                <div className="card-news">
                    <img src={newShop} alt="Магазин для собак" />
                    <p>Открытие второго магазина &laquo;DogFood&raquo; в Санкт-Петербурге</p>
                </div>
                <div className="card-news">
                    <img src={dogInsurance} alt="Собака с полисом" />
                    <p>Новый пет-сервис &laquo;Страхование питомцев по подписке&raquo;</p>
                </div>
                <div className="card-news">
                    <img src={dogVacation} alt="Собака на пляже" />
                    <p>Готовимся в отпуск с питомцем</p>
                </div>
                <div className="card-news vet-pharmacy">
                    <img src={vetPharmacy} alt="Собака в аптеке" />
                    <p>Новинки в разделе &laquo;Ветеринарная аптека&raquo;</p>
                </div>
            </div>
        </div>
    </>
}

export default News;