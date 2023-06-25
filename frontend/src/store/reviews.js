import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const getReview = reviewId => state => {
    return state?.reviews ? state.reviews[reviewId] : null;
}

export const getReviews = state => {
    return state?.reviews ? Object.values(state.reviews) : [];
}

export const fetchReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(receiveReviews(reviews));
    }
};

export const fetchReview = reviewId => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
    }
};

export const createReview = review => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    
    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
        return review;
    }
};

export const updateReview = review => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
        
    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
        return review;
    }
};

export const deleteReview = reviewId => async (dispatch) => {
    const response = await csrfFetch (`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
};

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_REVIEWS:
            const { reviews } = action;
            const newState = { ...state };
            reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        case RECEIVE_REVIEW:
            return { ...state, [action.review.id]: action.review };
        case REMOVE_REVIEW:
            const updatedState = { ...state };
            delete updatedState[action.reviewId];
            return updatedState;
        default:
            return state;
    }
};

export default reviewsReducer;