import './Layout.css';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {ErrorHandlerBackend,auth} from '../Redux/Userslice';
import {GetWalletdata,GetLeaderboarddata,ErrorHandlerBackendW} from '../Redux/Walletslice';

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ErrorMsgBackend = useSelector(state => state.User.ErrorMsgBackend)
    const ErrorMsgWallet = useSelector(state => state.Wallet.ErrorMsgBackend);
    
    const user = useSelector(state => state.User.User);
    const Authorized = useSelector(state => state.User.isAuthorized)
    const Walletdata = useSelector(state => state.Wallet.Wallet);

    // useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     if (ErrorMsgBackend.msg === 'Please login') {
    //         navigate('/login');
    //         localStorage.removeItem('token');
    //     }
    //     if(token !== ''){
    //         dispatch(auth());
    //     }
    //     console.log(ErrorMsgBackend,token);
    // },[]);'

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== '') {
            // dispatch(getToken());
            dispatch(auth());
        }
        // console.log("working auth ", Authorized)
        if(Authorized === false){
            navigate("/login");
        }
        dispatch(GetWalletdata());
        dispatch(GetLeaderboarddata());
    }, [Authorized]);
    
    function handleError() {
        dispatch(ErrorHandlerBackend());
        dispatch(ErrorHandlerBackendW());
    }
    
    return (
        <div className='Layout'>
            <div className="head">
                <div className='Ratings_Invites'>
                    <button className='Ratings_button' onClick={() => navigate('/Leaderboard')}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAABtQTFRFR3BM////////////////////////////////Fv0dDgAAAAh0Uk5TABU6XISq0+/2d3cmAAABKElEQVR42u3Z24rDMAxFUV1s6fz/Fw+FlA4lpGOj2Ew566kPKWxEQ2NFiIiIiIiIiIiI6L/RFrgQTeVWGvggbikwPwQ+Cj+YVLHAlChKcExzKaCJaak1A9g7gg7M61UBfSDmeS0DGMAABlQFNACI8YAAgPYNAY6H8YCyPyPDg40FvL5WAA9tNKAdg6u6DVLHAjSPjwX8NYKGa+9XuhQ+k41NAMfYSjRMalIkMCWkiiUmpMneAltwJlx5RlTz1hJ/kK25qdxCvQcuRfetB/RQuZ1l1Q+/viBNZGdBmiyiHSe6yjqeeJMua3ngl3BZT70nAOTsrV95ZmDADvbcW8bEUrJ+eRmLE7xgI1e9vExdO4C9I+g40WUdnNoewPdJREREREREREREU34Aqms7WGCxI2EAAAAASUVORK5CYII=" alt="Prize" />
                    </button>

                    <button className='Invite_button' onClick={() => navigate('/Invite')}>
                        <img className='ftrInvert' src="https://cdn3.iconfinder.com/data/icons/feather-5/24/plus-square-512.png" alt="Invite" />
                    </button>
                </div>

                <div className='Pixels' onClick={() => navigate('/Wallet')}>
                    <div className='PixelIcon'></div>
                    <span>{Walletdata?.Pxbalance}</span>
                </div>

                <button className='Store_button' onClick={() => navigate('/Shop')}>
                    <img className='ftrInvert' src="https://cdn3.iconfinder.com/data/icons/shopping-28/32/storefront-512.png" alt="Shop" />
                </button>
                
                <div className={ErrorMsgBackend.display || ErrorMsgWallet.display ? "NotificationContaner" : "hide"} >
                    <span style={{color:ErrorMsgBackend.success || ErrorMsgWallet.success ? "#3aff3a" : "red"}}>
                       {ErrorMsgBackend?.msg || ErrorMsgWallet.msg}
                    </span>
                    <div className="Cancel_Btn" onClick={handleError}>
                        <button>
                        <img className='ftrInvert6' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-round-512.png" alt="Cancel" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="body">
                {<Outlet />}
            </div>
        </div>
    )
}

export default Layout;