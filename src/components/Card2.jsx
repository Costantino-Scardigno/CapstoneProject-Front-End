import "./Card2.css";
import { IoIosStar } from "react-icons/io";

export const Card2 = ({ image, title, subtitle, description }) => (
  <div className="card-2 mt-5m mb-2 ">
    <img src="https://i.pinimg.com/236x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg" />
    <div>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>{description}</p>
      <div className="star">
        <IoIosStar className="fs-1  star-color" />
        <IoIosStar className="fs-1 star-color" />
        <IoIosStar className="fs-1 star-color" />
        <IoIosStar className="fs-1 star-color" />
        <IoIosStar className="fs-1 star-color" />
      </div>
    </div>
  </div>
);
