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

import { AlertComponent } from '@shared/components';

import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: Firestore,
    private alertComponent: AlertComponent,
    private languageService: LanguageService
  ) {}

  public async checkDocExists(path: string) {
    return (await getDoc(doc(this.firestore, path))).exists();
  }

  getById(path: string, id: string): Observable<any> {
    const ref = doc(this.firestore, `${path}/${id}`);
    return docSnapshots(ref).pipe(
      map((doc) => {
        return doc.data();
      }),
      catchError((error) => {
        console.error(error);
        this.handleError(error);
        return error;
      })
    );
  }

  async setDoc(path: string, params: object) {
    try {
      const ref = doc(this.firestore, path);
      if (await this.checkDocExists(path)) {
        await setDoc(ref, { ...params, lastUpdated: serverTimestamp() }, { merge: true });
      } else {
        await setDoc(ref, { ...params, createdDate: serverTimestamp() });
      }
    } catch (error) {
      console.error(error);
      this.handleError(error);
      return;
    }
  }

  async updateDocArrayUnion(path: string, field: string, params: object) {
    try {
      const ref = doc(this.firestore, path);
      await updateDoc(ref, field, arrayUnion(params));
    } catch (error) {
      console.error(error);
      this.handleError(error);
      return;
    }
  }

  async delete(path: string, id: string) {
    try {
      const ref = doc(this.firestore, `${path}/${id}`);
      await deleteDoc(ref);
    } catch (error) {
      console.error(error);
      this.handleError(error);
      return;
    }
  }

  private async handleError(error: unknown) {
    this.alertComponent.presentAlert({
      buttons: [
        {
          role: 'cancel',
          text: 'Ok',
        },
      ],
      header: this.languageService.translate('error'),
      message: JSON.stringify(error),
    });
  }
}
