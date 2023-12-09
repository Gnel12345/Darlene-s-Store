import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: 'http://localhost:5001/grandkidsgalor-store/us-central1/api/'
    // "http://localhost:4000/us-central1/api",
  

});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
instance.defaults.headers.common['Access-Control-Allow-Credentials'] = true;


export default instance;