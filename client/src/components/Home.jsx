import React from 'react'
import MyItems from './MyItems';
import SavedItems from './SavedItems';
import AllItems from './AllItems';
import AddItem from './AddItem';

export default function Home(props) {
  const handleRadio = (e) => {
  }
  return (
    <div class="tabs">
      <input className="tab-inputs" id="tab1" type="radio" name="tabs" onClick={handleRadio} defaultChecked />
      <label className="tab-labels" for="tab1">My Listings</label>
      <input className="tab-inputs" id="tab2" type="radio" name="tabs" onClick={handleRadio} />
      <label className="tab-labels" for="tab2">Saved Listings</label>
      <input className="tab-inputs" id="tab3" type="radio" name="tabs" onClick={handleRadio} />
      <label className="tab-labels" for="tab3">All Listings</label>
      <input className="tab-inputs" id="tab4" type="radio" name="tabs" onClick={handleRadio} />
      <label className="tab-labels" for="tab4">Add Listing</label>
      <section id="content1">
        <MyItems currentUser={props.currentUser} />
      </section>
      <section id="content2">
        <SavedItems currentUser={props.currentUser} />
      </section>
      <section id="content3">
        <AllItems currentUser={props.currentUser} />
      </section>
      <section id="content4">
        <AddItem />
      </section>
    </div>
  )
}
