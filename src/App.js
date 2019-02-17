import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
import userLocationURL from './my-icon.svg';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input} from 'reactstrap';

var myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [38, 95]
});

/*var myIcon1 = L.icon({
  iconUrl: userLocationURL,
  iconSize: [38, 95]
});*/

/** csv file
a,b,c
1,2,3
4,5,6
*/
//var fs = require('fs-extra');
const csvFilePath='./datasample.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
async function example(){
  // Async / await usage
  const jsonArray=await csv().fromFile(csvFilePath);

}




class App extends Component {

  state = {
      lat: 0,
      lng: 0,
      lat1: -12,
      lng1: -77,

    zoom: 5,
  }


  render() {
    const position = [this.state.lat, this.state.lng]
    const position1 = [this.state.lat1, this.state.lng1]
    return (
      <div className = 'map'>
        <Map className = 'map' center={position} zoom={this.state.zoom}>
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <Marker 
              position={position}
              icon = {myIcon}>
            <Popup>
              pista dañada <br /> PIEL COCODRILO.
            </Popup>
            </Marker>

            <Marker 
              position={position1}
              icon = {myIcon}>
            <Popup>
              pista dañada <br /> PIEL COCODRILO.
            </Popup>
            </Marker> : ""
          
        </Map>

        <Card body className = "message-form">
            <CardTitle>SMART BUS</CardTitle>
            <CardText>A continuación ingrese el nivel de daño del pavimento</CardText>
            <Form onSubmit = {this.formSubmitted}>
              <FormGroup>
                <Label for="name">Tipo de daño</Label>
                <Input 
                  onChange = {this.valueChanged}
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="selecciona daño" />
              </FormGroup>
              <FormGroup>
                <Label for="message">Recomendación</Label>
                <Input 
                  onChange ={this.valueChanged}
                  type="textarea" 
                  name="message" 
                  id="message" 
                  placeholder="ingresa tu recomendación" />
              </FormGroup>
            </Form>
            <Button color="info" disabled={!this.state.haveUsersLocation}>Enviar</Button>
        </Card>   
      </div>
    );
  }
}

export default App;
