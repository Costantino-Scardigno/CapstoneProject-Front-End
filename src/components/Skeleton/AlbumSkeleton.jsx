import "../component_css/Dashboard.css";
const AlbumSkeleton = () => {
  return (
    <>
      <div className="col-md-6 col-lg-4">
        <div className="card bg-white-custom h-100 shadow-sm rounded-4 border-custom">
          <div
            style={{ height: "200px" }}
            className="bg-secondary-subtle rounded-top-4 animate-pulse"
          ></div>
          <div className="card-body">
            <div className="bg-secondary-subtle rounded h-4 w-75 mb-3 animate-pulse"></div>
            <div className="d-flex justify-content-between small mb-2">
              <div className="bg-secondary-subtle rounded h-3 w-25 animate-pulse"></div>
              <div className="bg-secondary-subtle rounded h-3 w-40 animate-pulse"></div>
            </div>
            <div className="d-flex align-items-center gap-3 small mb-3">
              <div className="bg-secondary-subtle rounded h-3 w-15 animate-pulse"></div>
              <div className="bg-secondary-subtle rounded h-3 w-15 animate-pulse"></div>
            </div>
            <div className="d-flex gap-2">
              <div className="bg-secondary-subtle rounded-5 h-9 flex-grow-1 animate-pulse"></div>
              <div className="bg-secondary-subtle rounded-5 h-9 flex-grow-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumSkeleton;
