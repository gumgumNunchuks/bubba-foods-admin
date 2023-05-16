import React, { useState } from 'react';
import './FoodItems.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DeleteIcon from '../Icons/delete.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [showAddItemPopup, setShowAddItemPopup] = useState(false);
  const [showEditItemPopup, setShowEditItemPopup] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [formInputs, setFormInputs] = useState({
    name: '',
    image: null,
    imagePreview: null,
    description: '',
    available: false,
    isVeg: false,
    price: '',
    speciality: '',
    rating: 1,
    ingredients: [],
  });
  const [error, setError] = useState('');
  const [index, setIndex] = useState(-1);

  const handleInputChange = (event) => {
    const name = event.target.name;
    let value = name === 'image' ? event.target.files[0] : event.target.value;

    if (name === 'available' || name === 'isVeg') {
      value = event.target.checked;
    }

    if (name === 'ingredients') {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      value = selectedOptions;
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

    if (!formInputs.name || !formInputs.image) {
      setError('Please provide both a name and an image for the item.');
      return;
    }

    const newItem = { ...formInputs };
    setFoodItems((prevState) => [...prevState, newItem]);
    setShowAddItemPopup(false);
    setFormInputs({
      name: '',
      image: null,
      imagePreview: null,
      description: '',
      available: false,
      isVeg: false,
      price: '',
      speciality: '',
      rating: 1,
      ingredients: [],
    });
    setError('');
  };

  const handleAddItemPopupClose = () => {
    setShowAddItemPopup(false);
    setFormInputs({
      name: '',
      image: null,
      imagePreview: null,
      description: '',
      available: false,
      isVeg: false,
      price: '',
      speciality: '',
      rating: 1,
      ingredients: [],
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

    const updatedItem = { ...formInputs };
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index] = updatedItem;
    setFoodItems(updatedFoodItems);
    setShowEditItemPopup(false);
    setFormInputs({
      name: '',
      image: null,
      imagePreview: null,
      description: '',
      available: false,
      isVeg: false,
      price: '',
      speciality: '',
      rating: 1,
      ingredients: [],
    });
    setError('');
    setIndex(-1);
  };

  const handleEditItemPopupClose = () => {
    setShowEditItemPopup(false);
    setFormInputs({
      name: '',
      image: null,
      imagePreview: null,
      description: '',
      available: false,
      isVeg: false,
      price: '',
      speciality: '',
      rating: 1,
      ingredients: [],
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
<h2>Food Items</h2>
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
<label htmlFor="image-input">Image:</label>
<input type="file" id="image-input" name="image" accept="image/*" onChange={handleInputChange} />
{formInputs.imagePreview && <img className="image-preview" src={formInputs.imagePreview} alt="item" />}
<label htmlFor="description-input">Description:</label>
<textarea id="description-input" name="description" value={formInputs.description} onChange={handleInputChange} />
<label htmlFor="available-input">
Available:
<input type="checkbox" id="available-input" name="available" checked={formInputs.available} onChange={handleInputChange} />
</label>
<label htmlFor="is-veg-input">
Is Veg:
<input type="checkbox" id="is-veg-input" name="isVeg" checked={formInputs.isVeg} onChange={handleInputChange} />
</label>
<label htmlFor="price-input">Price:</label>
<input type="text" id="price-input" name="price" value={formInputs.price} onChange={handleInputChange} />
<label htmlFor="speciality-input">Speciality:</label>
<select id="speciality-input" name="speciality" value={formInputs.speciality} onChange={handleInputChange}>
<option value="">Select Speciality</option>
<option value="Today's Special">Today's Special</option>
<option value="Festive Special">Festive Special</option>
<option value="Regular">Regular</option>
<option value="Restaurant Special">Restaurant Special</option>
</select>
<label htmlFor="rating-input">Rating:</label>
<select id="rating-input" name="rating" value={formInputs.rating} onChange={handleInputChange}>
<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
<option value={4}>4</option>
<option value={5}>5</option>
</select>
<label htmlFor="ingredients">Ingredients</label>
<Select
  name="ingredients"
  isMulti
  options={[
    { value: 'ingredient1', label: 'Ingredient 1' },
    { value: 'ingredient2', label: 'Ingredient 2' },
    { value: 'ingredient3', label: 'Ingredient 3' },
    // Add more options here
  ]}
  value={formInputs.ingredients.map((ingredient) => ({
    value: ingredient,
    label: ingredient,
  }))}
  onChange={(selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormInputs((prevState) => ({ ...prevState, ingredients: selectedValues }));
  }}
  closeMenuOnSelect={false}
  components={{ DropdownIndicator: null }}
  isTouchCapable={true}
/>


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
        <div className="food-item-details">
          <p className="food-item-description">Description: {item.description}</p>
          <p className="food-item-available">Available: {item.available ? 'Yes' : 'No'}</p>
          <p className="food-item-veg">Is Veg: {item.isVeg ? 'Yes' : 'No'}</p>
          <p className="food-item-price">Price: {item.price}</p>
          <p className="food-item-speciality">Speciality: {item.speciality}</p>
          <p className="food-item-rating">Rating: {item.rating}</p>
          <p className='food-item-ingredients'>Ingredients: {item.ingredients}</p>
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
    <p className="no-items-message">No food items found.</p>
  )}
  {showEditItemPopup && (
    <div className="edit-item-popup">
      <form onSubmit={handleEditItemSubmit}>
        <h3>Edit Item</h3>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="name-input">Name:</label>
        <input type="text" id="name-input" name="name" value={formInputs.name} onChange={handleInputChange} />
        <label htmlFor="image-input">Image:</label>
        <input type="file" id="image-input" name="image" accept="image/*" onChange={handleInputChange} />
        {formInputs.imagePreview && <img className="image-preview" src={formInputs.imagePreview} alt="item" />}
        <label htmlFor="description-input">Description:</label>
        <textarea id="description-input" name="description" value={formInputs.description} onChange={handleInputChange} />
        <label htmlFor="available-input">
          Available:
          <input type="checkbox" id="available-input" name="available" checked={formInputs.available} onChange={handleInputChange} />
        </label>
        <label htmlFor="is-veg-input">
          Is Veg:
          <input type="checkbox" id="is-veg-input" name="isVeg" checked={formInputs.isVeg} onChange={handleInputChange} />
        </label>
        <label htmlFor="price-input">Price:</label>
        <input type="text" id="price-input" name="price" value={formInputs.price} onChange={handleInputChange} />
        <label htmlFor="speciality-input">Speciality:</label>
        <select id="speciality-input" name="speciality" value={formInputs.speciality} onChange={handleInputChange}>
          <option value="">Select Speciality</option>
          <option value="Today's Special">Today's Special</option>
          <option value="Festive Special">Festive Special</option>
          <option value="Regular">Regular</option>
          <option value="Restaurant Special">Restaurant Special</option>
        </select>
        <label htmlFor="rating-input">Rating:</label>
        <select id="rating-input" name="rating" value={formInputs.rating} onChange={handleInputChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
<option value={3}>3</option>
<option value={4}>4</option>
<option value={5}>5</option>
</select>
<label htmlFor="ingredients">Ingredients</label>
<select
  name="ingredients"
  multiple
  value={formInputs.ingredients}
  onMouseDown={(e) => e.preventDefault()}
  onMouseUp={(e) => e.preventDefault()}
  onClick={handleInputChange}
>
  <option value="ingredient1">Ingredient 1</option>
  <option value="ingredient2">Ingredient 2</option>
  <option value="ingredient3">Ingredient 3</option>
  {/* Add more options here */}
</select>
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

export default FoodItems;




