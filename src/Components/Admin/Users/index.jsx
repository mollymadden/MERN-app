//Index page for users

//Renders UserList Component

//Renders the link to Add User which then links to the CreateUser component.


import React from "react";
import axios from 'axios';
import UserList from "./usersList";
import Unauthorised from "../../Shared/unauthorised";



class User extends React.Component {
  handleCreateUser = (data) => {
    console.log(data);

    //component to say uploading?? Put in here

    axios.post(process.env.REACT_APP_BACKEND_URL + '/users/create', data)

      .then(res => {
        this.props.history.push('/users');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (localStorage.authToken) {
      return (
        <div>

          <UserList />
          {/* eslint-disable-next-line */}
          <button type="button" className="general-button" onClick={() => { this.props.history.push("/users/add") }} type="button">Add a New User</button>
        </div>
      )
    }
    else {
      return (
        <Unauthorised />
      )
    }
  }
}

export default User;