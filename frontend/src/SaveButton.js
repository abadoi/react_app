import React, { useState } from "react";
import Button from "react-bootstrap/Button"

import './style.css';

const SaveButton = ({ handleClick }) => {

    const [fade, setFaded] = useState(false);

    function onClick() {
        setFaded(true);
        handleClick();
      }


    return (    
        <Button onClick={onClick} onAnimationEnd={() => setFaded(false)} className={fade ? 'fade' : ''} variant="primary" size="lg" block>
            Save
        </Button>
    
        )

  };

  export default SaveButton;