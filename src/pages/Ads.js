


import React, { useState } from 'react';

import './FoodItems.css';

import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // importing edit and delete icons from react-icons

import DeleteIcon from '../Icons/delete.png'; // importing delete icon from material-ui/icons

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // importing FontAwesomeIcon component from fontawesome

import { faEdit } from '@fortawesome/free-solid-svg-icons'; // importing edit icon from fontawesome's free-solid-icons pack




function Ads() {

  const [foodItems, setFoodItems] = useState([]);

  const [showAddItemPopup, setShowAddItemPopup] = useState(false);

  const [showEditItemPopup, setShowEditItemPopup] = useState(false);

  const [formInputs, setFormInputs] = useState({ name: '', image: null, imagePreview: null });

  const [error, setError] = useState('');

  const [index, setIndex] = useState(-1);




  const [location, setLocation] = useState(null);




  const handleInputChange = (event) => {

    const name = event.target.name;

    const value = name === 'image' ? event.target.files[0] : event.target.value;

    setFormInputs((prevState) => ({ ...prevState, [name]: value }));

    if (name === 'image') {

      handleImagePreview(event);

    }

  };




  const handleAddItemClick = () => {

    setShowAddItemPopup(true);

  };




  const handleAddItemSubmit = (event) => {

    event.preventDefault();

    if (!formInputs.image) {

      setError('Please provide both an image');

      return;

    }

    const newItem = {

      name: formInputs.text,

      image: formInputs.image,

      availability: formInputs.availability

    };

    setFoodItems((prevState) => [...prevState, newItem]);

    setShowAddItemPopup(false);

    setFormInputs({ name: '', image: null, text: '', availability: false });

  };




  const handleAddItemPopupClose = () => {

    setShowAddItemPopup(false);

    setFormInputs({ name: '', image: null });

    setError('');

  };




  const handleEditItemClick = (index) => {

    const itemToEdit = foodItems[index];

    setFormInputs({ name: itemToEdit.name, image: null });

    setIndex(index);

    setShowEditItemPopup(true);

  };




  const handleEditItemSubmit = (event) => {

    event.preventDefault();

    if (!formInputs.image) {

      setError('Please provide an Image ');

      return;

    }

    const updatedItem = { name: formInputs.name, image: formInputs.image || foodItems[index].image };

    const updatedFoodItems = [...foodItems];

    updatedFoodItems[index] = updatedItem;

    setFoodItems(updatedFoodItems);

    setShowEditItemPopup(false);

    setFormInputs({ name: '', image: null });

    setIndex(-1);

  };




  const handleEditItemPopupClose = () => {

    setShowEditItemPopup(false);

    setFormInputs({ name: '', image: null });

    setError('');

    setIndex(-1);

  };




  const handleDeleteItemClick = (index) => {

    const updatedFoodItems = [...foodItems];

    updatedFoodItems.splice(index, 1);

    setFoodItems(updatedFoodItems);

  };




  const handleImagePreview = (event) => {

    const image = event.target.files[0];

    if (!image) {

      setFormInputs((prevState) => ({ ...prevState, imagePreview: null }));

      return;

    }

    const reader = new FileReader();

    reader.onload = () => {

      setFormInputs((prevState) => ({ ...prevState, imagePreview: reader.result }));

    };

    reader.readAsDataURL(image);

  };




  return (

    <div className="food-items">

      <h2>Ads</h2>

      <div className="add-item-container">

        <button className="add-item-button" onClick={handleAddItemClick}>

          Upload Image

        </button>

        {showAddItemPopup && (

          <div className="add-item-popup">

            <form onSubmit={handleAddItemSubmit}>

              <h3>Upload Image</h3>

              {error && <p className="error-message">{error}</p>}

              <label htmlFor="image-input">Image:</label>

              <input type="file" id="image-input" name="image" accept="image/*" onChange={handleInputChange} />

              {formInputs.imagePreview && <img className="image-preview" src={formInputs.imagePreview} alt="item" />}




              <label htmlFor="availability-checkbox" style={{ display: 'inline-flex', fontsize: '18px', alignItems: 'center', marginRight: '10px' }}>In home page:</label>

              <input type="checkbox" id="availability-checkbox" name="availability" style={{ display: 'inline-block', verticalAlign: 'middle' }} checked={formInputs.availability} onChange={handleInputChange} />

              <label htmlFor="textbox-input" style={{ display: 'block', fontSize: '18px', marginTop: '10px' }}>Go To:</label>

              <input type="text" id="textbox-input" name="text" style={{ display: 'inline-block' }} value={formInputs.text} onChange={handleInputChange} />




              <div className="popup-buttons">

                <button type="submit" className="submit-button">

                  Add

                </button>

                <button type="button" className="cancel-button" onClick={handleAddItemPopupClose}>

                  Cancel

                </button>

              </div>

            </form>

          </div>




        )}

      </div>

      {foodItems.length > 0 ? (

        <ul className="food-items-list">

          {foodItems.map((item, index) => (

            <li key={index} className="food-item">

              <img className="food-item-image" src={URL.createObjectURL(item.image)} alt={item.name} />

              <p className="food-item-name">{item.name}</p>

              <p className="food-item-availability">

                In home page: {item.availability ? 'Yes' : 'No'}

              </p>

              <div className="food-item-actions">

                <button className="edit-button" onClick={() => handleEditItemClick(index)}>

                  <FaEdit />

                </button>

                <button className="delete-button" onClick={() => handleDeleteItemClick(index)}>

                  <img src={DeleteIcon} alt="delete icon" />

                </button>

              </div>

            </li>

          ))}

        </ul>

      ) : (

        <p className="no-items-message">No Ads.</p>

      )}




      {showEditItemPopup && (

        <div className="edit-item-popup">

          <form onSubmit={handleEditItemSubmit}>

            <h3>Edit Image</h3>

            {error && <p className="error-message">{error}</p>}

            {/* <label htmlFor="name-input">Name:</label>

    <input type="text" id="name-input" name="name" value={formInputs.name} onChange={handleInputChange} /> */}

            <label htmlFor="image-input">Image:</label>

            <input type="file" id="image-input" name="image" accept="image/*" onChange={handleInputChange} />

            {formInputs.imagePreview && <img className="image-preview" src={formInputs.imagePreview} alt="item" />}
            <label htmlFor="availability-checkbox" style={{ display: 'inline-flex', fontsize: '18px', alignItems: 'center', marginRight: '10px' ,marginTop:'20px'}}>In home page:</label>

              <input type="checkbox" id="availability-checkbox" name="availability" style={{ display: 'inline-block', verticalAlign: 'middle' }} checked={formInputs.availability} onChange={handleInputChange} />

            <div className="popup-buttons">

              <button type="submit" className="submit-button">

                Update

              </button>

              <button type="button" className="cancel-button" onClick={handleEditItemPopupClose}>

                Cancel

              </button>

            </div>

          </form>

        </div>

      )}

    </div>

  );

}

export default Ads;


