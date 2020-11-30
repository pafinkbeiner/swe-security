import React, { Component } from "react";
import axios from "axios";
import "./Items.scss";
import { Link } from "react-router-dom";

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/items`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        this.setState({ items: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Items</h1>
        <div className="item-container">
          {this.state.items.map((item) => {
            return (
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.image[0]}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.price}€</p>
                  <Link to={`/items/${item.name}`} className="btn btn-primary">
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
