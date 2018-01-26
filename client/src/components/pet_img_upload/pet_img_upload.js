import React, { Component } from "react";
import "../add_pet/add_pet.css";
import "./pet_img_upload.css";
import photo from "../../../../server/images/photo.png";
import axios from "axios";

class PetImgUpload extends Component {
  constructor(props) {
    super(props);

    this.getFileName = this.getFileName.bind(this);
  }
  getFileName(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="img_container" id="hide">
        <form onSubmit={e => this.getFileName(e)}>
          <input type="file" name="upload" id="file" />
          <button name="upload" value="true">
            upload
          </button>
        </form>
      </div>
    );
  }
}

export default PetImgUpload;
