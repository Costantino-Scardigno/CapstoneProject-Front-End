import React from "react";
import { Settings, User, Mail, Key, Camera } from "lucide-react";

const SettingsTabSkeleton = () => {
  return (
    <div className="container-fluid py-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card bg-white-custom shadow-sm border-custom">
            <div className="card-header bg-secondary-custom border-custom">
              <div className="d-flex align-items-center">
                <Settings size={20} className="me-2 text-primary-custom" />
                <div className="h5 mb-0 bg-secondary-light rounded h-4 w-50 animate-pulse"></div>
              </div>
            </div>
            <div className="card-body p-4">
              {/* Sezione immagine profilo */}
              <div className="mb-4 text-center">
                <div className="h6 text-primary-custom border-bottom pb-2 mb-3 bg-secondary-light rounded h-4 w-25 mx-auto animate-pulse"></div>
                <div className="d-flex flex-column align-items-center mb-3">
                  <div
                    className="rounded-circle mb-3 position-relative bg-secondary-light animate-pulse"
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                      border: "3px solid var(--secondary-custom)",
                    }}
                  >
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                      <User size={80} className="text-secondary-custom" />
                    </div>
                  </div>

                  {/* Bottone di caricemanto foto */}
                  <div
                    className="btn btn-secondary-custom d-flex align-items-center bg-secondary-light animate-pulse"
                    style={{ height: "38px", width: "180px" }}
                  >
                    <div className="me-2 h-4 w-4"></div>
                    <div className="w-75 h-4"></div>
                  </div>
                </div>
              </div>

              {/* sezione informazioni personali */}
              <div className="mb-4">
                <div className="h6 text-primary-custom  pb-2 mb-3 bg-secondary-subtle rounded h-4 w-40 animate-pulse"></div>

                <div className="mb-3">
                  <div className="form-label d-flex align-items-center bg-secondary-subtle rounded h-4 w-25 animate-pulse mb-2">
                    <User size={16} className="me-2 text-secondary-custom" />
                  </div>
                  <div className="form-control border-custom bg-secondary-subtle h-10 animate-pulse"></div>
                  <div className="text-muted-custom bg-secondary-subtle rounded h-3 w-50 animate-pulse mt-2"></div>
                </div>

                <div className="mb-3">
                  <div className="form-label d-flex align-items-center bg-secondary-subtle rounded h-4 w-25 animate-pulse mb-2">
                    <Mail size={16} className="me-2 text-secondary-custom" />
                  </div>
                  <div className="form-control border-custom bg-secondary-subtle h-10 animate-pulse"></div>
                </div>
              </div>

              {/* sezione cambio password*/}
              <div className="mb-4">
                <div className="h6 text-primary-custom border-bottom pb-2 mb-3 bg-secondary-subtle rounded h-4 w-35 animate-pulse"></div>

                <div className="mb-3">
                  <div className="form-label d-flex align-items-center bg-secondary-subtle rounded h-4 w-35 animate-pulse mb-2">
                    <Key size={16} className="me-2 text-secondary-custom" />
                  </div>
                  <div className="form-control border-custom bg-secondary-subtle h-10 animate-pulse"></div>
                </div>

                <div className="mb-3">
                  <div className="form-label bg-secondary-subtle rounded h-4 w-30 animate-pulse mb-2"></div>
                  <div className="form-control border-custom bg-secondary-subtle h-10 animate-pulse"></div>
                  <div className="text-muted-custom bg-secondary-subtle rounded h-3 w-25 animate-pulse mt-2"></div>
                </div>

                <div className="mb-3">
                  <div className="form-label bg-secondary-subtle rounded h-4 w-40 animate-pulse mb-2"></div>
                  <div className="form-control border-custom bg-secondary-subtle h-10 animate-pulse"></div>
                </div>
              </div>

              {/* bottone di conferma */}
              <div className="d-flex justify-content-end">
                <div
                  className="btn btn-secondary-custom d-flex align-items-center bg-secondary-subtle animate-pulse"
                  style={{ height: "38px", width: "160px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabSkeleton;
