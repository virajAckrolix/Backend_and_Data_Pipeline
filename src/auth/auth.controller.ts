import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService : AuthService){}
    
    @Post('signUp')
    signUp(){
        return 'i signed up'
    }

    @Post('login')
    login(){
        return 'i logged in'
    }
}
