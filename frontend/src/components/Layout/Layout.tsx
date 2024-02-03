import { useNavigate } from "react-router-dom"

type Props = {
    children: JSX.Element | string;
  }

const Layout = ({children}:Props) => {
  const navigate = useNavigate();

  const logoutHandler = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');

  }

  
  return (
    <div className="">
        <div className="bg-blue-400 p-6 flex space-x-20 items-center">
            <span className="text-xl" style={{color:"white"}}>Task Manager</span>
            <div className="">
                <ul className="flex space-x-10">
                    <li className="nav-item">
                        <span className="" style={{ cursor: "pointer", color:"white" }} aria-current="page" onClick={() => navigate("/dashboard")}>Home</span>
                    </li>
                    <li className="">
                        <button className="" style={{ cursor: "pointer", color:"white" }} onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="p-10">{children}</div>
    </div>
  )
}
export default Layout