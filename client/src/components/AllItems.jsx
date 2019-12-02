import React, { useState, useEffect } from 'react';
import { getAllItems } from '../services/api-helper';
export default function AllItems(props) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const itemsResponse = await getAllItems();
    setItems(itemsResponse);
  }

  return (
    <div>
      <h1>All Items</h1>
      {items && items.map(item => (
        <p> {JSON.stringify(item)}</p>
      ))}
    </div >
  )
}
