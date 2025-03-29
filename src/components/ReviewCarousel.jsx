import React from "react";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Card2 } from "./Card2";

function ReviewCarousel() {
  return (
    <section
      id="reviewCarousel"
      className="carousel slide h-review  bg-light-custom mt-5 py-xl-5"
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <h2 className="display-1 fw-medium text-primary-custom text-center mt-5">
        Recensioni
      </h2>
      <div className="carousel-inner">
        {/* Prima slide */}
        <div className="carousel-item active">
          <div className="d-flex justify-content-evenly w-100 ">
            <Card2
              image="https://media.licdn.com/dms/image/v2/D4D03AQEY2pdgAdT1eg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713507583452?e=2147483647&v=beta&t=NrUmdo9H-cPepGEfatodRyJDmP3ttdX58BlhhrGo9cI"
              title="Costantino Scardigno"
              subtitle="Perfetta per Eventi Speciali"
              description="Ho usato l'app durante il matrimonio e l'esperienza è stata eccezionale. Gli invitati hanno condiviso foto e video che hanno reso l'evento ancora più emozionante. Consigliata a chi vuole rivivere ogni momento!"
            />
          </div>
        </div>

        {/* Seconda slide */}
        <div className="carousel-item">
          <div className="d-flex justify-content-evenly w-100 ">
            <Card2
              image="https://i.pinimg.com/736x/77/a7/15/77a715cd234c0b955ebfd157ccfb31bc.jpg"
              title="Davide Scardigno"
              subtitle="Un Must-Have per Ogni Evento"
              description="Utilizzo questa app per tutte le feste e le riunioni di famiglia. È davvero semplice da usare e permette a tutti di contribuire, rendendo ogni album un vero e proprio diario di ricordi. Un'ottima idea realizzata alla perfezione!"
            />
          </div>
        </div>

        {/* Terza slide */}
        <div className="carousel-item">
          <div className="d-flex justify-content-evenly w-100">
            <Card2
              image="https://i.pinimg.com/236x/36/e3/16/36e316c9a68e0b0fd38b0461d59ec788.jpg"
              title="Lucia Scardigno"
              subtitle="Esperienza Indimenticabile!"
              description="L'app è semplicemente fantastica! Organizzare un album condiviso per il compleanno di mio figlio è stato un gioco da ragazzi. Tutti hanno potuto aggiungere foto e video in tempo reale, creando un ricordo unico e coinvolgente."
            />
          </div>
        </div>
      </div>

      {/* Controlli di navigazione */}
      <button
        className="carousel-control-prev "
        type="button"
        data-bs-target="#reviewCarousel"
        data-bs-slide="prev"
      >
        <IoIosArrowBack className="fs-1 text-primary-custom me-5 d-none d-xxl-block mt-5m " />
      </button>

      <button
        className="carousel-control-next  "
        type="button"
        data-bs-target="#reviewCarousel"
        data-bs-slide="next"
      >
        <IoIosArrowForward className="fs-1 text-primary-custom d-none d-xxl-block mt-5m  " />
      </button>
    </section>
  );
}

export default ReviewCarousel;
