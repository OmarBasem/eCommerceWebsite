import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import configureStore from './store';
import {PersistGate} from 'redux-persist/integration/react';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from "./screens/RegisterScreen";
import ItemsScreen from './screens/ItemsScreen';
import DetailsScreen from "./screens/DetailsScreen";
import CartScreen from './screens/CartScreen'
import CheckoutScreen from "./screens/CheckoutScreen";
import PurchasedScreen from "./screens/PurchasedScreen";
import SearchScreen from "./screens/SearchScreen";
import App from './App';
import ScrollToTop from "./ScrollToTop";

const {persistor, store} = configureStore();

class RootContainer extends Component {

    render() {
        return (
            <BrowserRouter>
                <ScrollToTop>
                    <App>
                        <Switch>
                            <Route exact path='/' component={HomeScreen}/>
                            <Route exact path='/register' component={RegisterScreen}/>
                            <Route exact path='/items/:category' component={ItemsScreen}/>
                            <Route exact path='/items/:category/:id' component={DetailsScreen}/>
                            <Route exact path='/cart' component={CartScreen}/>
                            <Route exact path='/checkout' component={CheckoutScreen}/>
                            <Route exact path='/purchased' component={PurchasedScreen}/>
                            <Route exact path='/search' component={SearchScreen}/>
                        </Switch>
                    </App>
                </ScrollToTop>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>

            <RootContainer/>

        </PersistGate>
    </Provider>,

    document.getElementById('root')
);



