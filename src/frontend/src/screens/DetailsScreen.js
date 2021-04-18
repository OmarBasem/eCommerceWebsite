import React, {Component} from "react";
import {connect} from 'react-redux'
import s from "./css/main.module.css";
import {common} from '../actions'
import ReactStars from "react-rating-stars-component";


class DetailsScreen extends Component {

    addToCart = () => {
        this.props.addToCart(this.props.item)
    }

    removeItem = () => {
        this.props.removeItem(this.props.item)
    }

    render() {
        const {item, inCart} = this.props;
        if (screen.width >= 1000)
            return (
                <div className={s.container} style={{paddingTop: '4vh'}}>
                    <div className={s.detailContainer}>
                        <img src={item.uri} className={s.detailImg}/>
                        <div className={s.details}>
                            <p className={s.itemNameDtl}>{item.name}</p>
                            <div className={s.ratingContainer}>
                                <ReactStars
                                    isHalf
                                    count={5}
                                    value={item.rating}
                                    size={20}
                                    activeColor="#ffd700"
                                    color='lightgrey'
                                />
                                <p className={s.ratingCount}>{item.rating_count}</p>
                            </div>
                            <div className={s.priceContainer}>
                                <p className={s.price} style={{color: '#B12805'}}>AED {item.price}.00</p>
                                <div>
                                    {!inCart ? <div className={s.button} onClick={this.addToCart}>
                                            <p className={s.buttonText}>Add to Cart</p>
                                        </div> :
                                        <div className={s.button + ' ' + s.addedButton}
                                             style={{background: 'limegreen'}}>
                                            <p className={s.buttonText}>Added to Cart</p>
                                        </div>}
                                    {inCart && <p onClick={this.removeItem} className={s.removeItem}>Remove Item</p>}
                                </div>
                            </div>
                            <div className={s.hLine}/>
                            <p className={s.description}>• {item.description.replaceAll('. ', '.\n• ')}</p>
                        </div>
                    </div>

                </div>
            )
        return (
            <div className={s.container}>
                <p className={s.itemNameDtl}>{item.name}</p>
                <img src={item.uri} className={s.detailImg}/>
                <p className={s.description}>• {item.description.replaceAll('. ', '.\n• ')}</p>
                <div className={s.ratingContainer}>
                    <ReactStars
                        isHalf
                        count={5}
                        value={item.rating}
                        size={20}
                        activeColor="#ffd700"
                        color='lightgrey'
                    />
                    <p className={s.ratingCount}>{item.rating_count}</p>
                </div>
                <div className={s.priceContainer}>
                        <p className={s.price} style={{color: '#B12805'}}>AED {item.price}.00</p>
                        <div>
                            {!inCart ? <div className={s.button} onClick={this.addToCart}>
                                    <p className={s.buttonText}>Add to Cart</p>
                                </div> :
                                <div className={s.button + ' ' + s.addedButton}
                                     style={{background: 'limegreen'}}>
                                    <p className={s.buttonText}>Added to Cart</p>
                                </div>}
                            {inCart && <p onClick={this.removeItem} className={s.removeItem}>Remove Item</p>}
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.common.user,
        item: state.items[ownProps.match.params.category][ownProps.match.params.id],
        inCart: state.common.cart[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {...common})(DetailsScreen);