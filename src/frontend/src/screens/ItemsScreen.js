import React, {Component} from "react";
import {connect} from 'react-redux'
import s from "./css/main.module.css";
import {common} from '../actions'
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom";
import Item from '../components/Item';
import ItemsHeader from "../components/ItemsHeader";

class ItemsScreen extends Component {


    componentDidMount() {
        this.props.fetchCategoryItems(this.props.match.params.category)
    }


    compare = (a, b) => {
        const {sortParam} = this.props;
        if (sortParam === 'PHL') {
            if (a.price > b.price) {
                return -1;
            } else if (a.price < b.price) {
                return 1;
            } else {
                return 0;
            }
        } else if (sortParam === 'PLH') {
            if (a.price < b.price) {
                return -1;
            } else if (a.price > b.price) {
                return 1;
            } else {
                return 0;
            }
        } else if (sortParam === 'RHL') {
            if (a.rating > b.rating) {
                return -1;
            } else if (a.rating < b.rating) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (a.rating < b.rating) {
                return -1;
            } else if (a.rating > b.rating) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    render() {
        const items = this.props.items.sort(this.compare)
        let display_name = this.props.match.params.category.split(/(?=[A-Z])/);
        if (display_name.length === 1)
            display_name = this.props.match.params.category
        else
            display_name = display_name[0] + ' ' + display_name[1]
        return (
            <div className={s.container} style={{paddingTop: '1vh'}}>
                <ItemsHeader title={display_name}/>
                {items.map(item => {
                    return (
                        <Item item={item}/>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.common.user,
        items: state.items[ownProps.match.params.category] ? Object.values(state.items[ownProps.match.params.category]) : [],
        sortParam: state.common.sortParam
    }
}

export default connect(mapStateToProps, {...common})(ItemsScreen);