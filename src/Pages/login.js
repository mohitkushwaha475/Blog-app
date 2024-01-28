import { Card, CardHeader,CardBody, Container,FormGroup,Form ,Label,Input,Button, Row, Col} from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../Services/user-service";

import { doLogin } from "../auth/index";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
const Login=()=>{

    const userContextData=useContext(userContext)

    const navigate=useNavigate()

   const[loginDetail,setLoginDetail]= useState({
        username:'',
        password:''
    })

    const handleChange=(event,field)=>{
       
        let actualValue=event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    };

    const handleReset=()=>{
        setLoginDetail({
            username:'',
            password:''
        })
         
    }

    const handleFormSubmit=(event)=>{
   event.preventDefault();
 console.log(loginDetail);
 if (loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
    toast.error("Username or Password is required")
    return;
 }

 //submit the data to server to generate token

 loginUser(loginDetail).then((data)=>{
    
    console.log(data)

//save the data to localstorage

doLogin(data,()=>{
console.log("login detail is saved to local storage")
userContextData.setUser({
    data:data.user,
    login:true
})
navigate("/user/dashboard")
})


    toast.success("Login Success")
 }).catch(error=>{
    console.log(error)
    if (error.response.status==400 ||error.response.status==404){
        toast.error(error.response.data.message)
    }else{
    toast.error("something went wrong !!")
    }
 })

    }

    return (
        <Base>
        <Container  >
        <Row className="mt-4">
            <Col sm={{size:6,offset:3}} >
            <Card color="dark" inverse> 
            <CardHeader>
                <h3 className="mt-4" >Login  Here !!</h3>
            </CardHeader>
            <CardBody>
                {/* creating form */}
                <Form onSubmit={handleFormSubmit}>
                 
                    {/* email Field */}
                   <FormGroup>
                      <Label for="email">Enter Email</Label>
                       <Input
                       type="email"
                       placeholder="Enter here"
                       id="email"
                       value={loginDetail.username}
                       onChange={(e)=>handleChange(e,'username')}
                       />
                   </FormGroup>
                    {/* email Field */}
                   <FormGroup>
                      <Label for="password">Enter password</Label>
                       <Input
                       type="password"
                       placeholder="Enter here"
                       id="password"
                       value={loginDetail.password}
                       onChange={(e)=>handleChange(e,'password')}
                       />
                   </FormGroup>
                   
                   
                   <Container className="text-center">
                       
                       <Button color="light" outline > Login</Button>
                       <Button color="secondary" type="reset"  onClick={handleReset} className="ms-2" outline> Reset</Button>

                   </Container>

                </Form>

            </CardBody>
        </Card>
            </Col>
        </Row>
       </Container>
        </Base>
        
    )
}

export default Login;