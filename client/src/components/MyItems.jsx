import React, { useState, useEffect } from 'react';
import { getMyItems } from '../services/api-helper';
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
      <h1>My Items</h1>
      <p>{JSON.stringify(items)}</p>
    </div>
  )
}
