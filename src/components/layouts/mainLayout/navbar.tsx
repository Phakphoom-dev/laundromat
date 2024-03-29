import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 drop-shadow-sm px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>

        <button
          className="btn btn-ghost text-xl"
          onClick={() => {
            navigate(PATH.HOME);
          }}
        >
          Laundromat
        </button>
      </div>

      <div className="navbar-end">
        <button
          className="btn"
          onClick={() => {
            navigate(PATH.PROGRAMMING_TEST);
          }}
        >
          Programming Test
        </button>
      </div>
    </div>
  );
}
