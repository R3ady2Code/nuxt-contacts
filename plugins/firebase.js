import 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAhORnOZyWUkMvKXSZpbP27YneRTr_C4f4',
  authDomain: 'contacts-e1491.firebaseapp.com',
  projectId: 'contacts-e1491',
  storageBucket: 'contacts-e1491.appspot.com',
  messagingSenderId: '119542997896',
  appId: '1:119542997896:web:24195bfc29b841c506903d',
}

export const db = initializeApp(firebaseConfig)

export const fireDB = getFirestore(db)
export const storage = getStorage(db)
