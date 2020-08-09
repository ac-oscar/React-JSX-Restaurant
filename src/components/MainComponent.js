import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
    fetchDishes,
    fetchComments,
    fetchPromotions,
    fetchLeaders,
    postComment,
    postFeedback
} from '../redux/ActionCreators';

import {
    Switch,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromotions: () => { dispatch(fetchPromotions()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')); },
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (values) => dispatch(postFeedback(values))
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchLeaders();
        this.props.postFeedback();
    }

    render() {
        const HomePage = () => <Home
            dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter(prom => prom.featured)[0]}
            promotionsLoading={this.props.promotions.isLoading}
            promotionsErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
        />

        const DishWithId = ({ match }) => <DishDetail
            dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
        />

        const MenuPage = () => <Menu dishes={this.props.dishes} />

        const AboutPage = () => <About leaders={this.props.leaders} />

        const ContactPage = () => <Contact
            resetFeedbackForm={this.props.resetFeedbackForm}
            postFeedback={this.props.postFeedback}
        />

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/menu' component={MenuPage} />
                            <Route path='/menu/:dishId' component={DishWithId} />
                            <Route exact path='/contactus' component={ContactPage} />
                            <Route exact path='/aboutus' component={AboutPage} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
