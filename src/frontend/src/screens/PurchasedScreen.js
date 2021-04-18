import React, {Component} from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import s from "./css/main.module.css";
import {common} from '../actions'


class PurchasedScreen extends Component {

    componentDidMount() {
        if (this.props.user)
            this.props.fetchPurchases()
    }

    render() {
        let {purchases} = this.props
        if (purchases.length === 0)
            return (
                <div className={s.container} style={{paddingTop: '1vh'}}>
                    <h1 className={s.categoryTitle}>Purchase History</h1>
                    <p className={s.emptyCart}>Your purchased Items will appear here!</p>
                </div>
            )
        purchases = purchases.reverse()
        return (
            <div className={s.container} style={{paddingTop: '1vh'}}>
                <h1 className={s.categoryTitle}>Purchase History</h1>
                <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                {purchases.map(purchase => {
                    const {item, refNum} = purchase
                    const date = new Date(purchase.timestamp)
                    const fullDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
                    return (
                        <div>
                            <div className={s.cartItem}>
                                <img src={item.uri} className={s.itemImg}/>
                                <div className={s.itemInfo}>
                                    <p className={s.itemNameDtl}>{item.name}</p>
                                    <p className={s.inStock}>Processing Order</p>
                                    <p className={s.price} style={{fontSize: screen.width >= 1000 ? '1vw' : '4.5vw'}}>AED {item.price}.00</p>
                                    <p className={s.purchased}>Purchased on: {fullDate}</p>
                                    <p className={s.purchased}>Ref. No.: {refNum}</p>
                                </div>
                            </div>
                            <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        purchases: state.common.purchased,
        user: state.common.user
    }
}

export default connect(mapStateToProps, {...common})(PurchasedScreen);