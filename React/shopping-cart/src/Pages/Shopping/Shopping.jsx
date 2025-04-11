import { Link } from "react-router-dom";

export default function Shopping() {
  return (
    <>
      <p>This is the Shopping Page</p>
      <button>
        <Link to="/">Go Back Home</Link>
      </button>
    </>
  );
}
