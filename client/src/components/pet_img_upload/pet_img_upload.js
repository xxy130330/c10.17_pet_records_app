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
    // var fileName = e.target.files[0];


      //axios call for page.php
      //GET request user file name
      //return URL to store in db
      console.log(document.getElementById('file').files[0]);

      let data = new FormData();
      data.append('file', document.getElementById('file').files[0]);

      axios({
          method: 'post',
          encType: 'multipart/form-data',
          url: '../../../../server/database_connect/server.php?action=post&resource=upload-item',
          data: data,
      }).then(function(res) {
          console.log('response after img upload', res);
      });

      // axios.post('/server/database_connect/server.php?action=post&resource=upload-item',{
      //   upload: fileName.name,
      // })
      //     .then(function (response) {
      //         console.log(response);
      //     })
      //     .catch(function (error) {
      //         console.log(error);
      //     });



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

          {/*action="../../../../server/file_upload/aws_s3/page.php"*/}

          {/*<form action="../../../../server/database_connect/server.php?action=post&resource=upload-item" encType="multipart/form-data" method="post">*/}


          <form onSubmit={(e)=>this.getFileName(e)}>
          <input type="file" name="upload" id='file'/>
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
