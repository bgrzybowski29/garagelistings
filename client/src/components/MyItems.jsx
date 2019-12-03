import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyItems } from '../services/api-helper';
import altImage from '../images.png';

export default function MyItems(props) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getItems(props.currentUser);
  }, []);

  const getItems = async (user) => {
    const itemsResponse = await getMyItems(user.id);
    setItems(itemsResponse);
  }

  return (
    <div>
      {items && items.map(item => (
        <div className="listing-row">
          <Link to={`/item-details/${item.id}`}>
            <img className="listing-image" src={item.default_image} alt={altImage} />
          </Link>
          <div>
            <Link to={`/item-details/${item.id}`}>
              <h2>{item.title}</h2>
            </Link>
            <p>{item.description}</p>
            <p>Posted by: {item.user.username}</p>
          </div>
        </div>
      ))}
    </div>
  )
}