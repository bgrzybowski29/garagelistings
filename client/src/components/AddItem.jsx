import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAutoMakes, getAutoModels, getAutoYears, getAutoModelOptions } from '../services/api-helper';

const AddItem = (props) => {

  const [years, setYears] = useState(null);
  const [makes, setMakes] = useState(null);
  const [models, setModels] = useState(null);
  const [modelOptions, setModelOptions] = useState(null);
  const [year, setYear] = useState('');
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [modelOption, setModelOption] = useState(null);
  const [selection, setSelection] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');


  useEffect(() => {
    getYears();
  }, []);

  const clearMake = async () => {
    setMake(null);
    setMakes(null);
    setSelection(null);
  }
  const clearModel = async () => {
    setModel(null);
    setModels(null);
    setSelection(null);
  }
  const clearModelOption = async () => {
    setModelOption(null);
    setModelOptions(null);
    setSelection(null);
  }

  const getYears = async () => {
    const autoYears = await getAutoYears();
    clearMake();
    clearModel();
    clearModelOption();
    setYears(autoYears.map(year => ((<option>{year.text}</option>))));
  }
  const getMakes = async (event) => {
    setYear(event.target.value);
    clearMake();
    clearModel();
    clearModelOption();
    const autoMakes = await getAutoMakes(event.target.value);
    setMakes(autoMakes.map(make => ((<option>{make.text}</option>))));
  }

  const getModels = async (event) => {
    setMake(event.target.value);
    clearModel();
    clearModelOption();
    const autoModels = await getAutoModels(year, event.target.value);
    setModels(autoModels.map(model => ((<option>{model.text}</option>))));
  }
  const getModelsOptions = async (event) => {
    setModel(event.target.value);
    clearModelOption();
    const autoModelsOptions = await getAutoModelOptions(year, make, event.target.value);

    autoModelsOptions.unshift({ text: '', value: '' });
    setModelOptions(autoModelsOptions.map(model => ((<option>{model.text}</option>))));
  }

  const setAutomobile = async (event) => {
    setModelOption(event.target.value)
    //setSelection(`Year: ${year}, Make: ${make}, Model: ${model}, Options: ${event.target.value}`);
  }
  const addNewItem = async () => {
    setSelection(`Call api with this data: Title:${title}, Description: ${description}, Year: ${year}, Make: ${make}, Model: ${model}, Options: ${modelOption}, Images: ${images}`);
  }
  const addNewImage = async (image) => {
    let i = images;
    i.push(image);
    setImages(i);
    setSelectedImage("");
  }

  return (
    <div className="add-item-comp">
      <form className="add-item-form" >
        <label>Title</label>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        <label>Year</label>
        <select onChange={getMakes} name="year" type="text" placeholder="year">
          {years}
        </select>
        <label>Make</label>
        <select onChange={getModels} name="make" type="text" placeholder="make">
          {makes}
        </select>
        <label>Model</label>
        <select onChange={getModelsOptions} name="model" type="text" placeholder="model">
          {models}
        </select>
        <label>Model Options</label>
        <select onChange={setAutomobile} name="model" type="text" placeholder="model">
          {modelOptions}
        </select>
      </form>
      <div className="image-list">
        <div>
          <input id="selected-image-text" type='text' value={selectedImage} onChange={e => setSelectedImage(e.target.value)} />
          <button id="selected-image-btn" onClick={() => {
            addNewImage(selectedImage);
          }}>
            Add Image
          </button>
        </div>
        <div>
          {images.map(image => <img className="new-item-images" src={image} alt="none" />)}
        </div>
      </div>
      <button id="add-new-item-btn" onClick={() => { addNewItem(); }} >Add</button>
      <p>{selection}</p>
    </div>
  )
}

export default AddItem;