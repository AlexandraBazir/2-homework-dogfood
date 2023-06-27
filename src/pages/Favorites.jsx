import { useContext } from "react";
import Context from "../Context";
import Card from "../components/Card";

const Favorites = () => {
    const { userId, baseData, token } = useContext(Context);
    return <> <div className="container">
        <h1>Любимые товары</h1>
        <div className="container-card">
            {baseData.filter(el => el.likes.includes(userId)).map((pro) => (
                <Card key={pro._id} img={pro.pictures}
                    name={pro.name}
                    price={pro.price}
                    _id={pro._id}
                    likes={pro.likes}
                    userId={userId}
                    token={token}
                    discount={pro.discount}
                />
            ))}
        </div>
    </div>
    </>
}

export default Favorites;