// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import Button from "react-bootstrap/Button"
import { Container } from "react-bootstrap";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import ImageList from "./ImageList";
import update from "immutability-helper";
import SaveButton from "./SaveButton";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
ReactModal.setAppElement(document.getElementById('root'));

// Use a class component, 
// because a functional component doesn’t have its own state
// Corrected: With the React 16.8 they let you use state and other React features without writing a class.
export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      message: null, 
      items: [],
      showModal: false,
      dataModal: "",
    };
    
  }

  // componentDidMount() {
  //   axios.get(`http://localhost:8000/`)
  //   .then(response => this.setState({data:response.data}))  
  //   .catch(function(error) {
  //    console.log('Fetch error: ' + error.message);
  //  })
  // }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  getModal = data => {
    this.setState({ showModal: true, dataModal: data });
  };

  handleClick = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.items)
    };
    console.log(requestOptions)

    try {
      const response = await fetch('http://localhost:8000/update', requestOptions);
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      // const res = await fetch("http://0.0.0.0:8000/get");
      const res = await fetch("http://localhost:8000/get");
      const data = await res.json();
      console.log(data);
      this.setState({
        items: data.cards.map(item => ({
            title: item.title,
            type: item.type,
            position: item.position,
        }))
      })
    } catch (err) {
      console.error(err);
    }
  }

  render() {

    const items = this.state.items;

    // var message = "Default frontend message"

    // if (this.state.message !== null) {
    //   message = this.state.message;
    // }
    // console.log(message)
    
    const types = [
      { type : 'bank-draft', gif: 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'},
      { type : 'invoice', gif: 'https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif'},
      { type : 'bill-of-lading', gif: 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif'}
    ]
  
    const items_with_gifs = items.map(item => {
      const obj = types.find(o => item.type.lastIndexOf(o.type, 0) === 0);
      return { ...item, ...obj };
    });

    console.log(items_with_gifs)

    const moveImage = (dragIndex, hoverIndex) => {
      const draggedImage = this.state.items[dragIndex];
      const arrangedArray = update(this.state.items, {$splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedImage]        
      ]});
      this.setState({ items: arrangedArray });

     console.log(dragIndex, hoverIndex, this.state.items)
    };

    return (
      <React.Fragment>
        <Container>
          {/* <strong>Message</strong>: {message}<br/><br/> */}

          {/* <Button onClick={this.handleClick} variant="primary" size="lg" block>
            Save
          </Button> */}

          <SaveButton handleClick={this.handleClick}/>

          <DndProvider backend={HTML5Backend}>
            <ImageList images={items_with_gifs} moveImage={moveImage} passedFunction = {this.getModal}/>
          </DndProvider>

        </Container>
        
        <ReactModal 
              style={customStyles}
              isOpen={this.state.showModal}
              contentLabel="onRequestClose Example"
              onRequestClose={this.handleCloseModal}
              // overlayClassName="Overlay"
              ariaHideApp={false}
              shouldCloseOnOverlayClick={true}
          >
            <img src={this.state.dataModal}></img>
        </ReactModal>
      </React.Fragment>

      

      )
    }
  }
