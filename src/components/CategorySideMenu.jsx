import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from "../Services/category-service";
import { Link } from 'react-router-dom';
function CategorySideMenu() {
   
    const[categories,setCategories]=useState()
    useEffect(() => {
   
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


  return (
    <div>
       
       <ListGroup>
          <ListGroupItem tag={Link} to="/" action="true" className='border-0'>
             All Blogs
          </ListGroupItem>
             {categories?.map((cat,index) => (
                   <ListGroupItem tag={Link} to={"/categories/"+cat.categoryId} action="true" className='border-0 shadow-0 mt-1' key={index}>
                   {cat.categoryTitle}
                </ListGroupItem>
                ))}
       </ListGroup>
    </div>
  )
}

export default CategorySideMenu