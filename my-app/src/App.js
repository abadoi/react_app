// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import axios from 'axios';
import GridLayout from 'react-grid-layout';
import ReactGridLayout from 'react-grid-layout';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import ReactModal from 'react-modal';


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
 

// Use a class component, 
// because a functional component doesn’t have its own state
export default class App extends React.Component {

  constructor () {
    super();
    this.state = {
      data: null, 
      items: [],
      showModal: false,
      dataModal: "",
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // componentDidMount() {
  //   axios.get(`http://localhost:8000/`)
  //   .then(response => this.setState({data:response.data}))  
  //   .catch(function(error) {
  //    console.log('Fetch error: ' + error.message);
  //  })
  // }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  getModal = data => {
    this.setState({ showModal: true, dataModal: data });
  };

  componentDidMount(){
    this.getData();
  }

  async getData(){
    try {
      const res = await fetch("http://localhost:8000/get");
      const data = await res.json();
      this.setState({
        items: data.cards.map(item => ({
            title: item[1],
            type: item[0],
            position: item[2],
        }))
      })
    } catch (err) {
      console.error(err);
    }
  }

  render() {

    const data = this.state.data;
    const items = this.state.items;

    var message = "Default frontend message"
    var cards = [];

    console.log(data);
    console.log(items);

    // Assign the payload value if it exists
    if (this.state.data !== null) {
      message = this.state.data.message;
      cards = this.state.data.cards;
    }


    const imageList = [
                'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif', 
                'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif', 
                'https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif', 
                'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif',
                'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
              ];

    let items_with_gifs = items.map((item, index) => {
      return {
          ...item,
          gif: imageList[index]
          
      }
    });
    console.log(items_with_gifs)

    const dataGrid = items.map((item, index) => (
      <div key={index}>
        <div key={item.position}>{item.title}</div>
        {/* <div key="b" data-grid={{x: 1, y: 0, w: 1, h: 2}}> {item} </div>
        <div key="c" data-grid={{x: 2, y: 0, w: 1, h: 2}}> {item} </div> */}
      </div>
    ));

    return (
      <div>
      {/* <strong>Message</strong>: {message}<br/><br/> */}
      
      {/* <GridLayout className="layout" cols={3} rowHeight={4} width={1200}>
        {dataGrid}
      </GridLayout> */}

      <CardDeck>
        {items_with_gifs.map((card) => {
            return (
              <CustomCard key={card.position} title={card.title} gif={card.gif} clicked={() => this.getModal(card.gif)}/>
            );
          })}
      </CardDeck>

      <ReactModal 
          style={customStyles}
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          overlayClassName="Overlay"
          shouldCloseOnOverlayClick={true}
      >
        <img src={this.state.dataModal}></img>
      </ReactModal>
      </div>
      

      )
    }
  }

  const CustomCard = (props) => {
    return (
      <div class="col-md-4 col-xs-6">
      <Card style={{ width: '18rem' }} onClick={props.clicked}>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
        </Card.Body>
        <Card.Img src={props.gif} variant="top" />
      </Card>
      </div>
    );
  }; 
