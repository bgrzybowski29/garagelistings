import React, { useState, useEffect } from 'react';
import { getSavedItems } from '../services/api-helper';
export default function SavedItems(props) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getItems(props.currentUser);
  }, []);

  const getItems = async (user) => {
    const itemsResponse = await getSavedItems(user.id);
    setItems(itemsResponse);
  }

  return (
    <div>
      <h1>Saved Items</h1>
      {items && items.map(item => (
        <p> {JSON.stringify(item)}</p>
      ))}
    </div>
  )
}
