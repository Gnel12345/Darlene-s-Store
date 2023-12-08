import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: 'http://localhost:5001/grandkidsgalor-store/us-central1/api'
    // "http://localhost:4000/us-central1/api",
});

export default instance;