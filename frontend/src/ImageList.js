import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { Col } from "react-bootstrap";
import { Loader } from "./Loader"


const type = "Image"; // Need to pass which type element can be draggable

const Image = ({ image, index, moveImage, clicked }) => {
  const ref = useRef(null);
  
  const [loaded, setLoaded] = useState(false);
  function onLoad() {
    setLoaded(true);
  }

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Move the content
      moveImage(dragIndex, hoverIndex);
      // Update the index for dragged item directly to avoid flickering when half dragged
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: image.position, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // initialize drag and drop into the element
  drag(drop(ref));

  return (
    <Col md={4} xs={6}>
      <div 
          ref={ref}
          style={{ opacity: isDragging ? 0 : 1 }}
          className="file-item"
      >
        <Card style={{ width: '18rem' }} onClick={clicked}>
          <Card.Body>
              <Card.Title>{image.title}</Card.Title>
          </Card.Body>
          {loaded ? null :
          <Loader />
          }
          <Card.Img src={image.gif} variant="top" 
              onLoad={onLoad}
              style={loaded ? {} : {display: 'none'}}
          />
        </Card>
      </div>
    </Col>
  );

};

const ImageList = ({ images, moveImage, passedFunction }) => {

    return (    

        <CardDeck>
          {images.map((image, index) => {
              return (
                <Image
                image={image}
                index={index}
                key={`${image.position}-image`}
                moveImage={moveImage}
                clicked={() => passedFunction(image.gif)}
              />
              );
            })}
        </CardDeck>
    
        )

  };


export default ImageList;