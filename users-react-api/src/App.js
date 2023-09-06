import React from 'react';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { User } from './Pages/User/ui/User';
import { UserRegister } from './Pages/UserRegister';
import { UserEdit } from './Pages/UserEdit';
import { NotFoundPage } from './Pages/NoteFoundPage';

const App = () => {
    return (
        <>
            <Header />
            <Container maxWidth="lg" className='main-conrainer'>
                <Routes>
                    <Route path="/" element={ <Home /> }/>
                    <Route path="/users/:id" element={ <User /> }/>
                    <Route path="/user-register" element={ <UserRegister /> }/>
                    <Route path="/edit/:id" element={ <UserEdit /> }/>
                    <Route path="*" element={ <NotFoundPage /> }/>
                </Routes>
            </Container>
            <Footer />
        </>
    );
}

export default App;
