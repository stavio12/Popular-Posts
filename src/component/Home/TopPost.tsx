import { Link } from "react-router-dom";
import { NewsType } from "utils/reducers-state";

function TopPost(props: { topPost: NewsType }) {
  return (
    <>
      <div className="col-12 col-md-4 py-3">
        <p className="h5 text-truncate d-block ">{props.topPost.title}</p>

        <Link to={`${props.topPost.id}`} className="text-dark ">
          <p className="h6 d-block ">{props.topPost.body}</p>
        </Link>
      </div>
    </>
  );
}

export default TopPost;
