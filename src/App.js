import React from "react";
import "./styles.css";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      cities: []
    };
    this.input = React.createRef();
  }

  deleteCity = cityToDelete => {
    return () => {
      const cities = this.state.cities.filter(city => {
        return city !== cityToDelete;
      });
      this.setState({ cities: cities });
    };
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      cities: this.state.cities.concat([this.state.inputValue]),
      inputValue: ""
    });
  };

  render() {
    return (
      <div className="App">
        <div className="cities">
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                onChange={this.handleChange}
                value={this.state.inputValue}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <ListGroup>
            {this.state.cities.map((city, index) => {
              return (
                <ListGroup.Item onClick={this.deleteCity(city)} key={index}>
                  {city}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default App;
