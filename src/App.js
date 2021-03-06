import React from "react";
import "./styles.css";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CityList from "./CityList";
import CityDetails from "./CityDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      activeCity: "",
      cities: [
        { name: "Chicago", visited: false },
        { name: "Paris", visited: false },
        { name: "New York", visited: false },
        { name: "Hong Kong", visited: false },
        { name: "Barcelona", visited: false },
        { name: "Tokyo", visited: false }
      ]
    };
    this.input = React.createRef();
  }
  visitedCities = () => {
    return this.state.cities.filter(city => {
      return city.visited;
    });
  };

  notVisitedCities = () => {
    return this.state.cities.filter(city => {
      return !city.visited;
    });
  };

  setActiveCity = city => {
    return () => {
      this.setState({ activeCity: city });
    };
  };

  markAsVisited = visitedCity => {
    return event => {
      const newCities = this.state.cities.map(city => {
        if (city.name === visitedCity) {
          return { name: visitedCity, visited: true };
        }
        return city;
      });
      this.setState({ cities: newCities });
      event.stopPropagation();
    };
  };

  deleteCity = cityToDelete => {
    return event => {
      const cities = this.state.cities.filter(city => {
        return city !== cityToDelete;
      });
      this.setState({ cities: cities });
      event.stopPropagation();
    };
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      cities: this.state.cities.concat([
        { name: this.state.inputValue, visited: false }
      ]),
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
          <Tabs defaultActiveKey="wishList">
            <Tab eventKey="wishList" title="wishList">
              <CityList
                cities={this.notVisitedCities()}
                deleteCity={this.deleteCity}
                markAsVisited={this.markAsVisited}
                setActiveCity={this.setActiveCity}
              />
            </Tab>
            <Tab eventKey="visited" title="visited">
              <CityList
                cities={this.visitedCities()}
                deleteCity={this.deleteCity}
                setActiveCity={this.setActiveCity}
              />
            </Tab>
          </Tabs>
        </div>
        <div className="cityList">
          {this.state.activeCity !== "" && (
            <CityDetails cityName={this.state.activeCity} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
