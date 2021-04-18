import s from "../screens/css/main.module.css";
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import FaStar from "react-icons/lib/fa/star";
import FaStarHalfEmpty from "react-icons/lib/fa/star-half-empty";
import FaStarO from "react-icons/lib/fa/star-o";

class Item extends Component {


    render() {
        const {item} = this.props;
        const rating = Math.floor(item.rating)
        const stars = []
        let count = 0;
        const fontSize = screen.width >= 1000 ? '1.1vw' : '4vw'
        for (let i = 0; i < rating; i++) {
            count += 1
            stars.push(<FaStar color="#ffd700" style={{fontSize}}/>)
        }
        if (item.rating % 1 > 0.49) {
            count += 1
            stars.push(<FaStarHalfEmpty color="#ffd700" style={{fontSize}}/>)
        }
        for (let i = count; i < 5; i++) {
            stars.push(<FaStarO color="#ffd700" style={{fontSize}}/>)
        }
        return (
            <Link to={`/items/${item.category.name}/${item.id}`} className={s.itemContainer}>
                <img src={item.uri} className={s.itemImg}/>
                <div className={s.itemInfo}>
                    <p className={s.itemName}>{item.name}</p>
                    <div className={s.ratingContainer} id='stars'>
                        {stars}
                        <p className={s.ratingCount}>{item.rating_count}</p>
                    </div>
                    <p className={s.price}>AED {item.price}.00</p>
                </div>
            </Link>
        )
    }
}


export default Item;