import axios from "axios";
//const axios = require('axios');

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: { key: "AIzaSyAOxYPhEnTJr-qgnlABcswibSGUtFnTvyk" },
  //3nKuYqWQtKQWeg4DHYHNRiPDCcv2
  //https://vue-demos-v2-default-rtdb.firebaseio.com cambiada el 2023-07-22
});

export default authApi;
