import React, { Component } from "react";
import "../add_pet/add_pet.css";
import "./pet_img_upload.css";
import photo from "../../../../server/images/photo.png";

class PetImgUpload extends Component {
  constructor(props) {
    super(props);

    this.getFileName = this.getFileName.bind(this);
  }
  getFileName(e) {
    var fileName = e.target.files[0];

    //axios call for page.php
      //GET request user file name
      //return URL to store in db

    console.log(fileName);
  }
  render() {
    return (
      <div className="img_container" id="hide">
        {/*<label*/}
          {/*action="../../../../server/file_upload/aws_s3/page.php"*/}
          {/*encType="multipart/form-data"*/}
          {/*method="post"*/}
          {/*className="img_label"*/}
        {/*>*/}
          {/*<div className="picture">*/}
            {/*<img src={photo} />*/}
          {/*</div>*/}
          {/*<form action="../../../../server/file_upload/aws_s3/page.php"*/}
                {/*encType="multipart/form-data"*/}
                {/*method="post">*/}
          {/*<input type="file" name="file" id="thefile" onChange={(e)=>this.getFileName(e)} />*/}
            {/*<button name="upload" value="true">upload</button>*/}
          {/*</form>*/}
        {/*</label>*/}
        <form action="../../../../server/file_upload/aws_s3/page.php" encType="multipart/form-data" method="post">
          <input type="file" name="file"/>
            <button name="upload" value="true">upload</button>
        </form>
      </div>
    );
  }
}

export default PetImgUpload;

{
  /*  */
}
{
  /* <form action="upload_test.php" enctype="multipart/form-data" method="post">
  <input type="file" name="avatar" />
  <button name="upload" value="true">
    upload
  </button>
</form>; */
}
{
  /* <div>
      <div className="picture">
        <img src={photo} />
      </div>
      <form
        className="upload_form"
        action="upload_test.php"
        enctype="multipart/form-data"
        method="post"
      >
        <input type="file" name="avatar" />
        <button className="btn btn-default" name="upload" value="true">
          upload
        </button>
      </form>
    </div> */
}
