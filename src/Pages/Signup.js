import { Card, CardHeader,CardBody, Container,FormGroup,Form ,Label,Input,Button, Row, Col, FormFeedback} from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../Services/user-service";
import { toast } from 'react-toastify';
const Signup=()=>{

   

 const [data,setData] = useState({

     name:'',
     email:'',
     password:'',
     about:''

    })
   
    const [error,setError] = useState({
        errors:{},
        isError:false
    })
   
//     useEffect(()=>{
//    console.log(data);
//     },[data])
    // handle change


    const handleChange = (event, property) => {
        //dynamic setting the values
        setData({ ...data, [property]: event.target.value });
      };

      //reseting the form
      const resetData = () => {
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      };


      //submit form

      const submitForm = (event) => {
        event.preventDefault();
        console.log(data);

        // if (error.isError){
        //     toast.error("form data is invalid , correct all detail then submit !!")
        //     setError({
        //         ...error,
        //         isError:false
        //     })
        //     return;
        // }
        //validate data
        
        //  sending to server
        signUp(data).then((resp)=>{
        console.log(resp)
        console.log("suceess log")
        toast.success("user is registered successfully !! user id "+resp.id);
        setData({
            name: "",
            email: "",
            password: "",
            about: "",
          });
          setError({ ...error, isError: false, errors: "" });
        }).catch((error)=>{
            console.log(error);
            console.log("error log")

            //handle the error in prop log
            setError({
                errors:error,
                isError:true
            })
        })
         }
    return (
        <Base>
       <Container>
        <Row className="mt-4">
            <Col sm={{size:6,offset:3}} >
            <Card color="dark" inverse> 
            <CardHeader>
                <h3>Fill Information to  Register !!</h3>
            </CardHeader>
            <CardBody>
                {/* creating form */}
                <Form onSubmit={submitForm}>
                    {/* Input Field */}
                   <FormGroup>
                      <Label for="name">Enter Name</Label>
                       <Input
                       type="text"
                       placeholder="Enter here"
                       id="name"
                       onChange={(e)=> handleChange(e,'name')}
                       value={data.name}
                       invalid={error.errors?.response?.data?.name?true:false}
                       />

                <FormFeedback>
                  { error.errors?.response?.data?.name}
                   </FormFeedback>
                   </FormGroup>
                 

                    {/* email Field */}
                   <FormGroup>
                      <Label for="email">Enter Email</Label>
                       <Input
                       type="email"
                       placeholder="Enter here"
                       id="email"
                       onChange={(e)=> handleChange(e,'email')}
                       invalid={error.errors?.response?.data?.email?true:false}
                       />

                <FormFeedback>
                  { error.errors?.response?.data?.email}
                   </FormFeedback>
                   </FormGroup>
                    {/* password Field */}
                   <FormGroup>
                      <Label for="password">Enter password</Label>
                       <Input
                       type="password"
                       placeholder="Enter here"
                       id="password"
                       onChange={(e)=> handleChange(e,'password')}
                       value={data.password}
                       invalid={error.errors?.response?.data?.password?true:false}
                       />

                <FormFeedback>
                  { error.errors?.response?.data?.password}
                   </FormFeedback>
                   </FormGroup>
                    {/* About Field */}
                   <FormGroup>
                      <Label for="about">Enter Description</Label>
                       <Input
                       type="textarea"
                       placeholder="Enter here"
                       id="about"
                       style={{height:"250"}}
                       onChange={(e)=> handleChange(e,'about')}
                       value={data.about}
                       invalid={error.errors?.response?.data?.about?true:false}
                       />

                <FormFeedback>
                  { error.errors?.response?.data?.about}
                   </FormFeedback>
                   </FormGroup>
                   
                   <Container className="text-center">
                       
                       <Button color="light" outline> Register</Button>
                       <Button onClick={resetData} color="secondary"  type="reset"className="ms-2" outline> Reset</Button>

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

export default Signup;