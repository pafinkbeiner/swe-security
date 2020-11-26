import React, { Component } from "react";
import axios from 'axios';
import './Items.scss';

export default class Items extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount(){

    axios.get('http://localhost:5001/items', {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }
    }).then(res => {
        this.setState({items: res.data})
    }).catch(err => {
        console.log(err);
    });
  }

  render() {
    return <div className="container">
        <h1>Items</h1>
        <div className="item-container">
            {
                this.state.items.map(item => {
                    return <div key={item.name} className="item">
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        {item.image.map(image => {
                            return <img key={image} alt="image" height={100} src={image}/>
                        })}
                    </div>
                })
            }
        </div>
    </div>
  }
}
