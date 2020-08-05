import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const HomePage = () => <Home
            dish={this.state.dishes.filter(dish => dish.featured)[0]}
            promotion={this.state.promotions.filter(prom => prom.featured)[0]}
            leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />

        const DishWithId = ({ match }) => <DishDetail
            dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
            comments={this.state.comments.filter(comment => comment.id === parseInt(match.params.dishId, 10))[0]}
        />

        const MenuPage = () => <Menu dishes={this.state.dishes} />

        const AboutPage = () => <About leaders={this.state.leaders} />

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

export default Main;
