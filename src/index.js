import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import {
    BrowserRouter,
    Link,
    Switch,
    Route
} from 'react-router-dom';

const BeansAPI = {
    beans: [
        { number: 1, description: "A really smooth taste.", price: 3.50 },
        { number: 2, description: "Bold, bright, vivacious.", price: 4.75 },
        { number: 3, description: "Subtly sweet, simple, slick.", price: 3.00 },
        { number: 4, description: "Dark, deep, dangerous.", price: 9.99 }
    ],
    all: function() { return this.beans },
    get: function(id) {
        const isBean = b => b.number === id
        return this.beans.find(isBean)
    }
}

const Display = (props) => (
    <div className="App">
        <Header />
        <Main isLoggedIn={props.isLoggedIn} authorized={props.authorized}/>
    </div>
);

const Main = (props) => (
    <main>
        <Switch>
            <Route 
                exact path="/"
                render={() => <Home isLoggedIn={props.isLoggedIn} authorized={props.authorized} />}
            />
            <Route path="/beans" component={Beans} />
        </Switch>
    </main>
)

const Header = () => (
    <header>
        <nav>
            <h1>coffee.ai</h1>
            <ul className="Nav-links">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/beans'>All Beans</Link></li>
            </ul>
        </nav>
    </header>
)

const Home = (props) => (
    <div><input type="checkbox" onClick={() => props.isLoggedIn()}/>Logged In ({`authorized: ${props.authorized}`})</div>
)

const Beans = () => (
    <div>Beans Component</div>
)

class App extends Component {
    constructor() {
        super();
        this.state = { authorized: true };
    }

    isLoggedIn = () => {
        this.setState({ authorized: !this.state.authorized })
    }

    render() {
        return (
            <div>
                <Display
                    isLoggedIn={this.isLoggedIn}
                    authorized={this.state.authorized}
                />
            </div>
        )
    }
}

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));