import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Dishes } from './dishes';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};

