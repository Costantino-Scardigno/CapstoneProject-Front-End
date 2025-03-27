const PhotoSkeleton = () => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm rounded-4 border-custom">
        <div
          style={{ height: "200px" }}
          className="bg-secondary-subtle rounded-top-4 animate-pulse"
        ></div>
        <div className="card-body rounded-bottom-4 bg-card-photo">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <div className="me-1 bg-secondary-subtle rounded-circle h-4 w-4 animate-pulse"></div>
                <div className="small bg-secondary-subtle rounded h-3 w-8 animate-pulse"></div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-1 bg-secondary-subtle rounded-circle h-4 w-4 animate-pulse"></div>
                <div className="small bg-secondary-subtle rounded h-3 w-8 animate-pulse"></div>
              </div>
            </div>
            <div className="btn btn-sm border-custom bg-secondary-subtle rounded h-6 w-8 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhotoSkeleton;
