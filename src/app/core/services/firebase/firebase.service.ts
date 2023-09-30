import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, finalize, from, map, Observable, switchMap, tap } from 'rxjs';

import { LoaderService, authService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: Firestore,
    private loaderService: LoaderService,
    private authService: authService
  ) {}

  public async checkDocExists(path: string) {
    return (await getDoc(doc(this.firestore, path))).exists();
  }

  async checkDocExistsById(path: string, uid: string, id: string) {
    const ref = collection(this.firestore, path);
    const q = query(
      ref,
      where('uid', '==', uid),
      where('id', '==', id),
      where('isActivated', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  public async checkFieldExisted(doc: any, fieldName: string) {
    return (await getDoc(doc)).get(fieldName) ? true : false;
  }

  async get(path: string): Promise<Observable<any>> {
    this.loaderService.show();
    const ref = query(
      collection(this.firestore, path),
      where('uid', '==', await this.authService.userId) || where('isActivated', '==', true)
    );

    return (collectionData(ref) as Observable<any>).pipe(
      tap(() => this.loaderService.hide()),
      catchError((error) => {
        this.loaderService.hide();
        console.error(error);
        return error;
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

  getWhereId(path: string, id: string): Observable<any> {
    this.loaderService.show();
    const ref = collection(this.firestore, path);
    return from(this.authService.userId).pipe(
      switchMap((uid) => {
        const q = query(
          ref,
          where('uid', '==', uid),
          where('id', '==', id),
          where('isActivated', '==', true)
        );
        return collectionData(q);
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  // async addOrUpdateDoc(path: string, params: object, id: string) {
  //   this.loaderService.show();
  //   try {
  //     await this.checkDocExistsById(path, await this.authService.userId, id).then(async (res) => {
  //       if (res) {
  //         const ref = collection(this.firestore, path);
  //         const q = query(
  //           ref,
  //           where('uid', '==', await this.authService.userId),
  //           where('id', '==', id)
  //         );
  //         this.setDoc(`${path}/${(await getDocs(q)).docs[0].id}`, params);
  //       } else {
  //         this.addDoc(path, params);
  //       }
  //     });
  //   } catch (error) {
  //     this.loaderService.hide();
  //     console.error(error);
  //     throw error;
  //   }
  //   this.loaderService.hide();
  // }

  async addDoc(path: string, params: object) {
    this.loaderService.show();
    try {
      const ref = collection(this.firestore, path);
      await addDoc(ref, { ...params, createdDate: serverTimestamp() });
    } catch (error) {
      console.error(error);
      this.loaderService.hide();
      return;
    }
    this.loaderService.hide();
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

  // async setField(path: string, fieldName: string, params: object) {
  //   this.loaderService.show();
  //   try {
  //     const ref = doc(this.firestore, path);
  //     if (await this.checkFieldExisted(ref, fieldName)) {
  //       await setDoc(
  //         ref,
  //         { [fieldName]: { ...params, lastUpdated: serverTimestamp() } },
  //         { merge: true }
  //       );
  //     } else {
  //       await setDoc(
  //         ref,
  //         { [fieldName]: { ...params, createdDate: serverTimestamp() } },
  //         { merge: true }
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   this.loaderService.hide();
  // }

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
