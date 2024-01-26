/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import appwriteService from "./../appwrite/dbconfig";

const MyPostsPage = () => {
  const userId = useSelector((store: RootState) => store.auth.userId);
  const [myPosts, setMyPosts] = useState<any[]>([]);

  useEffect(() => {
    appwriteService.getMyPosts(userId).then((data) => {
      if (data) {
        setMyPosts(data.documents);
      }
    });
  }, [userId]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {myPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MyPostsPage;
