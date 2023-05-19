import Card from "../components/Card";

const Catalog = ({ goods, user, setActive }) => {
    return <div className="container">
        {user && <>
            <h1 style={{ margin: 0, justifySelf: "flex-start" }}>Каталог</h1>
            <div className="container-card">{goods.map((pro, i) => (
                <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />))}</div>
        </>}
        {!user && <>
            <span className="info-link"
                onClick={() => setActive(true)}>Авторизуйтесь, чтобы получить доступ к сайту</span></>}
    </div>
}

export default Catalog;