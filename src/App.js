import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import HomePage from './components/WorldMap/HomePage';
import Country from './components/WorldMap/Country';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/world-map" />
                    </Route>
                    <Route path="/world-map" exact component={HomePage} />
                    <Route path="/world-map/country" component={Country} />
                    <Route path="/about" component={About} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
