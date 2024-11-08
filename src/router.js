import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute.js';
import Index from './pages/Index/Index.js';
import Login from './pages/Login/Login.js';
import SignUp from './pages/SignUp/SignUp.js';
import Error from './pages/Error/Error.js';
import SubscribeOffline from './Components/SubscribeOffline.js';
import Categories from './pages/Categories/Index.js';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<SubscribeOffline />}>
            <Route path='/' element={<ProtectedRoute />}>
                <Route index element={<Index />} />
                <Route path='categories' element={<Categories />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Error />} />
        </Route>
    )
);
export default router;