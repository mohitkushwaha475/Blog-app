import { privateAxios } from "./helper";
import { myAxios } from "./helper";
export const createPost=(postData)=>{
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>response.data); 
}

export const loadAllPost=(pageNumber,pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize} &sortBY=addedDate&sortDir=desc`).then(response=>response.data)
}

export const loadPost=(postId)=>{
    return myAxios.get("/posts/"+postId).then(response=>response.data)
}

// create comment
export const createComment=(comment,postId)=>{
    return privateAxios.post( `/post/${postId}/comments`,comment)
}

// upload post banner image
export const uploadImage=(image,postId)=>{
    let formData= new FormData();
    formData.append("image",image)
    return privateAxios.post(`/posts/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    .then((response)=>response.data)

}

// get category wise post
export const loadPostCategoryWise=(categoryId)=>{
    return privateAxios.get(`/category/${categoryId}/posts`).then(response=>response.data)
}

export const loadPostUserWise=(userId,pageSize)=>{
    return privateAxios.get(`/user/${userId}/posts`).then((res) => res.data);
}

export function deletePostService(postId){
    return privateAxios.delete(`/posts/${postId}`).then((res) => res.data);
}

// update post

export function updatePostService(post,postId){
    return privateAxios.put(`/posts/${postId}`,post).then(resp=>resp.data)
}
