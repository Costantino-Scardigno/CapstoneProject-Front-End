import { useState, useEffect } from "react";
import "./component_css/Form.css";
import { useNavigate } from "react-router-dom";

function Form({ show, onClose }) {
  const [activeForm, setActiveForm] = useState("register"); // "register" di default
  const navigate = useNavigate();

  // Stato per il form di login
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Stato per il form di registrazione
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Stato per messaggi di errore e successo
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSucces] = useState("");

  // Stato per l'elaborazione
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Se c'è un pendingShareCode, mostra il form di login
    if (localStorage.getItem("pendingShareCode")) {
      setActiveForm("login");
    }
  }, [show]);

  const handleClose = () => {
    const modale = document.getElementById("modale");
    const modaleBackDrop = document.getElementById("modale-backdrop");
    if (modale && modaleBackDrop) {
      modale.classList.remove("animation");
      modale.classList.add("animation-close");
      modaleBackDrop.classList.remove("animation");
      modaleBackDrop.classList.add("animation-close");
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      onClose();
    }
  };

  // Funzione per gestire il reindirizzamento dopo il login
  const handlePostLoginRedirect = () => {
    const pendingShareCode = localStorage.getItem("pendingShareCode");

    if (pendingShareCode) {
      // Se c'è un codice di condivisione in attesa, reindirizza alla pagina dell'album
      navigate(`/album/share/${pendingShareCode}`);
      // Rimuovi il codice di condivisione pendente
      localStorage.removeItem("pendingShareCode");
    } else {
      // Altrimenti, va alla dashboard
      navigate("/dashboard");
    }

    handleClose();
  };

  // Funzione per eseguire il login
  const Login = async () => {
    setLoginError("");
    setIsLoggingIn(true);

    const user = {
      username: userName,
      password: userPassword,
    };

    try {
      const response = await fetch(
        "https://sure-kiele-costantino98-efa87c8c.koyeb.app/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (err) {
          console.warn("Errore nel parsing JSON:", err);
          setLoginError("Errore nella risposta del server");
          setIsLoggingIn(false);
          return;
        }
      } else {
        data = await response.text();
        data = { message: data || "Errore sconosciuto" };
      }

      if (!response.ok) {
        // Gestisce i diversi codici di stato HTTP
        switch (response.status) {
          case 401:
            throw new Error("Username o password non validi");
          case 403:
            throw new Error("Account bloccato o non autorizzato");
          case 404:
            throw new Error("Username non trovato");
          default:
            throw new Error(data.message || "Errore durante il login");
        }
      }

      // Login riuscito
      localStorage.setItem("authToken", data.token);
      console.log("Login avvenuto con successo:");

      // Reindirizza l'utente dopo il login
      handlePostLoginRedirect();
    } catch (error) {
      console.error("Errore login:", error);
      setLoginError(error.message || "Username o password non validi");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Funzione per eseguire la registrazione
  const Register = async () => {
    setRegisterError("");
    setIsRegistering(true);

    // Validazione base
    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError("Tutti i campi sono obbligatori");
      setIsRegistering(false);
      return;
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setRegisterError("Formato email non valido");
      setIsRegistering(false);
      return;
    }

    // Validazione password (minimo 6 caratteri)
    if (registerPassword.length < 6) {
      setRegisterError("La password deve contenere almeno 6 caratteri");
      setIsRegistering(false);
      return;
    }

    // Oggetto con i dati di registrazione
    const newUser = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    try {
      console.log("Invio dati registrazione:", newUser);

      const response = await fetch(
        "https://sure-kiele-costantino98-efa87c8c.koyeb.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      // Gestione della risposta per evitare errori JSON
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (err) {
          console.warn("Errore nel parsing JSON:", err);
          setRegisterError("Errore nella risposta del server");
          setIsRegistering(false);
          return;
        }
      } else {
        // Se la risposta non è JSON
        data = await response.text();
        console.log("Risposta non-JSON:", data);
        data = { message: data || "Risposta vuota dal server" };
      }

      if (!response.ok) {
        // Gestisce i diversi codici di stato e messaggi
        switch (response.status) {
          case 400:
            // Se contiene "Username is already taken"
            if (
              data.message &&
              data.message.includes("Username is already taken")
            ) {
              throw new Error("Username già in uso. Scegli un altro username.");
            } else if (
              data.message &&
              data.message.includes("Email is already in use")
            ) {
              throw new Error(
                "Email già in uso. Usa un'altra email o effettua il login."
              );
            } else {
              throw new Error(
                data.message || "Dati di registrazione non validi"
              );
            }
          default:
            throw new Error(data.message || "Errore durante la registrazione");
        }
      }

      // Mostra un messaggio di successo e passa al form di login
      setRegisterSucces("Registrazzione avvenuta con successo!");

      setTimeout(() => {
        setRegisterSucces("");
        setActiveForm("login");
      }, 2000);

      // Resetta i campi del form di registrazione
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      setRegisterError(error.message || "Errore durante la registrazione");
    } finally {
      setIsRegistering(false);
    }
  };

  if (!show) return null;
  return (
    <>
      {/* Modale */}
      <div
        id="modale"
        className="modal animation"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-5">
            {/* Header del modale */}
            <div className="modal-header bg-secondary-custom rounded-top-5">
              <h5 className="modal-title display-5 fw-bold text-accent">
                {activeForm === "register" ? "Registrazione" : "Login"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Chiudi"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-evenly rounded-bottom-5">
              {/* Contenitore slider */}
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    width: "200%",
                    transform:
                      activeForm === "register"
                        ? "translateX(0)"
                        : "translateX(-50%)",
                    transition: "transform 0.5s ease",
                  }}
                >
                  {/* Form di registrazione */}
                  <div
                    className="d-flex justify-content-center m-4"
                    style={{ width: "50%", paddingRight: "15px" }}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        Register();
                      }}
                    >
                      {registerError && (
                        <div className="alert alert-danger" role="alert">
                          {registerError}
                        </div>
                      )}
                      {registerSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                          {registerSuccess}
                        </div>
                      )}
                      <div className="d-flex flex-column mb-3">
                        <label htmlFor="nome" className="form-label fs-4">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control form-placeholder"
                          id="nome"
                          placeholder="Inserisci il tuo username"
                          value={registerUsername}
                          onChange={(e) => setRegisterUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fs-4">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control form-placeholder"
                          id="email"
                          placeholder="LaTuaEmail@esempio.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label fs-4">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-placeholder"
                          id="password"
                          placeholder="Inserisci la password"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn-animated-album btn btn-secondary-custom w-50 mt-3"
                          disabled={isRegistering}
                        >
                          {isRegistering ? (
                            <span>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Registrazione...
                            </span>
                          ) : (
                            "Registrati"
                          )}
                        </button>
                      </div>
                      <div className="mt-3 text-center">
                        <span>Se hai già un account, </span>
                        <a
                          className="text-custom-info text-decoration-none"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveForm("login");
                          }}
                        >
                          fai il login
                        </a>
                      </div>
                    </form>
                  </div>
                  {/* Form di login */}
                  <div
                    className="d-flex justify-content-center m-4 mt-5"
                    style={{ width: "50%", paddingLeft: "15px" }}
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        Login();
                      }}
                    >
                      {loginError && (
                        <div className="alert alert-danger" role="alert">
                          {loginError}
                        </div>
                      )}

                      {/* Mostra un messaggio se c'è un album condiviso in attesa */}
                      {localStorage.getItem("pendingShareCode") && (
                        <div className="alert alert-info mb-3" role="alert">
                          <p className="mb-1 fw-bold">
                            Accedi per visualizzare l'album condiviso
                          </p>
                          <small>
                            Per accedere all'album condiviso, effettua il login
                            o registrati. L'album apparirà automaticamente nei
                            tuoi album condivisi.
                          </small>
                        </div>
                      )}

                      <div className="d-flex flex-column mb-4">
                        <label
                          htmlFor="usernameLogin"
                          className="form-label fs-4"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control form-placeholder"
                          id="usernameLogin"
                          placeholder="Inserisci il tuo username"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-flex flex-column mb-3">
                        <label
                          htmlFor="passwordLogin"
                          className="form-label fs-4"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-placeholder"
                          id="passwordLogin"
                          placeholder="Inserisci la password"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn-animated-album btn btn-secondary-custom w-50 mt-3"
                          disabled={isLoggingIn}
                        >
                          {isLoggingIn ? (
                            <span>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Login...
                            </span>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                      <div className="mt-5 text-center">
                        <span>Se ancora non hai un account, </span>
                        <a
                          className="text-custom-info text-decoration-none"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveForm("register");
                          }}
                        >
                          Registrati
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop del modale */}
      <div
        id="modale-backdrop"
        className="modal-backdrop bg-modal animation"
      ></div>
    </>
  );
}

export default Form;
