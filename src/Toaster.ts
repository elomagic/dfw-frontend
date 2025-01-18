"use client"

import {Bounce, toast, ToastOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toaster = (text: string, variant: 'error'|'info'|'success'): void => {

    const config: ToastOptions = {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Bounce,
    };

    switch (variant) {
        case 'info':
            toast.info(text, config);
            break;
        case 'success':
            toast.success(text, config);
            break;
        case 'error':
            toast.error(text, config);
            break;
    }

}
