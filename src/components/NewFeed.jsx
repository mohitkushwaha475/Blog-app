import React, { useEffect ,useState} from 'react'
import { deletePostService, loadAllPost } from '../Services/post-service'
import {Row,Col,Pagination,PaginationItem,PaginationLink, Container}  from 'reactstrap';
import { Post } from './Post';
import { toast } from "react-toastify";
export const  NewFeed =()=> {
 
 const [postContent,setPostContent]=useState({
  content:[],
  totalPages:'',
  totalElement:'',
  pageSize:'',
  lastPages:false,
  pageNumber:''
 });
 
useEffect(()=>{
loadAllPost(0,5).then((data)=>{
    console.log(data)
    setPostContent(data)
    
}).catch((error)=>{
    console.log(error)
    toast.error("error in loading post")
});
  }, [])


  function deletePost(post){
    console.log(post)
    // going to delete post
    deletePostService(post.postId).then((res)=>{
      console.log(res)
      toast.success("post is deleted")
   let newPostContent=   postContent.content.filter(p=>p.postId!=post.postId)
    setPostContent({...postContent,content:newPostContent})
  }).catch((error)=>{
      console.log(error)
      toast.error("Error in deleting post")
    })
   }


  const changePage=(pageNumber=0,pageSize=5)=>{
    if (pageNumber<postContent.pageNumber && postContent.pageNumber==0){
      return
    }

    loadAllPost(pageNumber,pageSize).then((data)=>{
      console.log(data)
      setPostContent(data)
      window.scroll(0,0)
      
  }).catch((error)=>{
    console.log(error)
    toast.error("error in loading post")
  });
  }
  
 if (postContent !=null)  { 
  return (
    <div className='container-fluid mt-5'>
        
       <Row>
        
        <Col md={
            {
            size:12
           
        }
        } >
      
      <h1>Blogs Count ({postContent.totalElement})</h1>
    
      {
      postContent.content.map((post)=>(
        <Post
        deletePost={deletePost}
        post={post} key={post.postId}/>
      ))}
      <Container className=' mt-3'>
       <Pagination size="lg">
        <PaginationItem  disabled={postContent.pageNumber==0} onClick={() => changePage(postContent.pageNumber-1)} >
          <PaginationLink previous>
              Previous
          </PaginationLink>
          </PaginationItem>
          {[...Array(postContent.totalPages)].map((item,index)=>(
            <PaginationItem onClick={() => changePage(index)} active={index==postContent.pageNumber} key={index}>
            <PaginationLink >
               {index+1}
            </PaginationLink>
            </PaginationItem>
            
          ))}
          
          
          <PaginationItem>
          <PaginationLink onClick={() => changePage(postContent.pageNumber+1)} next disabled={postContent.lastPages==true}>
          Next
         </PaginationLink>
          
          
        </PaginationItem>
       </Pagination>
       </Container>
        </Col>
       </Row>
        </div>
  )}
}
