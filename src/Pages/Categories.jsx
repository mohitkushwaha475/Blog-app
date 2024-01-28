import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Row, Col, Container } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { deletePostService, loadPostCategoryWise } from '../Services/post-service';
import { toast } from 'react-toastify';
import {Post} from '../components/Post'
function Categories() {
    
 const[posts,setPosts]=useState()

   const {categoryId}= useParams()
   useEffect(()=>{
    console.log(categoryId)
    loadPostCategoryWise(categoryId).then(data=>{
       setPosts([...data])
       console.log(posts)
    })
    .catch(error=>{
      console.log(error)
      toast.error("error in loading posts")
    })
   },[categoryId])
   function deletePost(post){
    console.log(post)
    // going to delete post
    deletePostService(post.postId).then((res)=>{
      console.log(res)
      toast.success("post is deleted")
   let newPosts= posts.filter(p=>p.postId!=post.postId)
   setPosts([...newPosts])
  }).catch((error)=>{
      console.log(error)
      toast.error("Error in deleting post")
    })
   }
   
   return (
   <Base>
   <Container className="pt-3 mt-5">
      <Row>
        <Col md={2} className="border mt-1">
          <CategorySideMenu></CategorySideMenu>
        </Col>
        <Col md={10}>
          <h1>Blogs Count ({posts?.length})</h1>
         {
          posts && posts.map((post,index)=>{
         return(
          
          <Post key={index} deletePost={deletePost} post={post}/>
         )

         })}

         {posts?.length<=0?<h1>No Post in this Category</h1>:''}
        </Col>
      </Row>
      </Container>
   </Base>


  )
}

export default Categories