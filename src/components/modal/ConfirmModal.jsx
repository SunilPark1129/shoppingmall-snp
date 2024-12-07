import React from 'react';

/** HOW TO USE THIS COMPONENT ->
  const [confirmOption, setConfirmOption] = useState({
    open: false,
    isWarning: false,
    message: "Would you like to upload this item?",
    cb: ()=>{}
  });

  <ConfirmModal
    setConfirmOption={setConfirmOption}
    confirmOption={confirmOption}
  />;
*/

function ConfirmModal({ setConfirmOption, confirmOption }) {
  function handleUpload() {
    confirmOption.cb();
    setConfirmOption({ open: false });
  }

  function handleCancel() {
    setConfirmOption({ open: false });
  }

  return (
    <>
      <div
        className={`confirm-modal ${
          confirmOption.isWarning && 'confirm-modal--warning'
        }`}
      >
        <div className="confirm-modal__title">
          {confirmOption.isWarning ? 'Warning' : 'Confirm'}
        </div>
        <p className="confirm-modal__message">{confirmOption.message}</p>
        <div className="confirm-modal__btn-box">
          <button onClick={handleUpload}>YES</button>
          <button onClick={handleCancel}>NO</button>
        </div>
      </div>
      <div
        className="confirm-modal-bg"
        onClick={() => setConfirmOption({ open: false })}
      ></div>
    </>
  );
}

export default ConfirmModal;
