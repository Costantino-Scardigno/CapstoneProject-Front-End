import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import logoImage from "../assets/Logo2.png";

function Footer() {
  return (
    <footer className="py-4 bg-footer w-100 mt-5m ">
      <div className="container-fluid">
        <div className="pb-3 border-bottom d-flex  justify-content-sm-center ">
          <div className="col-12 col-md-6  d-flex justify-content-center justify-content-md-center align-items-center mb-3 mb-md-0">
            <a
              href="#"
              className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start align-items-center gap-2 text-light text-decoration-none"
            >
              <div className="d-flex align-items-center justify-content-center rounded-circle">
                <img src={logoImage} className="w-75 m-0 " alt="" />
              </div>
              <span className="fs-3 fw-bold text-black">Scatti Festosi</span>
            </a>
          </div>
        </div>

        {/* Sezione  con informazioni e social */}
        <div className="row pt-3 justify-content-center justify-content-lg-between">
          <div className="col text-center d-flex flex-column flex-md-row align-items-center gap-2">
            <span>©2025 All rights reserved</span>
            <a href="#" className=" text-black text-decoration-none">
              Privacy policy
            </a>
            <a href="#" className=" text-black text-decoration-none">
              Terms of service
            </a>
          </div>
          <div className="col text-center d-flex justify-content-center gap-2 pt-3 pt-lg-0">
            <a
              href="#"
              title="Facebook"
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            >
              <FaFacebookSquare className="text-black fs-2" />
            </a>
            <a
              href="#"
              title="Twitter"
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            >
              <FaXTwitter className="text-black fs-2" />
            </a>
            <a
              href="#"
              title="Instagram"
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            >
              <BsInstagram className="text-black fs-2" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
