import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    FormGroup
} from 'reactstrap';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toogleModal = this.toogleModal.bind(this);
    }

    handleSubmit(values) {
        this.toogleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toogleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toogleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comments
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toogleModal}>
                    <ModalHeader toggle={this.toogleModal}>Submit Comments</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="txtRating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select >
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text
                                    model=".author"
                                    id="txxtAuthor"
                                    name="author"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less',
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea
                                    model=".comment"
                                    id="txtComment"
                                    name="comment"
                                    rows="6"
                                    className="form-control"
                                />
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({ dish }) {
    if (dish !== null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    else {
        return (<div></div>);
    }
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments !== null) {
        const cm = comments.map(cm => {
            return (
                <Fade in>
                    <li key={cm.id} >
                        <p>{cm.comment}</p>
                        <p>-- {cm.author}, {new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(cm.date)))} </p>
                    </li>
                </Fade>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {cm}
                    </Stagger>
                </ul>
                <br />
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }
    else {
        return (<div></div>);
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish !== null && props.dish !== undefined) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                </div>
            </div>
        );
    }
    else {
        return (<div></div>)
    }
}

export default DishDetail;