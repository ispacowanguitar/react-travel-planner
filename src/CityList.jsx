import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const CityList = props => {
  return (
    <ListGroup>
      {props.cities.map((city, index) => {
        return <ListGroup.Item key={index}>{city}</ListGroup.Item>;
      })}
    </ListGroup>
  );
};

export default React.memo(CityList);
