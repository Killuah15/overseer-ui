import React, { Component } from 'react';
import { Button, Grid, Row, Col, Clearfix } from "react-bootstrap";
import {NavLink} from 'react-router-dom';


const Project = props => {

        return (
          <div className="Project"><NavLink to="/Events">{props.name}</NavLink></div>
        );

};



export default Project;