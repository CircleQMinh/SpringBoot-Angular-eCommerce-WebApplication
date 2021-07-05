import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from 'src/app/class/user';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username!: string;
  password!: string;
  name!: string
  phone!: string
  email!: string
  agree!: boolean
  verifycode!:string

  usernameError:boolean=false;
  passwordError:boolean=false;
  nameError:boolean=false;
  phoneError:boolean=false;
  emailError:boolean=false;
  agreeError:boolean=false;
  verifyError:boolean=false;

  inputError:boolean=false;
  regexp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

  verifyMode:boolean=false
  isLoading:boolean=false
  registerComplete=false
  verifyInfo:any

  userRegister:User=new User
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async tryRegister() {

    await this.validateInput()
    if(this.inputError){
      console.log("error in input!")
    }
    else{
      this.userRegister.username=this.username
      this.userRegister.password=this.password
      this.userRegister.name=this.name
      this.userRegister.email=this.email
      this.userRegister.phone=this.phone 
      this.userRegister.role="customer"

      this.isLoading=true;
      this.verifyInfo= await this.loginService.sendEmailVerify(this.email).toPromise()
      // console.log("send email roi")
      // console.log(verifyInfo.code)
      this.verifyMode=true;
      this.isLoading=false
    }
  }

  async validateInput(){

    this.usernameError=false;
    this.passwordError=false;
    this.nameError=false;
    this.phoneError=false;
    this.emailError=false;
    this.agreeError=false;

    this.inputError=false;

    if(this.username==undefined){
      this.usernameError=true
    }
    else{
      const response = await this.loginService.checkIfUsernameExist(this.username).toPromise();
      this.usernameError=response.success
    }
    

    if(this.password==undefined){
      this.passwordError=true;
    }
    else if(this.password.length<8){
      this.passwordError=true;
    }

    if(this.name==undefined){
      this.nameError=true;
    }

    if(this.email==undefined){
      this.emailError=true;
    }
    else{
      if(!this.regexp.test(this.email)){
        this.emailError=true
      }

      const response = await this.loginService.checkIfEmailExist(this.email).toPromise();
      this.emailError=response.success
    }

    if(this.phone==undefined){
      this.phoneError=true;
    }
    else if(this.phone.length<9){
      this.phoneError=true;
    }

    if(this.agree==undefined){
      this.agreeError=true;
    }
    else if(this.agree==false){
      this.agreeError=true;
    }

    let errorList:boolean[]=[];
    errorList.push(this.usernameError)
    errorList.push(this.passwordError)
    errorList.push(this.nameError)
    errorList.push(this.emailError)
    errorList.push(this.phoneError)
    errorList.push(this.agreeError)
    for(let i=0;i<errorList.length;i++){
      if(errorList[i]){
        this.inputError=true;
        break;
      }
    }
   // console.log(errorList)

  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  checkValidateCode(){
    this.verifyError=false
    if(this.verifycode==this.verifyInfo.code){
      this.registerUser()
    }
    else{
      this.verifyError=true;
    }


  }

  registerUser(){
    this.loginService.createUser(this.userRegister).subscribe(
      data =>{
        this.isLoading=true
        console.log(data)
        this.isLoading=false
        this.registerComplete=true
        
      },
      error =>{
        console.log(error)
      }
      
    )
  }

}
