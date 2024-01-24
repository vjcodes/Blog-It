import service from "../appwrite/dbconfig";
import { Link } from "react-router-dom";

type Props = {
  $id: string;
  title: string;
  featuredImage: string;
};

const PostCard = ({ $id, title, featuredImage }: Props) => {
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="w-full bg-gray-100 rounded-xl
            p-4"
      >
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage).toString()}
            alt={title}
            className="rounded-xl"
          />
        </div>

        <h2 className="tex-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
