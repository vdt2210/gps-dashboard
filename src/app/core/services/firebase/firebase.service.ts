import { Injectable } from '@angular/core';
import {
  arrayUnion,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { catchError, map, Observable } from 'rxjs';

import { LoaderService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: Firestore,
    private loaderService: LoaderService
  ) {}

  public async checkDocExists(path: string) {
    return (await getDoc(doc(this.firestore, path))).exists();
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

  async setDoc(path: string, params: object) {
    this.loaderService.show();

    try {
      const ref = doc(this.firestore, path);
      if (await this.checkDocExists(path)) {
        await setDoc(ref, { ...params, lastUpdated: serverTimestamp() }, { merge: true });
      } else {
        await setDoc(ref, { ...params, createdDate: serverTimestamp() });
      }
    } catch (error) {
      console.error(error);
      this.loaderService.hide();
      return;
    }

    this.loaderService.hide();
  }

  async updateDocArrayUnion(path: string, field: string, params: object) {
    this.loaderService.show();

    try {
      const ref = doc(this.firestore, path);
      await updateDoc(ref, field, arrayUnion(params));
    } catch (error) {
      console.error(error);
      this.loaderService.hide();
      return;
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
      this.loaderService.hide();
      return;
    }
    this.loaderService.hide();
  }
}
