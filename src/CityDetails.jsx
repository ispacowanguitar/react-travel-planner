import React, { useEffect, useState } from "react";

const CityDetails = ({ cityName }) => {
  const [currentTemp, setCurrentTemp] = useState(0);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=1eb5f55ca571d97cb68beaf8799e447c`
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        setCurrentTemp(res.main.temp);
      });
  });

  return (
    <div>
      <h2>{cityName}</h2>
      <p>Current temperature: {currentTemp}°F</p>
    </div>
  );
};

export default CityDetails;
