import "../components/SectionHow.css";

function SectionHow() {
  return (
    <>
      <section id="how" className="conteiner-fluid  pt-6   ">
        <div className="row justify-content-evenly">
          <h2 className="text-center display-1 mb-5">Come funziona?</h2>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 border border-black rounded-5 d-flex flex-column justify-content-evenly fixed-height bg-how ">
            <div className=" ">
              <h2 className="display-1 h-color">01</h2>
            </div>
            <div>
              <h3 className="display-5">Crea un album gratuito</h3>
            </div>
            <div>
              <p className="fs-2">Registrati, crea il tuo album</p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 border border-black rounded-5 d-flex flex-column justify-content-evenly fixed-height bg-how ">
            <div className=" ">
              <h2 className="display-1 h-color">02</h2>
            </div>
            <div>
              <h3 className="display-5">Condividi il tuo album</h3>
            </div>
            <div>
              <p className="fs-3">
                ScattiFestosi creerà un URL e codice QR unici da condividere con
                i tuoi ospiti
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 border border-black rounded-5 d-flex flex-column justify-content-evenly fixed-height bg-how  ">
            <div className=" ">
              <h2 className="display-1 h-color">03</h2>
            </div>
            <div>
              <h3 className="display-5">Raccogli ricordi</h3>
            </div>
            <div>
              <p className="fs-3">
                Gli ospiti caricano foto e video che vanno direttamente
                nell'album condiviso
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SectionHow;
