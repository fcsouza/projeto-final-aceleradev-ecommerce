import React from "react";

import "./imgModal.css";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../actions/modals";

export default function ImgModal({ id = "modal", img, showImg }) {
  const dispatch = useDispatch();

  const handleOutsideClick = (e) => {
    if (e.target.id === id) dispatch(modalsActions.handleCloseImg());
  };

  return (
    <div
      id={id}
      className={showImg ? "modal-img" : "modal-img modal-img--hide"}
      onClick={handleOutsideClick}
    >
      <div className="img-modal__poster">
        <FiX
          className="icon icon--close-modal"
          onClick={() => dispatch(modalsActions.handleCloseImg())}
        />
        <img className="img-modal__img" src={img} alt="imgModal" />
      </div>
    </div>
  );
}
