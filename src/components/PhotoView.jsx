import React, { useEffect, useState, useRef } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  User,
  Send,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import DeleteCommentModal from "./modals/DeleteCommentModal";
import PhotoViewSkeleton from "./Skeleton/PhotoViewSkeleton";
import ImageFullscreenModal from "./modals/ImageFullscreenModal";
import config from "../../config";

const PhotoView = ({
  selectedPhoto,
  setSelectedPhoto,
  selectedAlbum,
  toggleLike,
  addComment,
  newComment,
  setNewComment,
  refreshTrigger,
  deleteComment,
}) => {
  // Stati generali
  const [photoDetails, setPhotoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Stato per il modale di conferma eliminazione
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [deletingComment, setDeletingComment] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // Stato per la gestione dei commenti con paginazione
  const [displayedComments, setDisplayedComments] = useState([]);
  const [commentsPerPage] = useState(9); // Numero di commenti da caricare inizialmente
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);

  // Ref per il contenitore dei commenti
  const commentsContainerRef = useRef(null);
  const FormCommentRef = useRef(null);

  // Effetto per ottenere le informazioni dell'utente corrente
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return;

    // Prima dobbiamo decodificare il token JWT per ottenere il nome utente
    try {
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        console.error("Token JWT non valido");
        return;
      }

      // Decodifica la parte payload (seconda parte) del token
      const payload = JSON.parse(atob(tokenParts[1]));
      const username = payload.sub || payload.username;

      if (!username) {
        console.error("Nome utente non trovato nel token");
        return;
      }

      fetch(`${config.URL}/api/users/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore nel recupero delle informazioni utente");
          }
          return response.json();
        })
        .then((data) => {
          setCurrentUser({
            ...data,
            username: username,
          });
        })
        .catch((error) => {
          console.error(
            "Errore nel recupero delle informazioni utente:",
            error
          );
        });
    } catch (error) {
      console.error("Errore nella decodifica del token:", error);
    }
  }, []);

  // Effetto per caricare i dettagli della foto
  useEffect(() => {
    if (!selectedPhoto || !selectedPhoto.id) {
      setLoading(false);
      return;
    }

    // Recupera il token dal sessionStorage
    const token = sessionStorage.getItem("authToken");

    fetch(`${config.URL}/api/photos/${selectedPhoto.id}?includeDetails=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero dei dettagli della foto!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dettagli foto recuperati:", data);
        setPhotoDetails(data);

        // Gestione iniziale dei commenti
        const allComments = data.comments || [];
        const initialComments = allComments.slice(0, commentsPerPage);
        setDisplayedComments(initialComments);
        setHasMoreComments(allComments.length > commentsPerPage);

        setLoading(false);

        // Verifica lo stato del like
        checkLikeStatus(data.id);
      })
      .catch((error) => {
        console.error("Errore nel caricamento della foto:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [selectedPhoto?.id, refreshTrigger, commentsPerPage]);

  // Funzione per verificare se l'utente ha messo like alla foto
  const checkLikeStatus = (photoId) => {
    const token = sessionStorage.getItem("authToken");

    fetch(`${config.URL}/api/likes/photo/${photoId}/status`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel verificare lo stato del like");
        }
        return response.json();
      })
      .then((data) => {
        // Imposta lo stato isLiked in base alla risposta
        setIsLiked(data.message === "true");
      })
      .catch((error) => {
        console.error("Errore nel verificare lo stato del like:", error);
      });
  };

  // Funzione per verificare se l'utente corrente è l'autore del commento
  const isCommentAuthor = (comment) => {
    if (!currentUser) return false;

    // Confronta l'ID utente o username
    return (
      (comment.userId && currentUser.id && comment.userId === currentUser.id) ||
      (comment.username &&
        currentUser.username &&
        comment.username === currentUser.username)
    );
  };

  // Funzione per gestire il click sul pulsante like
  const handleToggleLike = () => {
    setIsLiked(!isLiked);

    // Chiama la funzione toggleLike passata come prop
    toggleLike(photoDetails.id);
  };

  // Funzione per caricare più commenti
  const loadMoreComments = () => {
    if (!photoDetails || !photoDetails.comments || loadingMoreComments) return;

    setLoadingMoreComments(true);

    const allComments = photoDetails.comments || [];
    const nextPage = currentPage + 1;
    const endIndex = nextPage * commentsPerPage;
    const nextComments = allComments.slice(0, endIndex);

    setDisplayedComments(nextComments);
    setCurrentPage(nextPage);
    setHasMoreComments(endIndex < allComments.length);
    setLoadingMoreComments(false);
  };

  //Scroll al Form per commentare
  const handleClickCommentButton = () => {
    FormCommentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Evento scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        !commentsContainerRef.current ||
        !hasMoreComments ||
        loadingMoreComments
      )
        return;

      const { scrollTop, scrollHeight, clientHeight } =
        commentsContainerRef.current;

      // Carica più commenti quando l'utente è a 30px dal fondo
      if (scrollTop + clientHeight >= scrollHeight - 30) {
        loadMoreComments();
      }
    };

    const container = commentsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMoreComments, loadingMoreComments]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    addComment(selectedPhoto.id, newComment);
  };

  // Apre il modale di conferma
  const openDeleteModal = (comment) => {
    setCommentToDelete(comment);
    setShowDeleteModal(true);
    setDeleteError(null);
  };

  // Chiude il modale di conferma
  const closeDeleteModal = () => {
    setCommentToDelete(null);
    setShowDeleteModal(false);
    setDeleteError(null);
  };

  // Gestisce l'eliminazione di un commento
  const handleDeleteComment = () => {
    if (!commentToDelete || !commentToDelete.id) return;

    setDeletingComment(true);
    setDeleteError(null);

    // Recupera il token dal sessionStorage
    const token = sessionStorage.getItem("authToken");

    fetch(`${config.URL}/api/comments/${commentToDelete.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del commento");
        }
        // Aggiorna la lista dei commenti visualizzati rimuovendo quello eliminato
        setDisplayedComments(
          displayedComments.filter(
            (comment) => comment.id !== commentToDelete.id
          )
        );

        // Se ci sono più commenti disponibili, aggiorna anche i dettagli della foto
        if (photoDetails && photoDetails.comments) {
          const updatedComments = photoDetails.comments.filter(
            (comment) => comment.id !== commentToDelete.id
          );
          setPhotoDetails({
            ...photoDetails,
            comments: updatedComments,
          });
        }

        if (typeof deleteComment === "function") {
          deleteComment(commentToDelete.id);
        }

        // Chiude il modale
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("Errore nell'eliminazione del commento:", error);
        setDeleteError(
          "Non è stato possibile eliminare il commento: " + error.message
        );
      })
      .finally(() => {
        setDeletingComment(false);
      });
  };

  // Formatta la data in modo leggibile
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Mostra  indicatore di caricamento
  if (loading) {
    return <PhotoViewSkeleton />;
  }

  // Mostra eventuali errori
  if (error) {
    return (
      <div className="card shadow-sm border-custom">
        <div className="card-body">
          <div className="alert alert-danger">{error}</div>
          <button
            className="btn btn-outline-custom"
            onClick={() => setSelectedPhoto(null)}
          >
            Torna all'album
          </button>
        </div>
      </div>
    );
  }

  // Usa photoDetails se disponibile, altrimenti selectedPhoto come fallback
  const photo = photoDetails || selectedPhoto;
  const comments = photo.comments || [];

  // Funzioni per apertura e chiusura del modale per visiualizzare la foto a schermo intero
  const openFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const likesCount =
    photo.likeCount !== undefined
      ? photo.likeCount
      : photo.likes !== undefined
      ? photo.likes
      : 0;

  return (
    <div className="card shadow-sm  border-custom rounded-5">
      <div className="card-header border-bottom-0 rounded-top-5 bg-dashboard d-flex align-items-center">
        <button
          className="bg-dashboard border-0 rounded-circle me-2"
          onClick={() => setSelectedPhoto(null)}
        >
          <ArrowLeft size={30} color="#e1bb80" />
        </button>
        <h5 className="mb-0 text-primary-custom">
          Foto da {selectedAlbum.name}
        </h5>
      </div>

      <div className="row g-0 bg-dashboard rounded-5">
        <div className="col-md-8 bg-dashboard rounded-bottom-5">
          <div className="bg-dark text-center">
            <img
              src={photo.url}
              alt=""
              className="img-fluid"
              style={{ cursor: "pointer", maxHeight: "600px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/800/600";
              }}
              onClick={openFullscreen}
            />
          </div>
          <div className="bg-dashboard p-3 rounded-bottom-5">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="d-flex align-items-center gap-3  ">
                <button
                  className={`btn btn-sm ${
                    isLiked ? "text-danger" : "text-muted-custom"
                  } d-flex align-items-center d-flex flex-column flex-md-row`}
                  onClick={handleToggleLike}
                >
                  <Heart
                    className="me-1"
                    size={18}
                    fill={isLiked ? "currentColor" : "none"}
                  />
                  <span>{likesCount} mi piace</span>
                </button>
                <button
                  onClick={handleClickCommentButton}
                  className="btn btn-sm text-muted-custom d-flex align-items-center d-flex flex-column flex-md-row"
                >
                  <MessageSquare
                    className="me-1 text-secondary-custom"
                    size={18}
                  />
                  <span>{comments.length} commenti</span>
                </button>
              </div>
              <div className="d-flex align-items-center gap-2">
                <small className="d-none d-sm-inline text-muted-custom">
                  {formatDate(photo.timestamp)}
                </small>
                <button className="btn btn-sm text-muted-custom">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-4 rounded-bottom-5 bg-dashboard d-flex flex-column"
          style={{ minHeight: "300px" }}
        >
          <div
            className="flex-grow-1 overflow-auto p-3  border-top border-custom"
            ref={commentsContainerRef}
            style={{ maxHeight: "568px" }}
          >
            <h6 className="mb-3 text-primary-custom">Commenti</h6>
            {displayedComments.length === 0 ? (
              <p className="text-muted-custom text-center my-5">
                Nessun commento. Sii il primo a commentare!
              </p>
            ) : (
              <div className="d-flex flex-column gap-3 ">
                {displayedComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="d-flex justify-content-between align-items-start border-start border-bottom border-top border-end p-3 rounded-5 shadow-sm"
                  >
                    <div className="d-flex">
                      <div
                        className="rounded-circle bg-secondary-custom d-flex align-items-center justify-content-center me-2"
                        style={{ width: "32px", height: "32px" }}
                      >
                        {comment.profileImage ? (
                          <img
                            src={comment.profileImage}
                            alt="immagine di profilo"
                            className="w-100 h-100 rounded-circle object-fit-cover"
                          />
                        ) : (
                          <User size={24} className="text-white-custom" />
                        )}
                      </div>
                      <div>
                        <div>
                          <span className="small fw-medium text-primary-custom">
                            {comment.username || comment.user}
                          </span>
                          <span
                            className="ms-2 text-muted-custom"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {formatDate(comment.createdAt) || comment.time}
                          </span>
                        </div>
                        <p className="mb-0 small text-primary-custom">
                          {comment.content || comment.text}
                        </p>
                      </div>
                    </div>
                    <div>
                      {/* Mostra il pulsante di eliminazione solo se l'utente è l'autore del commento */}
                      {isCommentAuthor(comment) && (
                        <button
                          className="btn btn-sm text-danger p-0"
                          onClick={() => openDeleteModal(comment)}
                          title="Elimina commento"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {loadingMoreComments && (
                  <div className="text-center py-2">
                    <div
                      className="spinner-border spinner-border-sm text-secondary-custom"
                      role="status"
                    >
                      <span className="visually-hidden">Caricamento...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-3 mt-4 border-top">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary-custom d-flex align-items-center justify-content-center me-2"
                style={{ width: "32px", height: "32px" }}
              >
                {currentUser.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt="immagine di profilo"
                    className="w-100 h-100 rounded-circle object-fit-cover"
                  />
                ) : (
                  <User size={24} className="text-white-custom" />
                )}
              </div>
              <div ref={FormCommentRef} className="input-group">
                <input
                  type="text"
                  placeholder="Aggiungi un commento..."
                  className="form-control rounded-pill pe-4 rounded-end-0"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment();
                    }
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn rounded-end-4 border-start-0 rounded-top-0 rounded-start-0 border-custom bg-white-custom"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send size={16} className="text-secondary-custom" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modale per l'eliminazione del commento */}
      <DeleteCommentModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteComment}
        comment={commentToDelete}
        isDeleting={deletingComment}
        error={deleteError}
      />

      {/* Modale per visualizzare la foto selezionata */}
      <ImageFullscreenModal
        isOpen={isFullscreen}
        imageUrl={photo.url}
        onClose={closeFullscreen}
      />
    </div>
  );
};

export default PhotoView;
