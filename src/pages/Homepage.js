import React, { useState } from 'react';
import './Homepage.css'
import Ads from './Ads';
import FoodItems from './FoodItems';
import IngredientItems from './IngredientsItems';

function HomePage() {
  const [content, setContent] = useState(null);

  const handleButtonClick = (buttonName) => {
    if (buttonName === 'Food Items') {
      setContent(<FoodItems />);
    } else if (buttonName === 'Ingredients Items') {
      setContent(<IngredientItems />);
    } else if (buttonName === 'Ads') {
      setContent(<Ads />);
    }
  };

  return (
    <>
      
      <div className="sidebar">
        <button className="sidebar-button" onClick={() => handleButtonClick('Food Items')}>
          Food Items
        </button>
        <button className="sidebar-button" onClick={() => handleButtonClick('Ingredients Items')}>
          Ingredients Items
        </button>
        <button className="sidebar-button" onClick={() => handleButtonClick('Ads')}>
          Ads
        </button>
      </div>
      <div className="container">{content}</div>
    </>
  );
}

export default HomePage;
