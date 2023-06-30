import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSearch } from '../../store/businesses';
import './SearchBar.css'
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({searchTerm}) => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(searchInput));
        if (searchInput === "") {
            history.push('/search/');
        } else {
            history.push(`/search/${searchInput}`);
        }
        setSearchInput('');
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className='search-form-container'>
                <input className='search-text-box'
                    type='text'
                    value={searchInput}
                    placeholder='American, Japanese, Vietnamese, Chinese'
                    onChange={e => setSearchInput(e.target.value)}
                    required
                />
                <button type='submit' className='fisearch-button'><FiSearch size={24}/></button>
            </div>
        </form>
    )
}

export default SearchBar;