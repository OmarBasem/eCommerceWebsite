import s from "../screens/css/main.module.css";
import React, {Component} from "react";
import {connect} from 'react-redux'
import {common} from '../actions';


class ItemsHeader extends Component {

    sort = (e) => {
        this.props.sort(e.target.value)
    }

    render() {
        return (
            <div className={s.itemsHeader}>
                <p className={s.categoryTitle}>{this.props.title}</p>
                <select className={s.sortDropDown} onChange={this.sort} value={this.props.sortParam}>
                    <option value="PHL">Price: High to Low</option>
                    <option value="PLH">Price: Low to High</option>
                    <option value="RHL">Rating: High to Low</option>
                    <option value="RLH">Rating: Low to High</option>
                </select>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sortParam: state.common.sortParam
    }
}

export default connect(mapStateToProps, {...common})(ItemsHeader);