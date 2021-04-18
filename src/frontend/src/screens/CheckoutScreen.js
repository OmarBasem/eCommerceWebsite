import React, {Component} from "react";
import {connect} from 'react-redux'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {CountryDropdown, RegionDropdown, CountryRegionData} from 'react-country-region-selector';

import s from "./css/main.module.css";
import {common} from '../actions'

const API_KEY = "T1QtNjI5ODcwOkItcWEyLTAtNjA0NDdiYmQtMC0zMDJjMDIxNDQyNTcxODZiYjE4YmQ5ZWQ2MDUwNWFlODMyODBmODFlM2JmZmYxNzUwMjE0Mjc1ZGFiMjA1ZDFkOWU2Y2MxYjQ1Yzc0YmQ2ZmM1NDI1Y2NlNGNiZA==";
const OPTIONS = {
    environment: "TEST",
    accountId: "1001969460",
    card: {
        cardBin: null
    }
};


class CheckoutScreen extends Component {

    constructor(props) {
        super(props);
        let total = 0;
        let ids = []
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price;
            ids.push(items[i].id)
        }
        this.state = {
            total,
            ids,
            country: this.props.address.country || '',
            city: this.props.address.city || '',
            street: this.props.address.street || '',
            building: this.props.address.building || '',
            processing: false,
            cardNum: '',
            expDate: '',
            cvv: '',
            holderName: this.props.user.name
        }
    }


    pay = () => {
        let {country, city, street, building, total, cardNum, holderName, expDate} = this.state;
        cardNum = cardNum.replace(/\s/g, '');
        if (country === '' || city === '' || street === '' || building === '') {
            alert('Please, complete your address!')
        } else {
            this.setState({processing: true})
            OPTIONS.card.cardBin = cardNum.slice(0, 7)
            window.paysafe.threedsecure.start(API_KEY, OPTIONS, (deviceFingerprintingId, error) => {
                if (error) {
                    alert("Setup error: " + error.code + " " + error.detailedMessage);
                } else {
                    console.log('DEVICE FINGER PRINT ID', deviceFingerprintingId)
                    this.props.makePayment(this.state.ids, deviceFingerprintingId, total, {
                        cardNum,
                        holderName,
                        expDate
                    }, {
                        country,
                        city,
                        street,
                        building
                    }, () => {
                        this.props.history.push('/purchased')

                    }, () => this.setState({processing: false}))
                }
            });
        }
    }

    cardNumChange = e => {
        let cardNum = e.target.value;
        if (cardNum.length > this.state.cardNum.length && (cardNum.length === 4 || cardNum.length === 9 || cardNum.length === 14)) {
            cardNum += ' '
        } else if (cardNum.length < this.state.cardNum.length && (cardNum.length === 5 || cardNum.length === 10 || cardNum.length === 15))
            cardNum = cardNum.slice(0, cardNum.length - 1)
        this.setState({cardNum})
    }

    expDateChange = e => {
        let expDate = e.target.value;
        if (expDate.length > this.state.expDate.length && expDate.length === 2)
            expDate += '/'
        else if (expDate.length < this.state.expDate.length && expDate.length === 3)
            expDate = expDate.slice(0, expDate.length - 1)
        this.setState({expDate})
    }

    autofill = () => {
        this.setState({cardNum: '4000 0000 0000 1000', expDate: '11/22', cvv: '111'})
    }

    render() {
        const {items} = this.props;
        const {processing} = this.state;
        return (
            <div className={s.container} style={{paddingTop: '1vh'}}>
                <h1 className={s.categoryTitle}>Shipping & Payment</h1>
                <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                <div className={s.checkoutBox}>
                    <p className={s.itemNameDtl}>Enter your shipping address</p>
                    <label className={s.checkoutLabel} htmlFor='countrySelect'>Country</label>
                    <CountryDropdown className={s.dropDown} id='countrySelect'
                                     value={this.state.country}
                                     onChange={(country) => this.setState({country})}/>
                    <label className={s.checkoutLabel}>City</label>
                    <input onChange={e => this.setState({city: e.target.value})} value={this.state.city}/>
                    <label className={s.checkoutLabel}>Street Address</label>
                    <input onChange={e => this.setState({street: e.target.value})} value={this.state.street}/>
                    <label className={s.checkoutLabel}>Building Name/No.</label>
                    <input onChange={e => this.setState({building: e.target.value})} value={this.state.building}/>
                </div>
                <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                <div className={s.checkoutBox}>
                    <p className={s.itemNameDtl}>Enter Your Card Details</p>
                    <div className={s.button} style={{background: 'grey', marginBottom: '2vh'}} onClick={this.autofill}><p
                        className={s.buttonText}>Autofill Test Credit Card</p></div>
                    <label className={s.checkoutLabel} htmlFor='card-number'>Card Number</label>
                    <input onChange={this.cardNumChange} value={this.state.cardNum} maxLength={19}/>
                    <label className={s.checkoutLabel} htmlFor='holder-name'>Card Holder Name</label>
                    <input onChange={e => this.setState({holderName: e.target.value})} value={this.state.holderName}/>
                    <label className={s.checkoutLabel} htmlFor='expiration-date'>Expiration Date</label>
                    <input placeholder='MM/YY' onChange={this.expDateChange} value={this.state.expDate} maxLength={5}/>
                    <label className={s.checkoutLabel} htmlFor='cvv'>CVV Code</label>
                    <input onChange={e => this.setState({cvv: e.target.value})} value={this.state.cvv} maxLength={3}/>
                </div>
                <div className={s.hLine} style={{width: screen.width >= 1000 ? '55vw' : '90vw'}}/>
                <div className={s.totalContainer}>
                    <p style={{fontSize: screen.width >= 1000 ? '1vw' : '4.5vw'}}>Total
                        ({items.length} item{items.length !== 1})</p>
                    <p style={{
                        fontSize: screen.width >= 1000 ? '1vw' : '4.5vw',
                        fontWeight: 'bold'
                    }}>AED {this.state.total}.00</p>
                    <div className={s.button} style={{width: screen.width >= 1000 ? '10vw' : '90vw'}}
                         onClick={this.pay}>
                        {processing ? <div className={s.loader}/> :
                            <p className={s.buttonText} style={{paddingLeft: '2vw', paddingRight: '2vw'}}>Place
                                Order</p>}
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        items: Object.values(state.common.cart),
        address: state.common.address || {},
        user: state.common.user
    }
}

export default connect(mapStateToProps, {...common})(CheckoutScreen);