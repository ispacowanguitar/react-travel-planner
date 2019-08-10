import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const CityList = props => {
  const [currentlyHoveringIndex, setCurrentlyHoveringIndex] = useState(-1);
  return (
    <ListGroup>
      {props.cities.map((city, index) => {
        return (
          <ListGroup.Item
            key={`city-${index}`}
            onMouseEnter={() => setCurrentlyHoveringIndex(index)}
            onMouseLeave={() => setCurrentlyHoveringIndex(-1)}
          >
            {city}
            {currentlyHoveringIndex === index && (
              <>
                <Button
                  style={{ float: "right" }}
                  size="sm"
                  variant="outline-danger"
                  onClick={props.deleteCity(city)}
                >
                  delete
                </Button>
                <Button
                  style={{ float: "right", marginRight: "10px" }}
                  size="sm"
                  variant="outline-info"
                >
                  visited
                </Button>
              </>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default React.memo(CityList);
