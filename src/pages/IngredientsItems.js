import React, { useState } from 'react';
import './FoodItems.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // importing edit and delete icons from react-icons
import DeleteIcon from '../Icons/delete.png'; // importing delete icon from material-ui/icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // importing FontAwesomeIcon component from fontawesome
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // importing edit icon from fontawesome's free-solid-icons pack

function IngredientItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [showEditItemPopup, setShowEditItemPopup] = useState(false);


  const [formInputs, setFormInputs] = useState({
    name: '',
  
    available: false,
  
  });
  const [error, setError] = useState('');
  const [index, setIndex] = useState(-1);


  const handleInputChange = (event) => {
    const name = event.target.name;
    let value = name === 'image' ? event.target.files[0] : event.target.value;
    if (name === 'available' ) {
      value = event.target.checked;
    }
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
    // if (!formInputs.name || !formInputs.image) {
    //   // setError('Please provide both a name and an image for the item.');
    //   setError('Please provide name for the item.');
    //   return;
    // }
    if (!formInputs.name) {
      setError('Please provide a name for the item.');
      return;
    }
   
    const newItem = { ...formInputs };
    setFoodItems((prevState) => [...prevState, newItem]);
    setShowAddItemPopup(false);
    setFormInputs({
      name: '',
    
      available: false,
    
    });
    setError('');
  };
  const handleAddItemPopupClose = () => {
    setShowAddItemPopup(false);
    setFormInputs({
      name: '',

      available: false,
    
    });
    setError('');
  };

  const handleEditItemClick = (index) => {
    const itemToEdit = foodItems[index];
    setFormInputs({ ...itemToEdit });
    setIndex(index);
    setShowEditItemPopup(true);
  };

  const handleEditItemSubmit = (event) => {
    event.preventDefault();

    if (!formInputs.name) {
      setError('Please provide a name for the item.');
      return;
    }
    const updatedItem = { name: formInputs.name, image: formInputs.image || foodItems[index].image };
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index] = updatedItem;
    setFoodItems(updatedFoodItems);
    setShowEditItemPopup(false);
    setFormInputs({
      name: '',
   
      available: false,
   
    });
    setError('');
    setIndex(-1);
  };

  const handleEditItemPopupClose = () => {
    setShowEditItemPopup(false);
    setFormInputs({
      name: '',
  
      available: false,
    
    });
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
      <h2>Ingredient Items</h2>
      <div className="add-item-container">
        <button className="add-item-button" onClick={handleAddItemClick}>
          Add Item
        </button>
        {showAddItemPopup && (
          <div className="add-item-popup">
            <form onSubmit={handleAddItemSubmit}>
              <h3>Add Item</h3>
              {error && <p className="error-message">{error}</p>}
              <label htmlFor="name-input">Name:</label>
              <input type="text" id="name-input" name="name" value={formInputs.name} onChange={handleInputChange} />
              <label htmlFor="available-input">
                Available:
                <input type="checkbox" id="available-input" name="available" checked={formInputs.available} onChange={handleInputChange} />
              </label>
              {/* <label htmlFor="image-input">Image:</label>
    <input type="file" id="image-input" name="image" accept="image/*" onChange={handleInputChange} />
    {formInputs.imagePreview && <img className="image-preview" src={formInputs.imagePreview} alt="item" />} */}
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
              {/* <img className="food-item-image" src={URL.createObjectURL(item.image)} alt={item.name} /> */}
              <p className="food-item-name">{item.name}</p>
              <div className="food-item-details">
                <p className="food-item-available">Available: {item.available ? 'Yes' : 'No'}</p>
              </div>
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
        <p className="no-items-message">No Ingredient items found.</p>
      )}
      {showEditItemPopup && (
        <div className="edit-item-popup">
          <form onSubmit={handleEditItemSubmit}>
            <h3>Edit Item</h3>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="name-input">Name:</label>
            <input type="text" id="name-input" name="name" value={formInputs.name} onChange={handleInputChange} />

            <label htmlFor="available-input">
              Available:
              <input type="checkbox" id="available-input" name="available" checked={formInputs.available} onChange={handleInputChange} />
            </label>
            {/* <label htmlFor="image-input">Image:</label>
    <input type="file" id="image-input" name="image" accept="image/*" onChange={handleInputChange} />
    {formInputs.imagePreview && <img className="image-preview" src={formInputs.imagePreview} alt="item" />} */}
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
export default IngredientItems;