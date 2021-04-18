import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {common} from '../actions'

import s from './css/main.module.css'

class HomeScreen extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        return (
            <div className={s.container}>
                {this.props.categories.map(category => {
                    let display_name = category.name.split(/(?=[A-Z])/);
                    if (display_name.length === 1)
                        display_name = category.name
                    else
                        display_name = display_name[0] + ' ' + display_name[1]
                    return (
                        <Link to={`/items/${category.name}`} className={s.categoryContainer}>
                            <img src={category.uri} className={s.img}/>
                            <p className={s.itemTitle}>{display_name}</p>
                        </Link>
                    )
                })}
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        user: state.common.user,
        categories: state.common.categories || []
    }
}

export default connect(mapStateToProps, {...common})(HomeScreen);