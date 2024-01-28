import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

export const Post = ({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) => {
	const userContextData=useContext(userContext)
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, []);

  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 50) + "...",
          }}
        ></CardText>
        <div>
          <Link className="btn btn-secondary" to={"/post/" + post.postId}>
            Read More
          </Link>
          { userContextData.user.login  ? (
            user?.id == post.user.id ? (
              <Button
                color="danger"
                className="ms-2"
                onClick={() => deletePost(post)}
              >
                Delete
              </Button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
           { userContextData.user.login  ? (
            user?.id == post.user.id ? (
              <Button
                color="warning"
                className="ms-2"
               tag={Link}
               to={`/user/update-blog/${post.postId}`}
              >
                Update
              </Button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </CardBody>
    </Card>
  );
};
