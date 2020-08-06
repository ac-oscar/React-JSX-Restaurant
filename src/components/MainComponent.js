import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { connect } from 'react-redux';
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

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const HomePage = () => <Home
            dish={this.props.dishes.filter(dish => dish.featured)[0]}
            promotion={this.props.promotions.filter(prom => prom.featured)[0]}
            leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />

        const DishWithId = ({ match }) => <DishDetail
            dish={this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
            comments={this.props.comments.filter(comment => comment.id === parseInt(match.params.dishId, 10))[0]}
        />

        const MenuPage = () => <Menu dishes={this.props.dishes} />

        const AboutPage = () => <About leaders={this.props.leaders} />

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={MenuPage} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' component={AboutPage} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
