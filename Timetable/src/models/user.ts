import { ApiProvider } from "../providers/api/api";
import { HTTP } from "@ionic-native/http";

export class UserModel {

    private firstName: string;
    private lastName: string;
    private fullName: string;
    private email: string;
    private imageUrl: string;
    private id: Number;
    private idToken: string;
    private expiryDateToken: any;

    constructor(res){
        this.firstName = res['givenName'];
        this.lastName = res['familyName'];
        this.fullName = res['displayName'];
        this.email = res['email'];
        this.imageUrl = res['imageUrl'];
        this.id = res['userId'];
        this.idToken = res['idToken'];
    }

    getFirstName(): string { return this.firstName; }
    getLastName(): string { return this.lastName; }
    getFullName(): string { return this.fullName; }
    getEmail(): string { return this.email; }
    getImageUrl(): string { return this.imageUrl; }
    getId(): Number { return this.id; }
    getIdToken(): string { return this.idToken; }
    getExpiryDateToken(): Number { return this.expiryDateToken; }

}

