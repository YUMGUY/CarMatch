import { Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CarCard = (props) => {
  const dynamicImage = require(`../CarImgs/${props.img}`);
  return (
    <Link>
      <Card>
        <Image src={dynamicImage} />
        <Card.Body></Card.Body>
      </Card>
    </Link>
  );
};

export default CarCard;
