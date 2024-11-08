import './Nav.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/profile.png';
import { useEffect, useState } from 'react';
import { useGetUser } from '../ContextProvider/UserContextProvider.js';
import Profile from './Profile.js';
import BackButton from './BackButton.js';

export default function Nav() {
    const { pathname } = useLocation();
    const user = useGetUser();
    const [showProfile, setShowProfile] = useState(false);

    function toggleProfileContainer(e) {
        e.stopPropagation();
        setShowProfile(!showProfile);
    }

    function closeProfile() {
        setShowProfile(false);
    }

    useEffect(() => {
        if (showProfile) {
            document.addEventListener('click', closeProfile);
        }
        else {
            document.removeEventListener('click', closeProfile);
        }
        return () => {
            document.removeEventListener('click', closeProfile);
        }
    }, [showProfile])


    return (
        <>
            <nav id="topNav" className='bg-light border'>
                {pathname !== '/' && <BackButton />}
                <Link className="btn btn-dark" to='/'>Home</Link>
                <Link className="btn btn-dark" to='categories'>Categories</Link>
                <img onClick={toggleProfileContainer} src={user?.photoURL || logo} alt="logo" />
                {showProfile && <Profile onCloseProfile={closeProfile} />}
            </nav>
        </>
    )
};
