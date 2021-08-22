import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/about' && (
                <footer>
                    <Link className="App-link" to="/">
                        Home Page
                    </Link>
                    <p>Developed by Aadhin Karthik</p>
                    <Link className="App-link" to="/about">
                        About
                    </Link>
                </footer>
            )}
        </>
    );
};

export default Footer;
