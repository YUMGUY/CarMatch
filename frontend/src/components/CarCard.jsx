import { Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CarCard = (props) => {
  const dynamicImage = require(`../CarImgs/${props.img}`);
  return (
    <Link>
      <Card style={{ width: "25rem", marginBottom: "2rem" }}>
        <Image src={dynamicImage} fluid />
        <Card.Body></Card.Body>
      </Card>
    </Link>
  );
};

export default CarCard;
