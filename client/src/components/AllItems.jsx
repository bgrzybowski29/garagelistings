import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems } from '../services/api-helper';
import altImage from '../images.png';
import moment from 'moment';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
      {items && items.map(item => (
        <>
          <div className="listing-row">
            <Link to={`/item-details/${item.id}`}>
              <img className="listing-image" src={item.default_image} alt={altImage} />
            </Link>
            <div classname="listing-row-details">
              <Link to={`/item-details/${item.id}`}>
                <h2 className="title">{item.title}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>Listing is less than 4 days old!</Tooltip>}
                  >
                    {
                      moment(Date.now()).diff(new Date(item.created_at), "days") < 4 ?
                        <Badge variant="secondary">New</Badge> : <></>
                    }
                  </OverlayTrigger>
                </h2>
              </Link>
              <p>{item.description}</p>
              <p>${parseFloat(item.price).toFixed(2)}</p>
              <p>Location: {item.user.location}</p>
            </div>
            <div>
              <p>ID: {item.id}</p>
              <p>Age: {item.timedistance}</p>
              <p>Posted by: {item.user.username}</p>
            </div>
          </div>
          <hr />
        </>
      ))}
    </div >
  )
}
