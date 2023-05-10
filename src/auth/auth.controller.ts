import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService : AuthService){}
    
    @Post('signUp')
    signUp(){
        return this.authService.signUp()
    }

    @Post('login')
    login(){
        return this.authService.login()
    }
}
