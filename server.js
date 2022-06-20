import Nullstack from 'nullstack';
import Application from './src/Application';
import { initializeApp } from "firebase/app";

const context = Nullstack.start(Application);

context.start = async function start() {
  // https://nullstack.app/pt-br/inicializacao-da-aplicacao
}

export default context;

const firebaseConfig = {
  apiKey: "AIzaSyB_NelUR9Tn_h-haSNX_zdqUFIFUORg6lo",
  authDomain: "my-cv-nullstack.firebaseapp.com",
  projectId: "my-cv-nullstack",
  storageBucket: "my-cv-nullstack.appspot.com",
  messagingSenderId: "490974254834",
  appId: "1:490974254834:web:e4409d3b891477cf6b226b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

context.app = app;