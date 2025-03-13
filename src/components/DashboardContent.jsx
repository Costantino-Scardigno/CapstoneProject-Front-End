import React from "react";
import {
  Plus,
  Camera,
  Share2,
  Image,
  Heart,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import AlbumView from "./AlbumView";
import PhotoView from "./PhotoView";
import { Trash } from "lucide-react";

const DashboardContent = ({
  activeTab,
  albums,
  setUploadModalOpen,
  setUploadPhotoModalOpen,
  selectedAlbum,
  selectedPhoto,
  albumPhotos,
  setSelectedAlbum,
  setSelectedPhoto,
  toggleLike,
  addComment,
  newComment,
  deleteComment,
  setNewComment,
  handleFileChange,
  uploadedFiles,
  removeFile,
  refreshTrigger,
  deleteAlbum,
  noResults,
  resetSearch,
  openShareModal,
  isLoadingShared,
  sharedAlbums,
}) => {
  return (
    <div className="flex-grow-1 overflow-auto p-4">
      {!selectedAlbum && !selectedPhoto ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="display-4 mb-0">
              {activeTab === "albums" && "I miei Album"}
              {activeTab === "shared" && "Album condivisi con me"}
              {activeTab === "upload" && "Carica nuove foto"}
              {activeTab === "settings" && "Impostazioni"}
            </h2>
            {activeTab === "albums" && (
              <button
                className="btn-info1 border-1 btn bg-dashbord d-flex align-items-center"
                onClick={() => setUploadModalOpen(true)}
              >
                <Plus size={18} className="me-2" />
                <span>Nuovo Album</span>
              </button>
            )}
          </div>

          {activeTab === "albums" && (
            <>
              {/* Visualizzazione messaggio per nessun risultato di ricerca */}
              {noResults ? (
                <div className="text-center mt-5 py-5">
                  <div
                    className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <Search size={32} className="text-warning" />
                  </div>
                  <h3 className="h5 mb-2">Nessun album trovato</h3>
                  <p className="text-muted col-md-6 mx-auto">
                    La tua ricerca non ha prodotto risultati. Prova a utilizzare
                    termini diversi.
                  </p>
                  <button
                    className="btn btn-outline-secondary mt-3"
                    onClick={resetSearch}
                  >
                    Mostra tutti gli album
                  </button>
                </div>
              ) : albums.length > 0 ? (
                <div className="row g-4">
                  {albums.map((album) => (
                    <div key={album.id} className="col-md-6 col-lg-4">
                      <div
                        className="card bg-info1 h-100 shadow-sm rounded-4 border-black"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <div style={{ height: "200px" }}>
                          <img
                            src={
                              album.photos && album.photos.length > 0
                                ? album.photos[0].url
                                : "/api/placeholder/300/200"
                            }
                            alt={album.name || album.title}
                            className="card-img rounded-top-4 h-100 object-fit-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/300/200";
                            }}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{album.name}</h5>
                          <div className="d-flex justify-content-between small text-muted mb-2">
                            <span>{album.photoCount} foto</span>
                            <div className="d-flex align-items-center">
                              <Share2 size={14} className="me-1" />
                              <span>Condiviso con {album.shared || 0}</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3 small mb-3">
                            <div className="d-flex align-items-center">
                              <Heart size={14} className="me-1 text-danger" />
                              <span className="me-1"></span>
                              <span>{album.totalLikeCount || 0}</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <MessageSquare
                                size={14}
                                className="me-1 text-primary"
                              />
                              <span className="me-1"></span>
                              <span>{album.totalCommentCount || 0}</span>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-delete btn-animated-album rounded-5 flex-grow-1 d-flex align-items-center justify-content-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAlbum(album.id);
                              }}
                            >
                              <Trash size={16} className="me-2" />
                              <span>Elimina</span>
                            </button>
                            <button
                              className="btn btn-info-1 btn-animated-album w-50 rounded-5 flex-grow-1 d-flex align-items-center justify-content-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                openShareModal(album);
                              }}
                            >
                              <Share2 size={16} className="me-2" />
                              <span>Condividi</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-6 col-lg-4">
                    <div
                      className="card h-100 border-dashed border-2 d-flex align-items-center justify-content-center p-4"
                      style={{ borderStyle: "dashed", cursor: "pointer" }}
                      onClick={() => setUploadModalOpen(true)}
                    >
                      <div className="text-center">
                        <div
                          className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{ width: "64px", height: "64px" }}
                        >
                          <Plus size={32} className="text-primary" />
                        </div>
                        <p className="mb-1 fw-medium">Crea nuovo album</p>
                        <p className="text-muted small">
                          Aggiungi e condividi nuove foto
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <Image size={32} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-2">Nessun album creato</h3>
                  <p className="text-muted col-md-6 mx-auto">
                    Non hai ancora creato album. Crea il tuo primo album per
                    iniziare a condividere le tue foto!
                  </p>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => setUploadModalOpen(true)}
                  >
                    <Plus size={16} className="me-2" />
                    Crea il tuo primo album
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "shared" && (
            <>
              {isLoadingShared ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                  </div>
                  <p className="mt-3">Caricamento album condivisi...</p>
                </div>
              ) : sharedAlbums.length > 0 ? (
                <div className="row g-4">
                  {sharedAlbums.map((album) => (
                    <div key={album.id} className="col-md-6 col-lg-4">
                      <div
                        className="card bg-info1 h-100 shadow-sm rounded-4 border-black"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedAlbum(album)}
                      >
                        <div style={{ height: "200px" }}>
                          <img
                            src={
                              album.photos && album.photos.length > 0
                                ? album.photos[0].url
                                : "/api/placeholder/300/200"
                            }
                            alt={album.name}
                            className="card-img rounded-top-4 h-100 object-fit-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/300/200";
                            }}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{album.name}</h5>
                          <p className="text-muted small">
                            Condiviso da: {album.createdByUsername}
                          </p>
                          <div className="d-flex justify-content-between small text-muted mb-2">
                            <span>{album.photoCount} foto</span>
                          </div>
                          <div className="d-flex align-items-center gap-3 small mb-3">
                            <div className="d-flex align-items-center">
                              <Heart size={14} className="me-1 text-danger" />
                              <span>{album.totalLikeCount || 0}</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <MessageSquare
                                size={14}
                                className="me-1 text-primary"
                              />
                              <span>{album.totalCommentCount || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <Share2 size={32} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-2">Nessun album condiviso</h3>
                  <p className="text-muted col-md-6 mx-auto">
                    Al momento non ci sono album condivisi con te. Quando
                    qualcuno condividerà un album, apparirà qui.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "upload" && (
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="h5 mb-0">Carica nuove foto</h3>
                  <select className="form-select" style={{ width: "auto" }}>
                    <option>Seleziona Album</option>
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.title}
                      </option>
                    ))}
                    <option value="new">Nuovo Album</option>
                  </select>
                </div>

                <div
                  className="border border-2 rounded p-5 text-center"
                  style={{ borderStyle: "dashed" }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <Camera size={48} className="text-muted mb-3" />
                    <p className="text-muted mb-2">
                      Trascina qui le tue foto o
                    </p>
                    <label className="btn btn-primary">
                      Sfoglia file
                      <input
                        type="file"
                        multiple
                        className="d-none"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-muted small mt-2">
                      Supporta JPG, PNG e GIF fino a 10MB
                    </p>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="h6 mb-3">
                      File selezionati ({uploadedFiles.length})
                    </h4>
                    <div className="d-flex flex-column gap-3">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center bg-light p-3 rounded"
                        >
                          <div
                            className="me-3"
                            style={{ width: "64px", height: "64px" }}
                          >
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="img-fluid rounded h-100 w-100 object-fit-cover"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-medium">{file.name}</p>
                            <p className="mb-0 small text-muted">{file.size}</p>
                          </div>
                          <button
                            className="btn btn-sm btn-light rounded-circle"
                            onClick={() => removeFile(index)}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setUploadedFiles([])}
                      >
                        Annulla
                      </button>
                      <button className="btn btn-primary">Carica foto</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : null}

      {selectedAlbum && !selectedPhoto && (
        <AlbumView
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
          albumPhotos={albumPhotos}
          setSelectedPhoto={setSelectedPhoto}
          setUploadModalOpen={setUploadModalOpen}
          setUploadPhotoModalOpen={setUploadPhotoModalOpen}
          toggleLike={toggleLike}
          refreshTrigger={refreshTrigger}
          openShareModal={openShareModal}
        />
      )}

      {selectedPhoto && (
        <PhotoView
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          selectedAlbum={selectedAlbum}
          toggleLike={toggleLike}
          addComment={addComment}
          newComment={newComment}
          setNewComment={setNewComment}
          refreshTrigger={refreshTrigger}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
};

export default DashboardContent;
