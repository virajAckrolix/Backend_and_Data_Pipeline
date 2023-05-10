import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    login(){
        return {
            message : 'logged in',
            status : 'success'
        }
    }
    signUp(){
        return {
            message : 'signedup',
            status : 'success'
        }
    }
}