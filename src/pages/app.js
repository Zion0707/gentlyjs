import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    // NavLink as Link,
} from 'react-router-dom';
import routers from '@/routers';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const store = this.props.store;
        return (
            <>
                <Router>
                    {/* <ul className="nav">
                        {routers.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.path} exact={item.exact}>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul> */}
                    {routers.map((item, index) => {
                        return (
                            <Route
                                key={index}
                                exact={item.exact}
                                path={item.path}
                                render={props => (
                                    <item.component
                                        {...props}
                                        store={store}
                                        routers={item.child}
                                    />
                                )}
                            />
                        );
                    })}
                </Router>
            </>
        );
    }
}

export default App;
