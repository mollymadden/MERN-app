//Create new user 

import React from 'react';
import axios from 'axios';


class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onchangeFirstName = (e) => {
    this.setState({
      firstName: e.target.value 
    });
  }

  onchangeLastName = (e) => {
    this.setState({
      lastName: e.target.value 
    });
  }

  onchangeEmail = (e) => {
    this.setState({
      email: e.target.value 
    });
  }

  onchangePassword = (e) => {
    this.setState({
      password: e.target.value 
    });
  }

  onSubmit = (e) => { 
    e.preventDefault();
    this.setState(state => ({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
      
    }));
    
    console.log(this.state);

    axios.post('http://localhost:5000/users/create', this.state)
      .then(res => {
        this.props.history.push('/'); //goes back to home
        //window.location.reload(false); //page can reload after recipe item added
      })
      .catch((err) => {
        console.log(err)
      })
  }


  render() {
    return (
      <div>
        <h1>Create user</h1>
        <form action="/action_page.php">
          <div>
            <label htmlFor="">First Name</label>
          </div>
          <div>
          <input type="text"
                required
                
                name="firstName" 
                placeholder="First Name.."
                value={this.state.firstName}
                onChange={this.onchangeFirstName} 
                />
          </div>

          <div>
            <label htmlFor="">Last Name</label>
          </div>
          <div>
          <input type="text"
                required
                
                name="lastName" 
                placeholder="Last Name.."
                value={this.state.lastName}
                onChange={this.onchangeLastName} 
                />
          </div>

          <div>
            <label htmlFor="">Email</label>
          </div>
          <div>
          <input type="text"
                required
                
                name="email" 
                placeholder="Email.."
                value={this.state.email}
                onChange={this.onchangeEmail} 
                />
          </div>

          <div>
            <label htmlFor="">Password</label>
          </div>
          <div>
          <input type="text"
                required
                
                name="password" 
                placeholder="Password.."
                value={this.state.password}
                onChange={this.onchangePassword} 
                />
          </div>

          <div>
              <button onClick={this.onSubmit} className="submit" >Add User</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateUser;