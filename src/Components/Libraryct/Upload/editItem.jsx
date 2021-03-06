//Calling base form component here in Form.jsx
// This page is being rendered by clicking on the link in tableList.jsx

import React from "react";
import Form from './Form';
import axios from 'axios';
import Header from '../../Shared/Header';
import Title from '../../Shared/Title';
import Adminav from '../../Admin/admin-nav';
import Unauthorised from "../../Shared/unauthorised";
import Footer from '../../Shared/footer';

class EditItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: '',
      headline: '',
      description: '',
      category: '', //drop down
      postcode: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
      privacy: '', //drop down
      image: '',
      delivery: '' //checkbox boolean
    }
  }

  handleEditItem = (data) => {

    data.image = this.state.image || this.state.itemData.image

    console.log('handleEdit data', data);
    //component to say uploading?? Put in here
    const option = {
      url: process.env.REACT_APP_BACKEND_URL + "/items/edit/" + this.props.match.params.id,
      method: "PUT",
      headers: {
        "authorization": `${localStorage.authToken}`
      },
      data: data

    }

    console.log(data)

    console.log('data image', data.image)

    axios(option)

      .then(res => {
        this.props.history.push('/admin/dashboard');
      })
      .catch((err) => {
        console.log(err)
      })

  }


  componentDidMount() {

    axios.get(process.env.REACT_APP_BACKEND_URL + '/items/' + this.props.match.params.id)

      .then(response => {
        console.log(response.data)
        this.setState(
          {
            itemData:

            {
              itemName: response.data.itemName,
              headline: response.data.headline,
              description: response.data.description,
              category: response.data.category,
              postcode: response.data.postcode,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              phone: response.data.phone,
              address: response.data.address,
              email: response.data.email,
              privacy: response.data.privacy,
              image: response.data.image,
              delivery: response.data.delivery,
              published: response.data.published
            }
          })


      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {



    if (localStorage.authToken) {

      const myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'onegoodst',
        uploadPreset: 'onegoodst'
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info.url);
          this.setState({
            image: result.info.url
          })
        }
      }
      )

      const showWidget = async () => {
        await myWidget.open()
        // console.log('state image', this.image)

      }

      return (<div>
        <Header />
        <Adminav />
        <Title title="Edit Item" />

        <Form btnText={'Submit Edit'} onSubmit={this.handleEditItem} item={this.state} initialValues={this.state.itemData} showWidget={showWidget} />

        <Footer />

      </div>
      );
    }
    else {
      return (
        <Unauthorised />
      )
    }

  }
}

export default EditItem;
