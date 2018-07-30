import React from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap';

import "./logo.style.css";
import TeoniteLogo from '../Utilities/images/teonite-logo-white.png';

function Logo() {
  return(
    <Grid>
      <Row className = "show-grid">
        <Col xs = {12}>
          <div className = "logo-container">
            <div className = "logo-card">
              <figure className = "logo-front">
                <Image src = {TeoniteLogo}/>
              </figure>
              <figure className = "logo-back"><span>TEONIT</span>E</figure>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );
}

export default Logo;