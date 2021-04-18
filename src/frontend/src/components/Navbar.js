import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
// import {FaSearch, FaUser, FaShoppingCart, FaPowerOff} from 'react-icons/lib/fa';
import FaSearch from "react-icons/lib/fa/search";
import FaUser from "react-icons/lib/fa/user";
import FaShoppingCart from "react-icons/lib/fa/shopping-cart";
import FaPowerOff from "react-icons/lib/fa/power-off";
import {common} from '../actions';
import s from '../screens/css/main.module.css'

class Navbar extends Component {

    state = {
        q: '',
        searching: false
    }

    logout = () => {
        if (this.props.user)
            this.props.logout(() => {
                this.props.history.push('/')
            })
    }

    search = () => {
        if (this.state.q !== '') {
            this.setState({searching: true})
            this.props.search(this.state.q, () => {
                this.setState({searching: false})
                this.props.history.push('/search')
            })
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
            this.search()
        }
    }

    render() {
        const {user, cartItemsCount} = this.props;
        if (screen.width >= 1000)
            return (
                <div className={s.navContainer}>
                    <div className={s.logoContainer} onClick={() => this.setState({q: ''})}>
                        <Link to='/' className={s.logoTitle}>ComfrtShop.Com</Link>
                        <p className={s.slogan}>All electronics at your comfort</p>
                    </div>
                    <div>
                        <input className={s.input} onKeyDown={this.handleKeyDown} placeholder='Search...'
                               onChange={e => this.setState({q: e.target.value})} value={this.state.q}/>
                        {this.state.searching ? <div className={s.searchIcon + ' ' + s.loader + ' ' + s.searchLoader}/>
                            : <FaSearch className={s.searchIcon} onClick={this.search}/>}
                    </div>
                    <div className={s.navRightSection}>
                        {!user ? <Link to='/register' className={s.navItem}>
                                <p>Log In</p>
                                <FaUser className={s.navIcon}/>
                            </Link> :
                            <Link to='/purchased' className={s.navItem}>
                                <p>{user.name}</p>
                                <FaUser className={s.navIcon}/>
                            </Link>}
                        <p className={s.separator}>|</p>
                        <Link to='/cart' className={s.navItem}>
                            <p>Cart</p>
                            <FaShoppingCart className={s.navIcon}/>
                            <p style={{marginLeft: '0.5vw'}}>{cartItemsCount}</p>
                        </Link>
                        {user && <p className={s.separator}>|</p>}
                        {user && <div className={s.logout} onClick={this.logout}>
                            <p>Logout</p>
                            <FaPowerOff className={s.navIcon}/>
                        </div>}
                    </div>
                </div>
            )
        return (
            <div className={s.navContainer}>
                <div className={s.navSec1}>
                    <Link to='/' className={s.logoTitle}>ComfrtShop.Com</Link>
                    <div className={s.navRightSection}>
                        {!user ? <Link to='/register' className={s.navItem}>
                                <p>Log In</p>
                            </Link> :
                            <Link to='/purchased' className={s.navItem}>
                                <p className={s.userName}>{user.name.split(' ')[0]}</p>
                                <FaUser className={s.navIcon}/>
                            </Link>}
                        <p className={s.separator}>|</p>
                        <Link to='/cart' className={s.navItem}>
                            <FaShoppingCart className={s.navIcon}/>
                            <p style={{marginLeft: '0.5vw'}}>{cartItemsCount}</p>
                        </Link>
                        {user && <p className={s.separator}>|</p>}
                        {user && <div className={s.logout} onClick={this.logout}>
                            <FaPowerOff className={s.navIcon}/>
                        </div>}


                    </div>
                </div>
                <div>
                    <input className={s.input} onKeyDown={this.handleKeyDown} placeholder='Search...'
                           onChange={e => this.setState({q: e.target.value})} value={this.state.q}/>
                    {this.state.searching ? <div className={s.searchIcon + ' ' + s.loader + ' ' + s.searchLoader}/>
                        : <FaSearch className={s.searchIcon} onClick={this.search}/>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.common.user,
        cartItemsCount: Object.keys(state.common.cart).length
    }
}


export default connect(mapStateToProps, {...common})(Navbar);