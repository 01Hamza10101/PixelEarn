import './Layout.css';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Layout() {
    const navigate = useNavigate();

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
                    <span>1423</span>
                </div>

                <button className='Store_button'>
                    <img className='ftrInvert' src="https://cdn3.iconfinder.com/data/icons/shopping-28/32/storefront-512.png" alt="Shop" />
                </button>
            </div>
            <div className="body">
                {<Outlet />}
            </div>
        </div>
    )
}

export default Layout;