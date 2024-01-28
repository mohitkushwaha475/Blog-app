import React, { useEffect, useState } from 'react'
import Base from '../components/Base';
import { Link, useParams } from 'react-router-dom';
import {Input,Card, CardBody, CardText, Col, Container, Row, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { BASE_URL } from '../Services/helper';
import { createComment, loadPost } from '../Services/post-service';
import { isLoggedIn } from '../auth';
const PostPage=()=> {
    const {postId}= useParams()
   const[post,setPost]=useState(null)
   const[comment,setComment]=useState({
    content:''
   })
  
   useEffect(()=>{
//   load post of PostId

loadPost(postId).then((data)=>{
console.log(data)
setPost(data)
}).catch(err=>{
    console.log(err)
    toast.error("error in loading post")
})
  },[])

  const submitPost=()=>{
    if(!isLoggedIn()){
        toast.error("Need to login first !!")
        return
}

    if (comment.content==''){
        toast.error("please Enter  some comment")
        return
    }
    createComment(comment,post.postId).then(data=>{
        console.log(data)
        toast.success("comment added")
        setPost({
            ...post,
            comments:[...post.comments,data.data]
        })
        setComment({
            content:''
        })
    }).catch(error=>{
        console.log(error)
    })
  }
// const printDate=(numbers)=>{
//     return new Date(numbers).toString()
// }

    return (
    <Base>
    <Container className='mt-4'>
        <Link to="/">Home</Link> /{post && (<Link to="">{post.title}</Link>)}
   
    <Row>
        <Col md={{
            size:12
        }}>
            <Card className='mt-3 ps-2 border-0 shadow'>
                <CardBody>
                    <CardText>posted By <b>{post?.user.name}</b> on  <b>{new Date(post?.addedDate).toLocaleDateString()}</b></CardText> 
                    <CardText >
                         <span className='text-muted'>{post?.category.categoryTitle}</span>
                    </CardText>

                    <div className="divider" style={{
                        width:'100%',
                        height:'1px',
                        background:'#e2e2e2'
                    }}>

                    </div>
                    
                    <CardText><h3>{post?.title} </h3></CardText> 
                    <CardText>
                    <div className="image-container  mt-3 shadow"  style={{width:'50%'}} >
                        <img className='img-fluid'  src={BASE_URL+'/post/image/'+post?.imageName} alt="" />
                    </div>
                    </CardText>
                    <CardText className='mt-5' dangerouslySetInnerHTML={{__html:post?.content}}>
                         
                    </CardText>
                </CardBody>
            </Card>
        </Col>
    </Row>
    <Row className='my-4'>
        <Col >
     <h3>Comments ({post ?post.comments.length:''})</h3>
     {
        post?.comments && post?.comments.map((c,index)=>(
           <Card className='mt-2' key={index}>
            <CardBody>
                <CardText>
                  {c?.content}
                </CardText>
            </CardBody>
           </Card>
           
           
        ))
     }

   <Card  className='mt-2' >
            <CardBody>
                <Input type="textarea" placeholder="Enter here"
                 value={comment.content}
               onChange={(event)=>setComment({content:event.target.value})}
                ></Input>
                 <Button onClick={submitPost}
                 color="primary" className='mt-2 border-0'>submit</Button>
            </CardBody>
           </Card>

        </Col>
    </Row>
    </Container>
    </Base>
  )
}
export default PostPage;