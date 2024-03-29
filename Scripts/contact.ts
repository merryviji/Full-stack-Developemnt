"use strict";


export namespace core {

    export class Contact {

        private _fullName: string;
        private _contactNumber: string;
        private _emailAddress: string;
        private _feedback: string;
        private _rating: string;

        constructor(fullName = "", contactNumber = "", emailAddress = "", feedback = "", rating = '') {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
            this._feedback = feedback;
            this._rating = rating;
        }

        public get fullName() {
            return this._fullName;
        }

        public set fullName(value) {
            this._fullName = value;
        }

        public get contactNumber() {
            return this._contactNumber;
        }

        public set contactNumber(value) {
            this._contactNumber = value;
        }

        public get emailAddress() {
            return this._emailAddress;
        }

        public set emailAddress(value) {
            this._emailAddress = value;
        }

        public get feedback() {
            return this._feedback;
        }

        public set feedback(value) {
            this._feedback = value;
        }

        public get rating() {
            return this._rating;
        }

        public set rating(value) {
            this._rating = value;
        }

        public toString() {
            return `FullName: ${this._fullName}\nContact Number: ${this._contactNumber}\n 
            EmailAddress: ${this._emailAddress}\nFeedback: ${this._feedback}\nRating: ${this._rating}`

        }

        /**
         Serialize for writing to localStorage
         */
        public serialize(): string | null {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "" && this._feedback !== "" && this._rating !== "") {
                return `${this._fullName},${this._contactNumber},${this._emailAddress},${this._feedback},${this._rating}`;
            }
            console.error("One or more of the Contact properties is missing or invalid.");
            return null;
        }

        /**
         Deserialize is used to read data from localStorage
         */
        public deserialize(data: string) {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
            this._feedback = propertyArray[3];
            this._rating = propertyArray[4];
        }
    }

    //namespace definition
}