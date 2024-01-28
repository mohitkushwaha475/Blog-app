
import { toast } from "react-toastify";
// isLoggedIn=>

export const isLoggedIn=()=>{


  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
}   
// dologin => data => set to localstorage

export const doLogin=(data,next)=>{
  localStorage.setItem("data",JSON.stringify(data))  
    next()
}
// dologout=> date => set to logout

export const doLogout=(data)=>{
    localStorage.removeItem("data")
    toast.success("user Logged out Successfully")
  }


// getCurrent user

export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
      return JSON.parse (localStorage.getItem("data"))?.user;
    }else{
        return undefined;
    }
}

export const getToken=()=>{
if(isLoggedIn){
  return JSON.parse (localStorage.getItem("data"))?.token;
}else{
  return null;
}
}
