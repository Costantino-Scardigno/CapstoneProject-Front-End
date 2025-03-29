import "./component_css/Section.css";
import { Images, QrCode, Users } from "lucide-react";

function Mysection() {
  return (
    <section
      id="utilità"
      className="container-fluid bg-light-custom mb-lg-5 py-xl-5 pt-0 "
    >
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <h2 className="display-1 fw-medium  text-center my-5 text-primary-custom mt-5">
              Perchè è utile ScattiFestosi?
            </h2>
            <div className="d-flex align-items-center px-0 px-xl-4">
              <img
                className="rounded-5 w-20  mb-4  d-none d-xxl-block"
                src="https://images.weduploader.com/v2/assets/images/wedding-image5.jpg"
                alt=""
              />
              <div>
                <div className="d-flex align-items-start mb-5 mt-4  ">
                  <div>
                    <Users className="responsive-icon me-2 mx-sm-3 text-secondary-custom" />
                  </div>
                  <p className="fs-2  pb-4 text-muted-custom">
                    Gratis per te, gratis per i tuoi ospiti! Crea album
                    illimitati che non scadono mai.
                  </p>
                </div>
                <div className="d-flex align-items-start mb-5  ">
                  <div>
                    <Images className="responsive-icon me-2 mx-sm-3 text-secondary-custom" />
                  </div>
                  <p className="fs-2 lh-sm pb-4 text-muted-custom">
                    ScattiFestosi consente caricamenti illimitati, in qualità
                    originale, da parte di ospiti illimitati ed è tutto
                    archiviato privatamente in cloud.
                  </p>
                </div>
                <div className="d-flex align-items-start  ">
                  <div>
                    <QrCode className="responsive-icon me-2 mx-sm-3 text-secondary-custom" />
                  </div>
                  <p className="fs-2 lh-sm pb-4 text-muted-custom">
                    ScattiFestosi consente ai tuoi ospiti di caricare foto
                    utilizzando qualsiasi browser web tramite URL o codice QR.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mysection;
