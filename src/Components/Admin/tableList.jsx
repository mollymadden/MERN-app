//This is the table of all items that the admin sees 

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./table.css";

const Item = props => (


  <tr>
    <td className="resize"><Link to={"/items/" + props.item._id}>{props.item.itemName}</Link></td>
    <td className="resize">{props.item.description}</td>
    <td>{props.item.firstName}</td>
    <td>{props.item.lastName}</td>
    <td>{props.item.phone}</td>
    <td>{props.item.address}</td>
    <td><a href={"mailto:" + props.item.email}>{props.item.email}</a></td>
    {/* <td>{props.item.email}</td> */}
    <td>{props.item.privacy}</td>
    <td><Link to={"/items/" + props.item._id}><img src={props.item.image} /></Link></td>
    {/* <td>{props.item.image}</td> */}
    <td>{props.item.delivery ? 'yes' : 'no'}</td>
    <td>{props.item.published ? 'yes' : 'no'}</td>

    <td className="icons">
      <Link to={"/items/edit/" + props.item._id}>📝</Link>

      {/* <a href="#" onClick={window.confirm("Are you sure you want to delete this item?")}>🗑</a> */}

      <a href="#" onClick={() => { if (window.confirm('Are you sure you want to delete this item?')) { props.deleteItem(props.item._id) } }}>🗑</a>

      < a href="#" onClick={() => { props.togglePublished(props.item._id) }}>P</a>
    </td>
  </tr >
)

class TableList extends React.Component {
  state = {
    items: this.props.items
  }

  componentDidMount() {
    console.log(this.state.items[0].delivery)
    console.log('item 0 published status', this.state.items[0].published)
  }
  //Jack help way
  deleteItem = (id) => {
    const option = {
      url: process.env.REACT_APP_BACKEND_URL + "/items/delete/" + id,
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "authorization": `${localStorage.authToken}`
      }
    }
    axios(option)
      .then(response => { console.log(response.data) });

    this.setState({
      items: this.state.items.filter(el => el._id !== id)
    })
  }

  togglePublished = async (id) => {
    debugger
    try {
      const response = axios.put("http://localhost:5000/items/toggle-publish", {
        id: this.props.match.params.id
      })
    } catch(err) {
      console.log(err.message)
    }
    {/* const foundItemIndex = this.state.items.findIndex(item => item._id === id)

    console.log(foundItemIndex);
    console.log(this.state.items[foundItemIndex]) */}

    {/* this.setState(prevState =>
    {
      items[foundItemIndex].published = !prevState.items[foundItemIndex].published
    } ); */}
  }


  itemList() {
    return this.state.items.map(currentitem => {
      return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id} togglePublished={this.togglePublished} />;
    })
  }


  render() {
    return (
      <div>
        <h1 className="blurb-border-title">List of all items</h1>


        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Email</th>
              <th>Privacy</th>
              <th>Image</th>
              <th>Delivery</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {this.itemList()}
          </tbody>
        </table>
      </div >
    )
  }
}


export default TableList;