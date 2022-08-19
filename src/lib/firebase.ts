import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // databaseURL: import.meta.env.VITE_DATABASE_URL,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,

  apiKey: 'AIzaSyDsHjQevuN8cDuSE1yODxB5dQeYDE231yA',
  authDomain: 'autodoc-91079.firebaseapp.com',
  databaseURL: 'https://autodoc-91079-default-rtdb.firebaseio.com',
  projectId: 'autodoc-91079',
  storageBucket: 'autodoc-91079.appspot.com',
  messagingSenderId: '1020658188525',
  appId: '1:1020658188525:web:df1f210a26f494ce120ce4',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const storage = getFirestore(app)

export { db, storage }
