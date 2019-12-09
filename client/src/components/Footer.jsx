import React from 'react';

export default function Footer(props) {

  return (
    <footer>
      <a href="https://github.com/bgrzybowski29/garagelistings">
        {/* <img className='image-footer' src={gitHub} border="0" alt="" /> */}
        <i class="im im-github"></i>
      </a>
      <a href="http://www.linkedin.com/in/ben-grzybowski-27739b1b">
        {/* <img className='image-footer' src={linkedIn} border="0" alt="" /> */}
        <i className="im im-linkedin"></i>
      </a>
      <p id='copyright'>Ben Grzybowski 2019</p>
    </footer>
  )
}

