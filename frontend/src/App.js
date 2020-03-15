import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from "./config/configApollo";
import Login from "./views/Login/Login";
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));

const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>}/>
                            <Route exact path="/register" name="Register Page"
                                   render={props => <Register {...props}/>}/>
                            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>}/>
                            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>}/>
                            <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>}/>
                        </Switch>
                    </React.Suspense>
                </ApolloProvider>
            </BrowserRouter>
        );
    }
}

export default App;
