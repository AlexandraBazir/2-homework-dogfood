import Card from "../components/Card";

const Catalog = ({ goods, user, setActive }) => {
    return <div className="container">
        {user && <>
            <h1 style={{ margin: 0, gridColumnEnd: "span 3" }}>Каталог</h1>
            {goods.map((pro, i) => (
                <Card key={i} img={pro.pictures} name={pro.name} price={pro.price} />))}
        </>}
        {!user && <>
            <span className="info-link"
                onClick={() => setActive(true)}>Авторизуйтесь</span>, чтобы получить доступ к сайту</>}
    </div>
}

export default Catalog;