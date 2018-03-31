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

    private api: ApiProvider;

    constructor(res, callback){


        this.firstName = res['givenName'];
        this.lastName = res['familyName'];
        this.fullName = res['displayName'];
        this.email = res['email'];
        this.imageUrl = res['imageUrl'];
        this.id = res['userId'];
        this.idToken = res['idToken'];

        let api = new ApiProvider(new HTTP());
        api.getExpDateToken(res['idToken'])
        .then((value) => {
            this.expiryDateToken = value
            console.log(value);
            console.log("Actual date:", JSON.stringify(this.expiryDateToken))
            callback(this);
        });
    }


    serialize() { 
        return [
            this.firstName,
            this.lastName,
            this.fullName,
            this.email,
            this.imageUrl,
            this.id,
            this.idToken,
            this.expiryDateToken
        ]  
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

