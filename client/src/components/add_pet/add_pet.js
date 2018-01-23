import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../server/images/petvet_logo.png";
import photo from "../../../../server/images/photo.png";
import "./add_pet.css";
import axios from 'axios';
// import PetImgUpload from '../pet_img_upload/pet_img_upload';

import { connect } from "react-redux";
import { addPet, uploadImage } from "../../actions/";

import '../../../node_modules/croppie/croppie.css';
import  croppie  from 'croppie';



class AddPet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        dob: "",
        breed: ""
      },
      buttonClick : false,
      errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.upload = this.upload.bind(this);


    this.currentOwnerId = null;
    this.url = null;

    this.croppie = null;

  }



  componentWillMount() {

    console.log('these are the props in add_pet ', this.props);
    if(this.props.id){
      this.currentOwnerId = this.props.id;
      localStorage.id = this.currentOwnerId;
    } else {
      this.currentOwnerId = localStorage.id;
    }

  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form: { ...form } });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, dob, breed } = this.state.form;
    if(!this.url){
      this.props.addPet(name, dob, breed, this.currentOwnerId , 'http://i.telegraph.co.uk/multimedia/archive/02830/cat_2830677b.jpg')
            .then(()=>{this.props.history.push('/pet-to-vet/' + this.props.petId+'/null')})
      return;
    }

    this.croppie.result({ type:'blob', size:'viewport', circle: true, format: 'png'})
      .then(res=>{
            let file = new File([res], 'hello.png', {type: "image/png"});
            let data = new FormData();
            data.append('file', file)
            console.log('newFILE', file);
            this.upload(data);
           })


  }

  upload(data){
    const {name, dob, breed} = this.state.form;
    this.props.uploadImage(data)
        .then( ()=> {
          this.url = this.props.url.data[0]
          console.log('THIS PROPS SECONDTIME', this.props);
        })
          .then( ()=> this.props.addPet(name, dob, breed, this.currentOwnerId , this.url) )
            .then(()=>{this.props.history.push('/pet-to-vet/' + this.props.petId+'/null')})
              .then(()=> console.log('secondurl::', this.url))
    this.setState({
      form: {
        name: "",
        dob: "",
        breed: ""
      }
    });
  }

    getFileName(e) {
      console.log('again?',e.target);
        e.preventDefault();



        let data = new FormData();
        data.append('file', document.getElementById('file').files[0]);
        console.dir('.....',document.getElementById('file').files[0])



        this.props.uploadImage(data)
          .then(()=> {
            this.url = this.props.url.data[0]
            console.log('THIS PROPS ', this.props)
          })
            .then(()=>{this.setupCroppie(this.url)})
              .then(()=> console.log('FISRT URL', this.url))

        this.setState({
          form: {...this.state.form},
          buttonClick: true
        })



    }


    setupCroppie(url){

        let el = document.getElementById('croppie');

        this.croppie = new croppie(el, {
            viewport: {width: '100%', height:'100%', type: 'circle'},
            boundary: {width: '100%', height:'100%'},
            showZoomer: true
        })
        console.log('why?', url);
        this.croppie.bind({
            url: url
        })
    }





  render() {
    const { name, dob, breed } = this.state.form;


    const input = this.state.buttonClick ? '' :<input  className='text-center' type="file" name="file" id='file' onChange={(e)=>this.getFileName(e)}/>


    return (
      <div className='bodyContainer'>
        <h2 className="text-center">Add Pet</h2>
        <p className='text-center' style={{color:'red'}}>{this.state.errorMessage}</p>
          <div className="pictureContainer">
            <div className="pictureDiv">
              {input}
              <div type='file' name='croppie' id="croppie"></div>
            </div>
          </div>

          {/*<div className='fileContainer'>*/}

              {/*<input  type="file" name="file" id='file' onChange={(e)=>this.getFileName(e)}/>*/}

        {/*  </div>*/}





        <form className="container" onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control input-lg"
              type="text"
              onChange={e => this.handleInputChange(e)}
              name="name"
              value={name}
            />
          </div>
          <div className="form-group">
            <label>D O B</label>
            <input
              className="form-control input-lg"
              type="date"
              onChange={e => this.handleInputChange(e)}
              name="dob"
              value={dob}
            />
          </div>
          <div className="form-group">
            <label>Breed</label>
            <input
              className="form-control input-lg"
              type="text"
              onChange={e => this.handleInputChange(e)}
              name="breed"
              value={breed}
            />
          </div>

          <button className="btn btn-primary">Add Pet</button>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.login.id,
    url: state.uploadImage,
    petId: state.addPet.petId,
  };
}



export default connect(mapStateToProps, {
  addPet: addPet,
  uploadImage: uploadImage
})(AddPet);





