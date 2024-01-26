/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import appwriteService from "./../appwrite/dbconfig";
import { Container, PostCard } from "../components";

// interface Document {
//     // Define the structure of your document here
//     $id: string; // Assuming $id is a unique identifier for the document
//     // Other properties of your document
//   }

//   interface DocumentList<T> {
//     documents: T[]; // Assuming documents is an array of documents of type T
//     // You can add other properties like pagination information, etc., if needed
//   }

const AllPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    appwriteService.getAllPosts([]).then((posts) => {
      console.log(posts);
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
