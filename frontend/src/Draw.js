import React from "react";
import Nav from './Nav';

const axios = require('axios');
class Draw extends React.Component {
    constructor(props) {
        super(props);
        this.displayArray = [];
        this.encodedImage = [];
        this.selectedColor = "black";
        this.secondaryColor = "white";
        this.defaultColor = "white";
        this.imageName = "";
        this.desiredImage = "";
        this.mouseClicked = false;
        this.sendImage = this.sendImage.bind(this);
        this.toggleMouseDown = this.toggleMouseDown.bind(this);
        this.toggleMouseUp = this.toggleMouseUp.bind(this);
        this.renderList = [];
        this.loggedInUser = localStorage.getItem("loggedInUser").replace(/['"]+/g, '');
        this.isDuplicate = false;
        
        
    }
    clearImage() {
        let temparray = Array.from(Array(80), () => new Array(80));
        window.sessionStorage.setItem("imgdata", JSON.stringify(temparray));
        window.location.reload(false);
    }
    updateDesiredImage = (e) =>{
        this.desiredImage = e.target.value;
        //console.log(this.desiredImage)
    }
    fetchImage = () => {
        if (this.desiredImage) {
            console.log('fetching');
            axios.get('http://localhost:4000/findimage', {params:{owner:this.loggedInUser, name:this.desiredImage}})  
            .then((res) => {
            //console.log(res.data.imageData);
            window.sessionStorage.setItem('imgdata',JSON.stringify(res.data.imageData));
            window.location.reload(false);

            //console.log(this.state.data);
            })
            .catch((err) => {
            console.error(err);
            })
        }
        else {
            alert("Please enter the name of the image you want to load")
        }
        
      }
    sendImage() {
        //this.checkDuplicateImg();
        if (this.loggedInUser === "No User") {
            alert("Please log in before saving!"); 
        }
        else if (!this.imageName) {
            alert("Enter a name for your image");
        }
        // else if (this.isDuplicate === true) {
        //     alert("no duplicates please");
        // }
        else {
            axios.post('http://localhost:4000/saveimage',{"imageData":this.displayArray,"owner":this.loggedInUser,"name":this.imageName})
            .then((res) => {
                window.sessionStorage.setItem('imgdata',JSON.stringify(this.displayArray));
                this.initDraw();
                console.log(res);
                alert('Image Saved');
            })
            .catch((err)=>{
                console.error(err)
            });
        }
    }
    initDraw() {
        this.renderList = [];
        this.displayArray = JSON.parse(window.sessionStorage.getItem("imgdata"));
        for (let i = 0;i < this.displayArray.length; i++) {
            for (let j = 0; j < this.displayArray[i].length; j++) {
                this.renderList.push(this.makeTileDiv(this.displayArray[i][j],i,j));
                //console.log(renderList)
            }
        }
        //console.log(this.renderList)
    }
    updateName = (e) => {
        this.imageName = e.target.value;
    }
    changeColor = (e) => {
        this.selectedColor = e.target.value;
    }
    changeSecondaryColor = (e) => {
        this.secondaryColor = e.target.value;
    }
    toggleMouseDown() {
        this.mouseClicked = true;
        //console.log("down")
    }
    toggleMouseUp() {
        this.mouseClicked = false;
        //console.log("up")
    }
    updateColor = (e) => { // sets tile color for use when click+dragging
        if (this.mouseClicked === true) {
            e.target.style.backgroundColor = this.selectedColor;
            let pos = e.target.id.split(",");
            this.displayArray[pos[0]][pos[1]] = this.selectedColor;
            //console.log(pos + " " + this.displayArray[pos[0]][pos[1]])
            //console.log("setting color to " + this.selectedColor)
        }

    }
    nocheckUpdate = (e) => { // sets the color without checking for mouse clicked state because it is called by onClick
        e.target.style.backgroundColor = this.selectedColor;
        let pos = e.target.id.split(",");
        this.displayArray[pos[0]][pos[1]] = this.selectedColor;
        //console.log(this.displayArray)
        //console.log(pos + " " + this.displayArray[pos[0]][pos[1]])
    }
    eraseColor = (e) => { // creates single-pixel erasing via right click
        e.target.style.backgroundColor = this.secondaryColor;
        let pos = e.target.id.split(",");
        this.displayArray[pos[0]][pos[1]] = this.secondaryColor;
        e.preventDefault();
    }
    makeTileDiv(color,i,j) {
        if (!color) {
            color = this.defaultColor;
            this.displayArray[i][j] = this.defaultColor;
        }
        return(
            <div style={{backgroundColor:color}} onMouseEnter={this.updateColor} onClick={this.nocheckUpdate} onContextMenu={this.eraseColor} className="imagetile" id={`${i},${j}`}></div>
        )
    }
    // checkDuplicateImg() {
    //     axios.get(`http://localhost:4000/findimages`, {params:{owner:this.loggedInUser}})  
    //     .then((res) => {
    //         for (let i=0;i<res.data.length;i++) {
    //             if (res.data[i].name === this.imageName) {
    //                 //alert("An image with this name already exists!");
    //                 this.isDuplicate = true;

    //             }   
    //         }
    //     })
    // .catch((err) => {
    //   console.error(err);
    // })
    // }
    render () {
        if (!window.sessionStorage.getItem('imgdata')) {
            let temparray = Array.from(Array(80), () => new Array(80));
            window.sessionStorage.setItem("imgdata", JSON.stringify(temparray));
        }
        this.initDraw();
        return (
            <div className="drawdisp" onMouseDown={this.toggleMouseDown} onMouseUp={this.toggleMouseUp}>
              <Nav/>
              <label className="colorlabel">Current Color: </label>
              <input className="colorlabel" onChange={this.changeColor} type="text" placeholder={"black"}/>
              <label className="colorlabel">Secondary Color (right click): </label>
              <input onChange={this.changeSecondaryColor} type="text" placeholder={"white"}/>
              <p className="colorlabel">Any valid css background-color styling can be used here, including hex (#value) and rgb(value,value,value) <a href="https://www.w3schools.com/colors/colors_names.asp" target={"_blank"} rel="noreferrer">Examples</a></p>
              <input className="namebox" onChange={this.updateDesiredImage} type="text" placeholder={"Name of image to be loaded"}/>
              <button className="loadbutton" onClick={this.fetchImage}>Load Image</button>
            <br/>
              <input className="namebox" onChange={this.updateName} type="text" placeholder={"Name of image to be saved"}/>
              
              <button className="savebutton" onClick={this.sendImage}>Save</button>
              <button className="clearbutton" onClick={this.clearImage}>Clear</button>
             
            <div className="display">{this.renderList}</div>
            

          </div>
        );
    }
}
export default Draw;