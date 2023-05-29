import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { catchError, finalize, map, Observable } from 'rxjs';

import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore, private loaderService: LoaderService) {}

  get(path: string): Observable<any> {
    this.loaderService.show();
    const ref = collection(this.firestore, path);
    return (collectionData(ref, { idField: 'id' }) as Observable<any>).pipe(
      catchError((error) => {
        this.loaderService.hide();
        console.error(error);
        return error;
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

  getById(path: string, id: string): Observable<any> {
    this.loaderService.show();

    const ref = doc(this.firestore, `${path}/${id}`);
    return docSnapshots(ref).pipe(
      map((doc) => {
        this.loaderService.hide();
        return doc.data();
      }),
      catchError((error) => {
        this.loaderService.hide();
        console.error(error);
        return error;
      })
    );
  }

  async set(path: string, params: object, id?: string) {
    this.loaderService.show();
    try {
      const ref = doc(this.firestore, `${path}/${id}`);
      await setDoc(ref, params, { merge: true });
    } catch (error) {
      console.error(error);
    }
    this.loaderService.hide();
  }

  async delete(path: string, id: string) {
    this.loaderService.show();
    try {
      const ref = doc(this.firestore, `${path}/${id}`);
      await deleteDoc(ref);
    } catch (error) {
      console.error(error);
    }
    this.loaderService.hide();
  }

  // async update(path: string, id: string, params: object) {
  //   this.loaderService.show();
  //   try {
  //     const ref = doc(this.firestore, `${path}/${id}`);
  //     await updateDoc(ref, params);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   this.loaderService.hide();
  // }
}
