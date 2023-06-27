import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSearch } from '../../store/businesses';
import './SearchBar.css'

const SearchBar = ({searchTerm}) => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(searchInput));
        history.push(`/search/${searchInput}`);
        setSearchInput('');
    };



    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type='text'
                    value={searchInput}
                    placeholder='Japanese, Vietnamese, American'
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button type='submit'>Search</button>
            </div>
        </form>
    )
}

export default SearchBar;