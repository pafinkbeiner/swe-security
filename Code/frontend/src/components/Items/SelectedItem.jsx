import React, { Component } from "react";
import axios from "axios";

export default class SelectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params);
    axios
      .get(`http://localhost:5001/items/${this.props.match.params.name}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        this.setState({ item: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.item !== undefined) {
      return (
        <div className="container">
          <h1>{this.state.item.name}</h1>
          <div className="item-container">
            <div className="item">
              <p>{this.state.item.description}</p>
              {this.state.item.image.map((image) => {
                return <img key={image} alt="image" height={100} src={image} />;
              })}
              <p className="price">{this.state.item.price}€</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
