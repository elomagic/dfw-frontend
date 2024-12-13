import './TitleHeader.css';
import {Bounce, toast} from "react-toastify";

// enqueueSnackbar("Error during language change: " + err.message, { variant: 'error'} ));
export const toaster = (text: string, variant: 'error'|'info'|'success'): void => {

    const config = {
        // position:  "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
