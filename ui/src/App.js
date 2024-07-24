import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LocationField from './Components/LocationField';
import React, { useState,useEffect } from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    start:'',
    destination:'',
    start_latitude:'',
    start_longitude:'',
    destination_latitude:'',
    destination_longitude:''
  });
  const [result, setResult] = useState("");
  

  useEffect(() => {
    
    if (formData.start&& !formData.start.includes('New York')) {
      window.alert('Please select an NYC location!')
      setFormData(prevState => ({
        ...prevState,
        start: '',
        start_longitude:'',
        start_latitude:''
      }));

      if (formData.destination&& !formData.destination.includes('New York')) {
      window.alert('Please select an NYC location!')
      setFormData(prevState => ({
        ...prevState,
        destination: '',
        destination_longitude:'',
        destination_latitude:''
      }));
      }
    }
  }, [formData])
  
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handlePredictClick = (event) => {
    setIsLoading(true);
    const altitudes=[formData.start_latitude,formData.start_longitude,formData.destination_latitude,formData.destination_longitude]
    console.log(altitudes)
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(altitudes)
      })
      .then(response => response.json())
      .then(response => {
        setResult(response.result);
        setIsLoading(false);
      });
  }

  const handleCancelClick = (event) => {
    setResult("");
  }

  return (
    <Container>
      {console.log(formData)}
      <div>
        <h1 className="title">Get your Taxi Fare now!</h1>
      </div>
      <div className="content">
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Start address</Form.Label>
              <LocationField value={'Where do you want to start?'} setFormData={setFormData} name='start' />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Destination address</Form.Label>
              <LocationField value={'Where do you want to go?'}setFormData={setFormData} name='destination' />

            </Form.Group>
          </Form.Row>

            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }


export default App;