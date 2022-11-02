/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { get } from './https';

const validateSecret = async (secret, setState) => {
    if (secret) {
    const res = await get(`getSecret/${secret}`);
      if (secret === res.data) {
        setState(true);
        return true;
      }
        return false;
    }
  };

const validateAdmin = async (secret, setState) => {
  if (secret) {
    const res = await get(`getUser/${secret}`);
    if (res.data.admin === true) {
      setState(true);
      return true;
    }
    return false;
  }
};

export { validateSecret, validateAdmin };
