
import React, { useEffect, useState } from "react";
import './style.css';
import { useDispatch } from "react-redux";
import { clearPost, getAllPosts } from "../container/Home/actions";

const Header = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    const dispatch =useDispatch()
    const handleSearchTermChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
    };

    const searchFunction = async (term) => {
        try {
            dispatch(getAllPosts({page,query:term}));
        } catch (error) {
        }
    };

    useEffect(() => {
       if(searchTerm.length>0){
        const timerId = setTimeout(() => {
            dispatch(clearPost())
            searchFunction(searchTerm);
        }, 2000); 

        return () => clearTimeout(timerId);

       }

    }, [searchTerm]);

    return (
        <div className="header-container">
            <input
                className="header-search"
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
        </div>
    );
};

export default Header;

