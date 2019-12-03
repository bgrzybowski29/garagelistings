import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import altImage from '../images.png';
import { getItem } from '../services/api-helper';

export default function ItemDetails(props) {
  const [listing, setListing] = useState(null);
  const [backGround, setbackGround] = useState(altImage);
  const [isOwner, setIsOwner] = useState(false);

  let divStyle = { backgroundImage: `url(${backGround})` };

  useEffect(() => {
    loadItem(props.itemId);
  }, []);

  const loadItem = async (id) => {
    const itemsResponse = await getItem(id);
    setListing(itemsResponse);
    setbackGround(itemsResponse.default_image)
    if (itemsResponse.user_id === props.currentUser.id)
      setIsOwner(true);
  }

  return (
    <div id="listing-details">

      {listing &&
        <div className="listing-row">
          <div id="listing-image-group">
            <div id="main-pic" style={divStyle} />
            <div className="listing-pics">
              <img className="listing-pic" src={listing.default_image} alt={altImage} onClick={() => setbackGround(listing.default_image)} />
              {listing.itemImages.map(image => (
                <img className="listing-pic" src={image.image_url} alt={altImage} onClick={() => setbackGround(image.image_url)} />
              ))}
            </div>
          </div>
          <div id="listing-details-group">
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p> Year, Make, Model</p>
            <div id="ymm"><p>{listing.year}</p>
              <p>{listing.make}</p>
              <p>{listing.model}</p>
              <p>{listing.mptions}</p>
            </div>
            <p>Posted by: {listing.user.username}</p>
            <p>Created on: {listing.created_at}</p>
            {isOwner &&
              <>
                <button>Edit Listing</button>
                <button>Delete Listing</button>
              </>
            }
          </div>
        </div>
      }
    </div>
  )
}