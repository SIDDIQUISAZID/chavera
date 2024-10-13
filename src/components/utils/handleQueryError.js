import ToastService from "../../components/Toast/ToastService";
import { checkForQueryError } from './utils';

// for handling response.json(), returns a promise that resolves a boolean where true: has an error; false: no error
const handleQueryError = async (json) => {
    return new Promise((resolve) => {
        let check = checkForQueryError(json);
        // if error handle and return true
        if (check) {
            ToastService.Toast(json.queryResult.errorType || "error", json.queryResult.queryError);
            resolve(true);
        }
        // no error return false
        resolve(false);
    });
}

export { handleQueryError };
