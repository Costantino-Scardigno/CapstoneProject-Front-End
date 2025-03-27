import React from "react";
import { ArrowLeft } from "lucide-react";

const PhotoViewSkeleton = () => {
  return (
    <div className="card shadow-sm border-custom rounded-top-5">
      <div className="card-header rounded-top-5 bg-dashboard d-flex align-items-center">
        <div
          className="bg-dashboard border-0 rounded-circle me-2"
          style={{ width: "30px", height: "30px" }}
        >
          <ArrowLeft size={30} color="#e1bb80" />
        </div>
        <div className="bg-secondary-subtle rounded h-5 w-25 animate-pulse"></div>
      </div>

      <div className="row g-0">
        <div className="col-md-8 bg-dashboard">
          <div className="bg-dark text-center">
            <div
              className="bg-dark animate-pulse"
              style={{ height: "600px", width: "100%" }}
            ></div>
          </div>
          <div className="bg-dashboard p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div className="btn btn-sm d-flex align-items-center flex-column flex-md-row">
                  <div className="me-1 bg-secondary-subtle rounded-circle h-5 w-5 animate-pulse"></div>
                  <div className="bg-secondary-subtle rounded h-4 w-20 animate-pulse"></div>
                </div>
                <div className="btn btn-sm d-flex align-items-center flex-column flex-md-row">
                  <div className="me-1 bg-secondary-subtle rounded-circle h-5 w-5 animate-pulse"></div>
                  <div className="bg-secondary-subtle rounded h-4 w-20 animate-pulse"></div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="d-none d-sm-inline bg-secondary-subtle rounded h-3 w-24 animate-pulse"></div>
                <div className="btn btn-sm bg-secondary-subtle rounded-circle h-5 w-5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-4 bg-dashboard d-flex flex-column"
          style={{ minHeight: "300px" }}
        >
          <div
            className="flex-grow-1 overflow-auto p-3"
            style={{ maxHeight: "568px" }}
          >
            <div className="mb-3 bg-secondary-subtle rounded h-4 w-25 animate-pulse"></div>
            <div className="d-flex flex-column gap-3">
              {/* Skeleton per 3 commenti */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between align-items-start border-start border-bottom border-top border-end p-3 rounded-5 shadow-sm"
                >
                  <div className="d-flex">
                    <div
                      className="rounded-circle bg-secondary-subtle animate-pulse me-2"
                      style={{ width: "32px", height: "32px" }}
                    ></div>
                    <div>
                      <div className="d-flex">
                        <div className="bg-secondary-subtle rounded h-3 w-100 animate-pulse"></div>
                        <div className="ms-2 bg-secondary-subtle rounded h-2 w-75 animate-pulse"></div>
                      </div>
                      <div className="mt-2 bg-secondary-subtle rounded h-3 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="bg-secondary-subtle rounded-circle h-4 w-4 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 mt-4 border-top">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary-subtle animate-pulse me-2"
                style={{ width: "32px", height: "32px" }}
              ></div>
              <div className="input-group flex-grow-1">
                <div className="form-control rounded-pill pe-4 rounded-end-0 bg-secondary-subtle animate-pulse"></div>
                <div className="input-group-append">
                  <div
                    className="btn rounded-end-4 border-start-0 rounded-top-0 rounded-start-0 border-custom bg-secondary-subtle animate-pulse"
                    style={{ width: "40px", height: "38px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewSkeleton;
