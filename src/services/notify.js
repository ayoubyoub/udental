import {toast} from "react-toastify";

export const notifyAdd = (msg, position) => {
  toast.info(msg, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  });
};

export const notifyEdit = (msg, position) => {
  toast.success(msg, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  });
};

export const notifyDelete = (msg, position) => {
  toast.error(msg, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  });
};

export const notifyError = (msg, position) => {
  toast.warn(msg, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  });
};
