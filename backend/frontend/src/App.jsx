
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Boy from './pages/Boy';
import Contact from './pages/contact';
import Baby from './pages/Babys';
import Girls from './pages/Girls';
import Cart from './pages/cart';
import ViewCloths from './pages/ViewCloths';
import CheckOut from './pages/CheckOut';
import Succsus from './pages/Succsus';

function App() {
    console.log("Rendering App component");
    return (
        <>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Boy" element={<Boy />} />
                        <Route path="/Baby" element={<Baby />} />
                        <Route path="/Girls" element={<Girls />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/checkout" element={<CheckOut />} />
                        <Route path="/success" element={<Succsus />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/cloth/:id" element={<ViewCloths />} />

                    </Routes>
                </div>
            </Router>
        </>
    );

}
export default App