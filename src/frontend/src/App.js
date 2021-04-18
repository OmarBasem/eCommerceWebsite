import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer'

import s from './screens/css/main.module.css'

class App extends Component {


  render() {
    const {children} = this.props;
    return (
        <div className={s.body}>
            {this.props.location.pathname !== '/register' && <Navbar history={this.props.history} />}
            <div>{children}</div>
            <Footer />
        </div>

    )
  }
}



export default withRouter(App);