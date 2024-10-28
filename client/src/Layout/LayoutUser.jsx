import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorHandlerBackend, auth, getToken } from '../Redux/Userslice';
import { useEffect } from 'react';

function LayoutUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ErrorMsgBackend = useSelector(state => state.User.ErrorMsgBackend);
    const Token = useSelector(state => state.User.Token);
    const Authorized = useSelector(state => state.User.isAuthorized)

    // useEffect(()=>{
    //     if (ErrorMsgBackend.msg === 'New User Registered' || ErrorMsgBackend.msg === 'User already Registered') {
    //         navigate('/login');
    //     }
    //     const token = localStorage.getItem('token');
    //     if(token !== ''){
    //         dispatch(auth());
    //         navigate('/');
    //     }
    //     // if(ErrorMsgBackend.){

    //     // }
    //     console.log(ErrorMsgBackend)

    // },[ErrorMsgBackend]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== '') {
            dispatch(getToken());
            dispatch(auth());
        }
        if(Authorized){
            navigate("/");
        }
        console.log(Token)
    }, [Authorized])

    function handleError() {
        dispatch(ErrorHandlerBackend());
    }

    return (
        <div className="User">
            <div className={ErrorMsgBackend.display ? "NotificationContaner" : "hide"} >
                <span style={{ color: ErrorMsgBackend.success ? "#0bc70b" : "red" }}>
                    {ErrorMsgBackend?.msg}
                </span>
                <div className="Cancel_Btn" onClick={handleError}>
                    <button className='layoutBtn'>
                        <img className='ftrInvert6' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-round-512.png" alt="Cancel" />
                    </button>
                </div>
            </div>
            {<Outlet />}
        </div>
    )
}
export default LayoutUser;