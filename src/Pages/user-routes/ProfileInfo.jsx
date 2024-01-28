import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base';
import userContext from '../../context/userContext'
import { Card,CardBody, Col, Container, Row,Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getUser } from '../../Services/user-service';

const ProfileInfo=()=> {
  const object=useContext(userContext)

 
  const[user,setUser]=useState(null)
  const {userId}=useParams()

  useEffect(()=>{
      getUser(userId).then(data=>{
        console.log(data)
        setUser({...data})
      })
  },[])
  const userView=()=>{
    return (
      <Row>
        <Col md={{size:8,offset:2}}>
     
           <Card  className='mt-2 border-0 rounded-0'>
            <CardBody>
              <h3 className='text-uppercase'> User Information</h3>
              <Container className='text-center'>
                 <img style={{maxWidth:'250px',maxHeight:'250px'}}src="https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=center" alt=""  className='image-fluid rounded-circle'/>
                 </Container>
                 <Table responsive striped className='text-center mt-5' hover bordered={true} >
                  <tbody>
                    <tr>
                      <td>
                        BLOG ID
                      </td>
                      <td>
                      {
                         user.id
                         }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        User Name
                      </td>
                      <td>
                      {
                         user.name
                         }
                      </td>
                    </tr>
                    <tr>
                      <td>
                        User Email
                      </td>
                      <td>
                    {
                      user.email
                    }
                      </td>
                      </tr>
                      <tr>
                      <td>
                        About
                      </td>
                      <td>
                      {
                      user.about
                    }
                    
                      </td>
                    </tr>
                    <tr>
                      <td>
                        ROLE
                      </td>
                      <td>
                      {user.roles.map((role)=>{
                        return(
                          <div key={role.id}>{role.name}</div>
                        )

                      })}
                      </td>
                    </tr>

                  </tbody>
                 </Table>
            </CardBody>
           </Card>

        </Col>
      </Row>
    )
  }

  return (
    <Base>
    <div className='mt-5'>
 
    { user? userView():'Loading user Data ..'}
    </div>
    </Base>
  )
}

export default ProfileInfo;
