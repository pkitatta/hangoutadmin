import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from './env.service';
import {AuthService} from './auth.service';
import {FormGroup} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class HangoutService {
    isLoggedIn = false;
    token: any;
    data: any;
    events: any = [];
    today: any;
    currentDate: any;
    cityId: any;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private env: EnvService,
        private auth: AuthService,
    ) {
        this.token = auth.token;
    }

    load(): any {
        const headers = new HttpHeaders({
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'hangouts', {headers});

    }

    // Adding event
    addHangout(formData: FormGroup) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.post(this.env.API_URL + 'hangouts', JSON.stringify(formData.value), {headers});
    }

    getAdmins(hangoutId: any) {
        const headers = new HttpHeaders({
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'hadmins/admins/' + hangoutId, {headers});
    }

    editHangout(formData: FormGroup, hangoutId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.put(this.env.API_URL + 'hangouts/' + hangoutId, JSON.stringify(formData.value), {headers});
    }

    deleteRemote(id: string) {
        // const headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     Authorization: this.token.token_type + ' ' + this.token.access_token
        // });

        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
                }
            )
        };

        return this.http.delete(this.env.API_URL + 'events/' + id, options);
    }

    checkEmail(email: any) {
        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: this.token.token_type + ' ' + this.token.access_token,
                }
            )
        };

        return this.http.post(this.env.API_URL + 'hadmins/checkemail', email, options);
    }

    createAdmin(data: any) {
        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
                }
            )
        };

        return this.http.post(this.env.API_URL + 'hadmins', data, options);
    }

    editAdmin(data: any, id: any) {
        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
                }
            )
        };

        return this.http.put(this.env.API_URL + 'hadmins/' + id, data, options);
    }

    deleteAdmin(id: any) {
        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
                }
            )
        };

        return this.http.delete(this.env.API_URL + 'hadmins/' + id, options);
    }

    editHangoutMessage(data, id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.put(this.env.API_URL + 'hangouts/anyupdate/' + id, data, {headers});
    }

    getHangoutComp(hangoutId: any) {
        console.log('token: ' + this.auth.token.token_type);
        const headers = new HttpHeaders({
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'comps/gettickets/' + hangoutId, {headers});
    }

    getCompTemps() {
        console.log('token: ' + this.auth.token.token_type);
        const headers = new HttpHeaders({
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'comps', {headers});
    }

    createComp(formData: FormGroup) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.post(this.env.API_URL + 'comps', JSON.stringify(formData.value), {headers});
    }

    editComp(formData: FormGroup, compId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.put(this.env.API_URL + 'comps/' + compId, JSON.stringify(formData.value), {headers});
    }

    cancelComp(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.delete(this.env.API_URL + 'comps/' + id, {headers});
    }

    restoreComp(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'comps/undestroy/' + id, {headers});
    }

    getAdminPhotos(hangoutId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'getadminphotos/' + hangoutId, {headers});
    }

    getAUserPhotos(hangoutId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'getuserphotos/' + hangoutId, {headers});
    }

    getVideos(hangoutId: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.get(this.env.API_URL + 'getvideos/' + hangoutId, {headers});
    }

    uploadPhoto(formData: FormData) {
        const headers = new HttpHeaders({
            // 'Content-Type': 'multipart/form-data',
            // Accept: 'application/json',
            Authorization: this.auth.token.token_type + ' ' + this.auth.token.access_token
        });

        return this.http.post(this.env.API_URL + 'media', formData, {headers});
    }
}
