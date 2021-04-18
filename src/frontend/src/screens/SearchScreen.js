import React, {Component} from "react";
import {connect} from 'react-redux'
import s from "./css/main.module.css";
import Item from '../components/Item';
import ItemsHeader from "../components/ItemsHeader";

class SearchScreen extends Component {

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
        return (
            <div className={s.container} style={{paddingTop: '1vh'}}>
                 <ItemsHeader title={`Results for "${this.props.q}"`}/>
                {items.map(item => {
                    return (
                        <Item item={item}/>
                    )
                })}
                {this.props.items.length === 0 && <p className={s.emptyCart}>No results for "{this.props.q}"!</p>}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        items: state.search.items,
        q: state.search.q,
        sortParam: state.common.sortParam
    }
}

export default connect(mapStateToProps, null)(SearchScreen);