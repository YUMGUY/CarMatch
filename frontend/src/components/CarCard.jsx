import { Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const CarCard = (props) => {
  const dynamicImage = require(`../CarImgs/${props.img}`);
  const { make, model, price } = props;

  return (
    <Card style={{ width: "25rem", marginBottom: "2rem" }}>
      <Image src={dynamicImage} fluid />
      <Card.Body>
        <h1>
          {" "}
          {make} {model}{" "}
        </h1>
        <h2> Price: ${price} </h2>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
