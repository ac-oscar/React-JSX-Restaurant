import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardText,
    CardBody,
    CardTitle,
    Media
} from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    renderDish(dish) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if (comments.length > 0) {
            return comments.map(comment => {
                return (
                    <Media key={comment.id} tag="li">
                        <Media body>
                            <Media>{comment.comment}</Media>
                            <p>--{comment.author}, {new Date(comment.date).toDateString()}</p>
                        </Media>
                    </Media>
                );
            });
        }
        else {
            return (<div></div>);
        }
    }

    render() {
        const dish = this.props.selectedDish;

        if (dish !== null) {
            return (
                <div className="row">
                    {this.renderDish(dish)}

                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>

                        <Media list>
                            {this.renderComments(dish.comments)}
                        </Media>

                    </div>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
    }
}

export default DishDetail;