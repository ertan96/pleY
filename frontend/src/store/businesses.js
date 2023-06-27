export const RECEIVE_BUSINESSES = 'businesses/RECEIVE_BUSINESSES';
export const RECEIVE_BUSINESS = 'businesses/RECEIVE_BUSINESS';
export const RECEIVE_SEARCH_RESULTS = 'businesses/RECEIVE_SEARCH_RESULTS';

const receiveBusinesses = businesses => ({
    type: RECEIVE_BUSINESSES,
    businesses
});

const receiveBusiness = business => ({
    type: RECEIVE_BUSINESS,
    business
});

const receiveSearchResults = results => ({
    type: RECEIVE_SEARCH_RESULTS,
    results
})

export const getBusiness = businessId => state => {
    return state?.businesses ? state.businesses[businessId] : null;
}

export const getBusinesses = state => {
    return state?.searchResults.length > 0 ? state.searchResults : state?.businesses ? Object.values(state.businesses) : [];
}

export const fetchBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/businesses');

    if (response.ok) {
        const businesses = await response.json();
        dispatch(receiveBusinesses(businesses));
    }
};

export const fetchBusiness = businessId => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`);

    if (response.ok) {
        const business = await response.json();
        dispatch(receiveBusiness(business));
    }
};

export const fetchSearch = term => async (dispatch) => {
    const response = await fetch (`/api/businesses/search?query=${term}`)

    if (response.ok) {
        const results = await response.json();
        dispatch(receiveSearchResults(results))
    }
}

const businessesReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_RESULTS:
            return { ...action.results};
        case RECEIVE_BUSINESSES:
            return { ...action.businesses };
        case RECEIVE_BUSINESS:
            return { ...state, [action.business.id]: action.business };
        default:
            return state;
    }
}

export default businessesReducer;