import 'bootstrap/dist/css/bootstrap.min.css';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { selectUser } from '~/features/userSlice';
import { privateRoutes, publicRoutes } from '~/routes';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

function App() {
    const user = useSelector(selectUser);

    return (
        <Router>
            <ScrollToTop>
                <Navbar />

                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}

                    {user &&
                        privateRoutes.map((route, index) => {
                            const Page = route.component;

                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                <Footer />
            </ScrollToTop>
        </Router>
    );
}

export default App;
