import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { Carousel } from "react-bootstrap";
import "./SelectedItem.scss";

export default class SelectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
      user: undefined,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
    axios
      .get(`${process.env.REACT_APP_API_URL}/items/${this.props.match.params.name}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        this.setState({ item: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/decodeJWT`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        if (res) {
          this.setState({ user: res.data });
        } else {
          this.setState({ user: undefined });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.item !== undefined) {
      return (
        <>
          <Navigation />
          <div className="container">
            <h1>{this.state.item.name}</h1>
            <div class="row">
              <div class="col-9">
                <Carousel>
                  {this.state.item.image.map((image) => {
                    return (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={image}
                          key={image}
                          alt="image"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
                <div className="description">
                  <p>{this.state.item.description}</p>
                </div>
              </div>
              <div class="col">
                <div className="price">
                  <p>{this.state.item.price}€</p>

                  { (this.state.user != undefined && ( this.state.user.role == 1 || this.state.user.role == 2)) ? 
                            <Link
                            type="button"
                            class="btn btn-primary btn-lg"
                            to={`/purchase/${this.state.item.name}`}
                          >
                            Purchase
                          </Link>
                    :
                        <Link
                        type="button"
                        class="btn btn-primary btn-lg" disabled
                        to={`/`}
                      >
                        Log in to Purchase
                      </Link>
                    
                  }

                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div></div>;
    }
  }
}
