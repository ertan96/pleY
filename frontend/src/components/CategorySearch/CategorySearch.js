import './category.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CategorySearch = () => {
    const [showMenu,setShowMenu] = useState()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className="category-container">
                <div className="res-category" onClick={openMenu}>
                    <h1>Restaurants</h1>
                </div>
                {showMenu && (
                    <div className="categorySearch">
                    <Link to={`/search/American`}>
                        <h1>American</h1>
                    </Link>
                    <Link to={`/search/Japanese`}>
                        <h1>Japanese</h1>
                    </Link>
                    <Link to={`/search/Chinese`}>
                        <h1>Chinese</h1>
                    </Link>
                    <Link to={`/search/Vietnamese`}>
                        <h1>Vietnamese</h1>
                    </Link>
                    </div>
                )}
        </div>
        </>
    )
}

export default CategorySearch;