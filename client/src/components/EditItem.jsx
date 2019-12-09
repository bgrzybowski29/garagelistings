import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getItem, getAutoMakes, getAutoModels, getAutoYears, getAutoModelOptions, editItem, deleteImage, addItemImage } from '../services/api-helper';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const EditItem = (props) => {

  const [years, setYears] = useState(null);
  const [makes, setMakes] = useState(null);
  const [models, setModels] = useState(null);
  const [modelOptions, setModelOptions] = useState(null);
  const [year, setYear] = useState('');
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [modelOption, setModelOption] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('');

  useEffect(() => {
    loadItem(props.itemId);
  }, []);

  const loadItem = async (id) => {
    const itemsResponse = await getItem(id);
    setYear(itemsResponse.year);
    setMake(itemsResponse.make);
    setModel(itemsResponse.model);
    setModelOption(itemsResponse.mptions);
    getYears();
    setMakes(<option>{itemsResponse.make}</option>);
    setModels(<option>{itemsResponse.model}</option>);
    setModelOptions(<option>{itemsResponse.mptions}</option>);
    setTitle(itemsResponse.title);
    setDescription(itemsResponse.description);
    setPrice(parseFloat(itemsResponse.price).toFixed(2));
    setImages(itemsResponse.itemImages);
    setLoading(false);
  }

  const clearMake = async () => {
    setMake(null);
    setMakes(null);
  }
  const clearModel = async () => {
    setModel(null);
    setModels(null);
  }
  const clearModelOption = async () => {
    setModelOption(null);
    setModelOptions(null);
  }
  const getYears = async () => {
    const autoYears = await getAutoYears();
    if (!loading) {
      clearMake();
      clearModel();
      clearModelOption();
    }
    setYears(autoYears.map(y => ((<option>{y.text}</option>))));
  }
  const getMakes = async (event) => {
    if (loading) return;
    setYear(event.target.value);
    clearMake();
    clearModel();
    clearModelOption();
    const autoMakes = await getAutoMakes(event.target.value);
    setMakes(autoMakes.map(make => ((<option>{make.text}</option>))));
  }

  const getModels = async (event) => {
    if (loading) return;
    setMake(event.target.value);
    clearModel();
    clearModelOption();
    const autoModels = await getAutoModels(year, event.target.value);
    setModels(autoModels.map(model => ((<option>{model.text}</option>))));
  }
  const getModelsOptions = async (event) => {
    if (loading) return;
    setModel(event.target.value);
    clearModelOption();
    const autoModelsOptions = await getAutoModelOptions(year, make, event.target.value);
    autoModelsOptions.unshift({ text: '', value: '' });
    setModelOptions(autoModelsOptions.map(model => ((<option>{model.text}</option>))));
  }

  const setOptions = async (event) => {
    if (loading) return;
    setModelOption(event.target.value)
  }
  const editExistingItem = async () => {
    const image = images.pop();
    const add = await editItem({ id: props.itemId, title: title, description: description, price: price, year: year, make: make, model: model, mptions: modelOption, default_image: image });
    props.history.push("/")
  }
  const addNewImage = async (image) => {
    const add = await addItemImage(props.itemId, image)
    let im = images;
    im.push(add);
    setImages(im);
    setSelectedImage("");
  }
  const removeImage = async (id) => {
    setImages(images.filter(img => img.id != id));
    await deleteImage(id);
  }

  return (
    <div className="add-item-comp">
      <div className="mobile-header">Edit Listing</div>
      <form className="add-item-form" >
        <label>Title</label>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        <label htmlFor="basic-url">Price</label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount" value={price} onChange={e => setPrice(e.target.value)} />
          <InputGroup.Append>
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <label>Year</label>
        <select value={year} onChange={getMakes} name="year" type="text" placeholder="year">
          {years}
        </select>
        <label>Make</label>
        <select value={make} onChange={getModels} name="make" type="text" placeholder="make">
          {makes}
        </select>
        <label>Model</label>
        <select value={model} onChange={getModelsOptions} name="model" type="text" placeholder="model">
          {models}
        </select>
        <label>Model Options</label>
        <select value={modelOption} onChange={setOptions} name="model" type="text" placeholder="model">
          {modelOptions}
        </select>
      </form>
      <div className="image-list">
        {/* <div>
          <input id="selected-image-text" type='text' value={selectedImage} onChange={e => setSelectedImage(e.target.value)} />
          <button id="selected-image-btn" onClick={() => {
            addNewImage(selectedImage);
          }}>
            Add Image
          </button>
        </div> */}
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Add Image"
            aria-label="Add Image"
            aria-describedby="basic-addon2"
            value={selectedImage}
            onChange={e => setSelectedImage(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => { addNewImage(selectedImage); }}>Add</Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="delete-image-group">
          {images.map(image => (
            <div className="edit-item-img-container">
              <img className="new-item-images" src={image.image_url} alt="none" />
              <div onClick={() => { removeImage(image.id); }} className="delete-img">X</div>
            </div>
          ))}
        </div>
      </div>
      <button id="add-new-item-btn" onClick={() => { editExistingItem(); }} >Edit</button>
    </div>
  )
}

export default withRouter(EditItem);