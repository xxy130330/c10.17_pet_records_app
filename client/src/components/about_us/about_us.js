import React from "react";
import simonPic from  '../../../dist/assets/images/simon_profile.jpg';
import sangwooPic from '../../../dist/assets/images/sangwooPic.jpg';
import christianPic from '../../../dist/assets/images/christian_profile.jpg';
import christinPic from '../../../dist/assets/images/christinPic.JPG';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="aboutUsContainer">
      <h1 className="col-12">Meet the team</h1>
        <div className="row teamContainer">
          <div className="profileContainer">
            <img
              src={simonPic}
              className="img-fluid simonPic"
            />
          </div>
          <div className="textContainer">
            <h3>this is Simon</h3>
            <p>Simon was the team's primary back end developer. He created endpoints that facilitated CRUD operations throughout the application as well as worked with Amazon Web Services to launch the live app and host content with Amazon S3.
            In addition Simon worked closely with the front end team, creating media queries for a fresh looking desktop view that utilized the extra real estate on the DOM.
            </p>
          </div>
        </div>

        <div className="row teamContainer">
          <div className="profileContainer">
            <img
              src={christianPic}
              className="img-fluid"
            />
          </div>
          <div className="textContainer">
            <h3>Christian</h3>
              <p>Christian was a part of the front-end team, focusing on the majority of logic, page-routing, and form-handling. He also played a pivotal role in team cohesion and task management.
              Despite Christian's focus on the front-end, he also worked closely with Simon and Christin for front/back-end integration.
              </p>
          </div>
        </div>

        <div className="row teamContainer">
          <div className="profileContainer">
            <img
              src="https://www.allaboutbirds.org/guide/PHOTO/LARGE/blue_jay_glamour.jpg"
              className="img-fluid"
            />
          </div>
          <div className="textContainer">
            <h3>This is Jay.</h3>
            <p>Jay worked mainly on front-end development.</p>

          </div>
        </div>

        <div className="row teamContainer">
          <div className="profileContainer">
            <img
                src={christinPic}
                className="img-fluid"
            />
          </div>
          <div className="textContainer">
            <h3>Christin</h3>
            <p>Christin, the PetVet app idea owner, worked as a UX designer and back-end developer on the PetVet team. She crafted delightful user-centered prototypes in order to enhance user experience. She also worked on the database connection endpoints with the front-end, and other back-end development tasks such as setting up CRON jobs and error-logging on the live server.</p>

          </div>
        </div>

        <div className="row teamContainer">
          <div className="profileContainer">
            <img
              src={sangwooPic}
              className="img-fluid"
            />
          </div>
          <div className="textContainer">
            <h3>Sangwoo</h3>
            <p>Sangwoo worked mainly on front-end development. Focused on a Javascript Image Cropper, Croppie.js. Utilized Croppie.js to allow users easy editing of their pet's image. He enojyed working with PetVet team as a front end developer.</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
