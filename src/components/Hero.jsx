import "./component_css/Hero.css";
import video from "../assets/matrimonio.mp4";

function MyHero({ setShowForm }) {
  const handleClick = () => {
    const element = document.getElementById("how");
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container-fluid padding-top-5 bg-light-custom">
      <div className="row ">
        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-7 d-flex  flex-column  px-4">
          <h1
            id="my-text"
            className="slide-in-left fw-bold lh-1 text-primary-custom  "
          >
            Cattura ogni istante speciale delle tue feste ed eventi più
            importanti!
            <br /> <span className="text-secondary-custom">Scatta </span>{" "}
            <span className="text-secondary-custom">Condividi </span>{" "}
            <span className="text-secondary-custom">Conserva </span> i ricordi
            più belli
          </h1>
          <p className="slide-in-left fs-1 lh-custom  fw-lighter mt-2 text-muted-custom mt-sm-3">
            Abbiamo reso facile e semplice la raccolta di foto in tempo reale in
            un album condiviso accessibile ai tuoi invitati
          </p>
          <div className="row mt-xl-5 ">
            <div className="col-sm-6 mt-4 ">
              <button
                onClick={handleClick}
                className="slide-in-bottom btn-animated-album btn btn-primary-custom w-100 rounded-pill mb-md- py-2 py-md-3 fs-4 text-white"
              >
                Come funziona?
              </button>
            </div>
            <div className="col-sm-6 mt-4 ">
              {/* Bottone "Crea Album" */}
              <button
                onClick={() => setShowForm(true)}
                className="slide-in-bottom btn btn-animated-album btn-secondary-custom w-100 py-2 py-md-3 rounded-pill fs-4 fw-bold"
              >
                Crea Album
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-12 col-xl-5 col-xxl-5 d-lg-none d-xl-block d-md-none d-lg-block d-sm-none d-md-block d-none d-sm-block d-xl-none d-xxl-block px-4">
          <div className="grid-container">
            <div className="rounded-4 roll-in-top  item item1"></div>
            <div className=" roll-in-top item item2 rounded-4  d-lg-none d-xl-block">
              <video className="rounded-4" autoPlay muted loop playsInline>
                <source src={video} type="video/mp4" />
              </video>
            </div>
            <div className="rounded-4 roll-in-right  item item4"></div>
            <div className="rounded-4 roll-in-bottom  item item12"></div>
            <div className="rounded-4 roll-in-bottom item item10"></div>
            <div className="rounded-4 roll-in-left item item11"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyHero;
