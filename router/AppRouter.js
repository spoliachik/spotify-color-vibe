import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../src/App';
import Login from '../src/Login';
import SongSearch from '../src/SongSearch';

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Switch>
                        <Route path="/" component={Login} exact={true} />
                        <Route path="/home" component = {App}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter;