import React from "react";
import Nav from './Nav';
import axios from "axios";
import * as ReactBootStrap from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isFetching: false,
        data: [],
      }

    }
    fetchImages() {
      axios.get(`http://localhost:4000/findimages`, {
          params: {
            owner: this.loggedInUser
          }
        })
        .then((res) => {
          console.log(res.data)
          this.setState({
            data: res.data
          });
        })
        .catch((err) => {
          console.error(err);
        })
    }
    componentDidMount() {
      this.fetchImages();

    }
  render() {
    return (
      <div>
        <Nav/>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Image Name</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((imageInstance) => {return (<tr><td>{imageInstance.name}</td><td>{imageInstance.createdDate}</td></tr>)})}
          </tbody>
        </ReactBootStrap.Table> 
      </div>
    );
  }
}

export default App;
