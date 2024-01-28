import React, { useContext, useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { toast } from 'react-toastify'
import { loadPost, updatePostService } from '../Services/post-service'
import { loadAllCategories } from '../Services/category-service'
import JoditEditor from 'jodit-react';

import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";

function UpdateBlog() {
  const [categories, setCategories] = useState([]);
  const {blogId}=useParams()
const object= useContext(userContext)
 const navigate=useNavigate()
const[post,setPost]=useState(null)
const editor=    useRef(null);

useEffect(()=>{
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
      // load the blog
  loadPost(blogId).then(data=>{
    setPost({...data,categoryId:data.category.categoryId})
  })
  .catch(error=>{
    console.log(error)
    toast.error("error in loading the blog")
  })
},[])

useEffect(()=>{
  
 if(post){
  if (post.user.id != object.user.data.id){
 
    toast.error("this is not your post")
     navigate("/")
  }
 }
},[post])

const handleChange=(event,fieldName)=>{

  setPost({ ...post, [fieldName]: event.target.value });
}

const updatePost=(event)=>{
  event.preventDefault(  )
  console.log(post)
  updatePostService({...post,category:{categoryId:post.categoryId}},post.postId)
  .then(resp=>{
    console.log(resp)
    toast.success('post updated')
  })
  .catch(error=>{
    console.log(error)
    toast.error("error in updating post")
  })
}

const updateHtml=(event)=>{
return(
 
  <div className="wrapper ">
  {
    console.log(object.user.data.id)
    
  }
  {console.log(post.user.id)}
  <Card className="shadow-sm my-2">
    <CardBody>
      <h3>Update post from here !!</h3>
     
      <Form onSubmit={updatePost}>
        <div className="my-3">
          <Label for="title">Post Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter Here"
            className="rounded-0"
            name="title"
            value={post.title}
            onChange={(e)=> handleChange(e,'title')}
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
         onChange={newContent=> setPost({ ...post, content: newContent })}
        
          />
        </div>

        {/* file field */}
       <div className="mt-3">
        <Label for="image">Select post Banner</Label>
        <Input type="file" id="image" multiple onChange={''}/>
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
            value={post.categoryId}
            onChange={(e)=> handleChange(e,'categoryId')}
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
            Update Post
          </Button>
          <Button color="danger" className="rounded-0 ms-2">
            Reset Content
          </Button>
        </Container>
      </Form>
      
    </CardBody>
  </Card>
</div>
)
}

 return (
    <Base>
   
   <Container className='mt-5'>
   {
  post && updateHtml()
   }
   </Container>
  
   
    </Base>
  )
}

export default UpdateBlog