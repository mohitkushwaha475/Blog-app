import React, { useEffect, useState } from 'react'
import Base from '../../components/Base';
import AddPost from '../../components/AddPost';
import { Container } from 'reactstrap';
import { getCurrentUserDetail } from '../../auth';
import { loadPostUserWise,deletePostService } from '../../Services/post-service';
import { toast } from 'react-toastify';
import {Post}  from '../../components/Post';
const Userdashboard=()=> {
 
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({
    content:[],
    totalPages:'',
    totalElement:'',
    pageSize:'',
    lastPages:false,
    pageNumber:''
   });
   
  
  useEffect(()=>{
    console.log(getCurrentUserDetail())
    setUser(getCurrentUserDetail()) 
    loadPostData()
    
 
  },[])

  function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id).then(data => {
      console.log(data)
      setPosts(data)
    })
      .catch(error => {
        console.log(error)
        toast.error("error in loading user posts")
      })
  }

    //function to delete post 
   function deletePost(post){
    console.log(post)
    // going to delete post
    deletePostService(post.postId).then((res)=>{
      console.log(res)
      toast.success("post is deleted")
      let newPosts= posts.content.filter(p=>p.postId!=post.postId)
      setPosts({...newPosts,content:newPosts})
    }).catch((error)=>{
      console.log(error)
      toast.error("Error in deleting post")
    })
   }
 
  return (
    <Base>
    <Container className='my-5'>
      
    <AddPost/>
        
        <h1 className='my-3'>Posts Count : ({posts.totalElement})</h1>
       
          {
          posts.content.map((post, index) => {
            
           
            return (
              <Post post={post}  deletePost={deletePost}  key={index} />
            )
          })
        }
        
        
        </Container>
    </Base>
  )
}

export default  Userdashboard;