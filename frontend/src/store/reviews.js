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
    const response = await fetch(`/api/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    
    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
    }
};

export const updateReview = review => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
        
    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
    }
};

export const deleteReview = reviewId => async (dispatch) => {
    const response = await fetch (`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
};

const reviewsReducer = (state = { byId: {} }, action) => {
    switch (action.type) {
        case RECEIVE_REVIEWS:
            const { reviews } = action;
            const newState = { ...state, byId: { ...state.byId } };
            reviews.forEach((review) => {
                const reviewId = review.id;
        
                if (newState.byId[reviewId]) {
                    newState.byId[reviewId] = { ...newState.byId[reviewId], ...review };
                } else {
                    newState.byId[reviewId] = review;
                }
            });
            return newState;
        case RECEIVE_REVIEW:
            return { ...state, byId: { ...state.byId, [action.review.id]: action.review } };
        case REMOVE_REVIEW:
            const updatedState = { ...state, byId: { ...state.byId } };
            delete updatedState.byId[action.reviewId];
            return updatedState;
        default:
            return state;
    }
};

export default reviewsReducer;