import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../Services/category-service";
import JoditEditor from 'jodit-react';
import { createPost as doCreatePost,uploadImage } from "../Services/post-service";
import {getCurrentUserDetail} from "../auth/index";
import { toast } from "react-toastify";
const AddPost = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
     
  const[image,setImage]=useState({
    title:'',
    content:'',
    categoryId:''
  })


  const [post,setPost]=useState({
    title:'',
    content:'',
    categoryId:''
    
  })
  
  const editor=    useRef(null);
    
    //  const config =
		// {
			
		// 	placeholder:"Start typings..."
		// }
		
	// handling file change event
  const handleFileChange=(event)=>{
      console.log(event.target.files)
        setImage(event.target.files[0])
    }


    
  useEffect(() => {
    setUser(getCurrentUserDetail())
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data.sort((a, b) => {
            let fa = a.categoryTitle.toLowerCase(),
                fb = b.categoryTitle.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged=(event, property)=>{
    setPost({ ...post, [property]: event.target.value });
    
  }

  const contentfieldChanged=(event)=>{
    setPost({ ...post, 'content': event});
    
  }

  const createPost=(event)=>{
   
    event.preventDefault();
    console.log("form submitted")
    console.log(post)
   if (post.title.trim()==''){
    toast.error("post title is required !!")
    return;
   }
   if (post.content.trim()==''){
    toast.error("post content is required !!")
    return;
   }
   if (post.categoryId.trim()==''){
    toast.error("select some category")
    return;
   }

post['userId']=user.id
   //submit the form on server
   doCreatePost(post).then(data=>{
   
    uploadImage(image,data.postId).then(data=>{
      toast.success("image Uploaded")
    }).catch(error=>{
      toast.error("error in uploading image")
       console.log(error)
    })


  toast.success  ("post created")
  setPost({
    title:'',
    content:'',
    categoryId:''
    
  })
    // console.log(data)
  }).catch(error=>{
    toast.error("post not created due to some error")
    console.log(error)
  })

  }


  

  
  return (
    <div className="wrapper ">
      <Card className="shadow-sm my-2">
        <CardBody>
          <h3>What Going in your Mind ?</h3>
         
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter Here"
                className="rounded-0"
                name="title"
                 onChange={(e)=> fieldChanged(e,'title')}
             />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input 
                 type="textarea"
                 id="content"
                 placeholder="Enter Here"
                 className="rounded-0"
                 style={{ height: "300px" }}
              
              /> */}

              <JoditEditor
              ref={editor}
              value={post.content}
              onChange={newContent=>contentfieldChanged(newContent)}
            
              />
            </div>

            {/* file field */}
           <div className="mt-3">
            <Label for="image">Select post Banner</Label>
            <Input type="file" id="image" multiple onChange={handleFileChange}/>
           </div>

            <div className="my-3">
              <Label for="category">Post category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter Here"
                className="rounded-0"
                name="categoryId"
                defaultValue={0}
                 onChange={(e)=> fieldChanged(e,'categoryId')}
              >
                <option disabled value={0}>--Select Category--</option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button  color="primary" className="rounded-0 " >
                Create Post
              </Button>
              <Button color="danger" className="rounded-0 ms-2">
                Reset Content
              </Button>
            </Container>
          </Form>
          
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
