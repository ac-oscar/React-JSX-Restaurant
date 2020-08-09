import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText} `);
                error.response = response;
                throw error;
            }
        }, error => {
            throw error;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log(`post comments, ${error.message}`); alert(`Your comment could not be posted\nError: ${error.message}`); });
};

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText} `);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText} `);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText} `);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error)));
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promotionsFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(`Error ${response.status}: ${response.statusText} `);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (values) => (dispatch) => {

    if (values !== null && values !== undefined) {

        const newFeedBack = {
            firstname: values.firstname,
            lastname: values.lastname,
            telnum: values.telnum,
            email: values.email,
            agree: values.agree,
            contactType: values.contactType,
            message: values.message
        };

        newFeedBack.date = new Date().toISOString();

        return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(newFeedBack),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error(`Error ${response.status}: ${response.statusText} `);
                    error.response = response;
                    throw error;
                }
            }, error => {
                throw error;
            })
            .then(response => response.json())
            .then(response => alert(`Thank you for your feedback!\n ${JSON.stringify(response)}`))
            .catch(error => { console.log(`post feeback, ${error.message}`); alert(`Your feedback could not be posted\nError: ${error.message}`); });
    }
};