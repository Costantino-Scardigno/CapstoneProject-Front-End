import { useState } from "react";
import "../components/Hero.css";
import Form from "./Form";

function MyHero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="container-fluid padding-top-5">
      <div className="row mb-5">
        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-7 d-flex flex-column justify-content-between ps-4">
          <h1 id="my-text" className="display-1 fw-bold lh-sm my-text">
            Il modo semplice e gratuito numero 1 per raccogliere{" "}
            <span className="font-effect">foto</span> e{" "}
            <span className="font-effect color-effect">video</span> dei tuoi
            ospiti.
          </h1>
          <p className="fs-1 fw-lighter m-0">
            Abbiamo reso facile e semplice la raccolta di foto e video in tempo
            reale in un album condiviso accessibile ai tuoi invitati
          </p>
          <div className="row">
            <div className="col-sm-6 mt-4">
              <button className="btn-animated-album btn btn-info1 w-100 rounded-pill mt-5 py-3 fs-4">
                Come funziona?
              </button>
            </div>
            <div className="col-sm-6 mt-4">
              {/* Bottone "Crea Album" */}
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-animated-album btn-album w-100 py-3 mt-5 rounded-pill fs-4 fw-bold"
              >
                Crea Album
              </button>

              <Form show={showModal} onClose={() => setShowModal(false)} />
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-12 col-xl-5 d-lg-none d-xl-block d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block d-xl-none d-xxl-block">
          <div className="grid-container">
            <div className="rounded-4 item item1"></div>
            <div className="item item2 d-lg-none d-xl-block">
              <video
                className="w-100 rounded-4"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="../src/assets/matrimonio.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="rounded-4 item item4"></div>
            <div className="rounded-4 item item12"></div>
            <div className="rounded-4 item item10"></div>
            <div className="rounded-4 item item11"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyHero;
