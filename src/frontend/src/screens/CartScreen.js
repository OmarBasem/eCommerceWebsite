import React, {Component} from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import s from "./css/main.module.css";
import {common} from '../actions'


class CartScreen extends Component {

    constructor(props) {
        super(props);
        let total = 0;
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price;
        }
        this.state = {
            total
        }
    }

    removeItem = async (item) => {
        await this.props.removeItem(item)
        let total = 0;
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price;
        }
        this.setState({total})
    }

    render() {
        const {items, user} = this.props
        if (items.length === 0)
            return (
                <div className={s.container} style={{paddingTop: '1vh'}}>
                    <h1 className={s.categoryTitle} style={{width: '100vw'}}>Shopping Cart</h1>
                    <p className={s.emptyCart}>Your Shopping Cart is empty!</p>
                </div>
            )
        return (
            <div className={s.container} style={{paddingTop: '1vh'}}>
                <h1 className={s.categoryTitle} style={{width: '100vw'}}>Shopping Cart</h1>
                <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                {items.map(item => {
                    return (
                        <div>
                            <div className={s.cartItem}>
                                <img src={item.uri} className={s.itemImg}/>
                                <div className={s.itemInfo}>
                                    <p className={s.itemNameDtl}>{item.name}</p>
                                    <p className={s.inStock}>In Stock</p>
                                    <p className={s.price + ' ' + s.priceCart} style={{fontSize: screen.width >= 1000 ? '1vw' : '4.5vw'}}>AED {item.price}.00</p>
                                    <p onClick={this.removeItem.bind(this, item)} className={s.removeItem + ' ' + s.priceCart}
                                       style={{marginLeft: 0}}>Remove Item</p>
                                </div>
                            </div>
                            <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                        </div>
                    )
                })}
                <div className={s.totalContainer}>
                    <p style={{fontSize: screen.width >= 1000 ? '1vw' : '4.5vw'}}>Total ({items.length} item{items.length !== 1})</p>
                    <p style={{fontSize: screen.width >= 1000 ? '1vw' : '4.5vw', fontWeight: 'bold'}}>AED {this.state.total}.00</p>
                    <Link to={user ? '/checkout' : '/register'} className={s.button}>
                        <p className={s.buttonText} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>Checkout</p>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        items: Object.values(state.common.cart),
        user: state.common.user
    }
}

export default connect(mapStateToProps, {...common})(CartScreen);