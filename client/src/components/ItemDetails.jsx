import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import altImage from '../images.png';
import { getItem, deleteItem, saveItem, unSaveItem, getSellerProfile } from '../services/api-helper';
import moment from 'moment';
import { Badge, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap';

function ItemDetails(props) {
  const [listing, setListing] = useState(null);
  const [backGround, setbackGround] = useState(altImage);
  const [isOwner, setIsOwner] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showHide, setshowHide] = useState("Show Seller");
  const [shown, setShown] = useState(true);
  const [sellerProfile, setSellerProfile] = useState(true);


  useEffect(() => {
    loadItem(props.itemId);
  }, []);

  const loadItem = async (id) => {
    const itemsResponse = await getItem(id);
    setListing(itemsResponse);
    setbackGround(itemsResponse.default_image);
    debugger
    if (itemsResponse.user_id === props.currentUser.id) {
      setIsOwner(true);
      setSellerProfile(itemsResponse.user);
    }
    else {
      handleGetSellerProfile(itemsResponse.user_id);
    }
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
  const handleGetSellerProfile = async (id) => {
    const profile = await getSellerProfile(id);
    setSellerProfile(profile);
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Seller's Info</Popover.Title>
      <Popover.Content>
        {sellerProfile &&
          <>
            <p>Username: {sellerProfile.username}</p>
            <p>Email: {sellerProfile.email}</p>
            <p>User Since: {moment(new Date(sellerProfile.created_at)).format("MM/YYYY")}</p>
            <p>Name: {sellerProfile.firstname} {sellerProfile.lastname}</p>
            <p>Location: {sellerProfile.location}</p>
          </>
        }
      </Popover.Content>
    </Popover>
  );
  const handleShowHide = () => {
    if (shown) {
      setshowHide("Hide Seller");
      setShown(false);
    }
    else {
      setshowHide("Show Seller");
      setShown(true);
    }
  }
  return (
    <div id="listing-details">

      {listing &&
        <>
          <div id="listing-image-group">
            <img id="main-pic" src={backGround} alt="" />

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
              {/* <p>Posted by: {listing.user.username}</p> */}
              <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="success" onClick={() => handleShowHide()}>{showHide}</Button>
              </OverlayTrigger>
              <p>Age: {listing.timedistance}</p>
              <p>Created on: {moment(new Date(listing.created_at)).format("ddd MM/DD/YYYY hh:mm A")}</p>
            </div>
            {isOwner &&
              <>
                <Link to={`/edit-item/${listing.id}`}>
                  <Button variant="success">Edit Listing</Button>
                </Link>
                <Button variant="success" onClick={() => { handleDelete(listing.id); }}>Delete Listing</Button>
              </>
            }
          </div>
        </>
      }
    </div >
  )
}
export default withRouter(ItemDetails);