import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  get(path: string): Observable<any> {
    const ref = collection(this.firestore, path);
    return collectionData(ref, { idField: 'id' }) as Observable<any>;
  }

  getById(path: string, id: string): Observable<any> {
    const ref = collection(this.firestore, `${path}/${id}`);
    return collectionData(ref, { idField: 'id' }) as Observable<any>;
  }

  add(path: string, params: object) {
    const ref = collection(this.firestore, path);
    return addDoc(ref, params);
  }

  delete(path: string, id: string) {
    const ref = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(ref);
  }

  update(path: string, id: string, params: object) {
    const ref = doc(this.firestore, `${path}/${id}`);
    return updateDoc(ref, params);
  }
}
