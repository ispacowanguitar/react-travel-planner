import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

const CityDetails = ({ cityName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cityName === currentName) {
      return;
    }
    setIsLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_APP_ID}`
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        setCurrentTemp(res.main.temp);
        setCurrentName(res.name);
        setDescription(res.weather[0].description);
        setIsLoading(false);
        setError(false);
      })
      .catch(error => {
        setError(true);
      });
  }, [cityName, currentName]);

  if (error) {
    return <div>Error fetching data for {cityName}</div>;
  }

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card className="text-center">
      <Card.Header>{currentName}</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>Current temperature: {currentTemp}°F</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default React.memo(CityDetails);
