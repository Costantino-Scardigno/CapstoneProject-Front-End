import "./component_css/Card2.css";
import { IoIosStar } from "react-icons/io";

export const Card2 = ({ image, title, subtitle, description }) => (
  <div className="card-2 mt-5-custom mb-2 ">
    <img src={image} />
    <div>
      <h2 className="fw-semibold">{title}</h2>
      <h3>{subtitle}</h3>
      <p className="fw-semibold">{description}</p>
      <div className="star">
        <IoIosStar className="fs-1  text-secondary-custom" />
        <IoIosStar className="fs-1 text-secondary-custom" />
        <IoIosStar className="fs-1 text-secondary-custom" />
        <IoIosStar className="fs-1 text-secondary-custom" />
        <IoIosStar className="fs-1 text-secondary-custom" />
      </div>
    </div>
  </div>
);
