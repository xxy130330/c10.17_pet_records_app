import React from "react";
import sangwooPic from '../../../dist/assets/images/sangwooPic.jpg';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="aboutUsContainer">
      <h1 className="col-12">Meet the team</h1>
        <div className="row teamContainer">

          <div className="col-5">
            <img
              src="http://img.timeinc.net/time/photoessays/2010/time_100/t100art_simon_cowell.jpg"
              className="img-fluid"
            />
          </div>
          <div className="col-7">
            <h3>this is simon</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore quod enim perspiciatis mollitia pariatur id cumque voluptatibus dolor, veniam ad fugiat repellat dolorum alias ipsam quibusdam soluta maxime magni animi?</p>
          </div>
        </div>

        <div className="row teamContainer">
          <div className="col-5">
            <img
              src="http://clipart.printcolorcraft.com/wp-content/uploads/the-cross/jesus%20on%20the%20cross%20clipart%201.jpg"
              className="img-fluid"
            />
          </div>
          <div className="col-7">
            <h3>this is christian</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore quod enim perspiciatis mollitia pariatur id cumque voluptatibus dolor, veniam ad fugiat repellat dolorum alias ipsam quibusdam soluta maxime magni animi?</p>
          </div>
        </div>

        <div className="row teamContainer">
          <div className="col-5">
            <img
              src="https://www.allaboutbirds.org/guide/PHOTO/LARGE/blue_jay_glamour.jpg"
              className="img-fluid"
            />
          </div>
          <div className="col-7">
            <h3>This is Jay.</h3>
            <p>Jay worked mainly on front-end development.</p>

          </div>
        </div>

        <div className="row teamContainer">
          <div className="col-5">
            <img
              src="https://www.akingump.com/images/content/3/0/v2/30920/Carey-Christin-highres.jpg"
              className="img-fluid"
            />
          </div>
          <div className="col-7">
            <h3>this is christin</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore quod enim perspiciatis mollitia pariatur id cumque voluptatibus dolor, veniam ad fugiat repellat dolorum alias ipsam quibusdam soluta maxime magni animi?</p>

          </div>
        </div>

        <div className="row teamContainer">
          <div className="col-5">
            <img
              src={sangwooPic}
              className="img-fluid"
            />
          </div>
          <div className="col-7">
            <h3>Sangwoo</h3>
            <p>Sangwoo worked mainly on front-end development. Focused on a Javascript Image Cropper, Croppie.js. Utilized Croppie.js to allow users easy editing of their pet's image. He enojyed working with PetVet team as a front end developer.</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
