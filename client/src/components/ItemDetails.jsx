import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import altImage from '../images.png';
import { getItem, deleteItem, saveItem, unSaveItem } from '../services/api-helper';
import moment from 'moment';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

function ItemDetails(props) {
  const [listing, setListing] = useState(null);
  const [backGround, setbackGround] = useState(altImage);
  const [isOwner, setIsOwner] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
        <>
          <div id="listing-image-group">
            {/* <div id="main-pic" style={divStyle} /> */}
              <img id="main-pic" src={backGround} alt=""/>
            
            <div className="listing-pics">
              <img className="listing-pic" src={listing.default_image} alt={altImage} onClick={() => setbackGround(listing.default_image)} />
              {listing.itemImages.map(image => (
                <img className="listing-pic" src={image.image_url} alt={altImage} onClick={() => setbackGround(image.image_url)} />
              ))}
            </div>
          </div>
          <div id="listing-details-group">

            <h1 id="title">{listing.title}
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>Listing is less than 4 days old!</Tooltip>}
              >
                {
                  moment(Date.now()).diff(new Date(listing.created_at), "days") < 4 ?
                    <Badge variant="secondary">New</Badge> : <></>
                }</OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>Save\Unsave listing!</Tooltip>}
              >
                {isOwner ?
                  <></>
                  :

                  isSaved ?
                    <i class="im im-star" onClick={() => { handleSaveItem(listing.id); }}></i>
                    :
                    <i class="im im-star-o" onClick={() => { handleSaveItem(listing.id); }}></i>
                }</OverlayTrigger></h1>
            <p>{listing.description}</p>
            {/* <p> Year, Make, Model</p> */}
            <div id="ymm"><p>{listing.year}</p>
              <p>{listing.make}</p>
              <p>{listing.model}</p>
              <p>{listing.mptions}</p>
            </div>
            <p>${parseFloat(listing.price).toFixed(2)}</p>
            <div id="grp-details-small">
              <p>Posted by: {listing.user.username}</p>
              <p>Age: {listing.timedistance}</p>
              <p>Created on: {moment(new Date(listing.created_at)).format("ddd MM/DD/YYYY hh:mm A")}</p>
            </div>
            {isOwner &&
              <>
                <Link to={`/edit-item/${listing.id}`}><button>Edit Listing</button></Link>
                <button onClick={() => { handleDelete(listing.id); }}>Delete Listing</button>
              </>
            }
          </div>
        </>
      }
    </div >
  )
}
export default withRouter(ItemDetails);