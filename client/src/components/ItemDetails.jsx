import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import altImage from '../images.png';
import { getItem, deleteItem, saveItem, unSaveItem } from '../services/api-helper';

function ItemDetails(props) {
  const [listing, setListing] = useState(null);
  const [backGround, setbackGround] = useState(altImage);
  const [isOwner, setIsOwner] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  let divStyle = { backgroundImage: `url(${backGround})` };

  useEffect(() => {
    loadItem(props.itemId);
    // console.log(`UseEffect ran on ItemDetails`)
  }, []);

  const loadItem = async (id) => {
    const itemsResponse = await getItem(id);
    setListing(itemsResponse);
    setbackGround(itemsResponse.default_image)
    if (itemsResponse.user_id === props.currentUser.id)
      setIsOwner(true);
    setIsSaved(itemsResponse.savedItems.find(item => props.currentUser.id === item.user_id) ? true : false);

  }
  const handleDelete = async (id) => {
    await deleteItem(id);
    props.history.push("/");
  }
  const handleSaveItem = async (id) => {
    if (isSaved) {
      await unSaveItem(id);
      setIsSaved(false);
    }
    else {
      await saveItem(id);
      setIsSaved(true);
    }
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

            <h2 id="title">{listing.title}</h2>
            {isOwner ?
              <></>
              :

              isSaved ?
                <i class="im im-star" onClick={() => { handleSaveItem(listing.id); }}></i>
                :
                <i class="im im-star-o" onClick={() => { handleSaveItem(listing.id); }}></i>
            }
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
                <Link to={`/edit-item/${listing.id}`}><button>Edit Listing</button></Link>
                <button onClick={() => { handleDelete(listing.id); }}>Delete Listing</button>
              </>
            }
          </div>
        </div>
      }
    </div >
  )
}
export default withRouter(ItemDetails);