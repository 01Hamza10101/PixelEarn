import { useState } from 'react';
import './Leaderboard.css';
import { useNavigate } from 'react-router-dom';
function Leaderboard() {
    const navigate = useNavigate();
    const [isMenuSelected, setIsMenuSelected] = useState("Bronze");
    const [LeaderBoard, setLeaderBoard] = useState([
        {
            ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
            UserNmage: 'Bro gaming',
            Pixels: 2342345
        },
        {
            ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
            UserNmage: 'Pixel Master',
            Pixels: 1243234
        },
        {
            ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
            UserNmage: 'Paint Wizard',
            Pixels: 983453
        },
        {
            ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
            UserNmage: 'Color Guru',
            Pixels: 654234
        },
        {
            ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
            UserNmage: 'Palette King',
            Pixels: 542543
        },
    
    ]);

    return (
        <div className="Leaderboard">
            <div className="Lhead">
                <div className="Back_Btn" onClick={() => navigate('/')}>
                    <button className='layoutBtn'>
                        <img className="ftrInvert6" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                    </button>
                </div>
            </div>
            <div className="Lbody">
                <div className="content">
                    <div className="squad-img-container">
                        <img alt="img" className="squad-img" src="https://app.notpx.app/assets/icon_squad-_NF17RUb.gif" />
                    </div>

                    {/* <div className="panel">
                        <div className="item">
                            <h2>Painters</h2>
                        </div>
                    </div> */}

                    <div className="description-container">
                        <span className="description">Pixel painting Leaderboard!
                            {/* <br/><span className="more-details"><span>Painters stat</span></span> */}
                        </span>
                    </div>

                    <div className="league-panel">
                        <div>
                            <div onClick={() => setIsMenuSelected("Bronze")} style={{ color: isMenuSelected == "Bronze" ? "White" : "#8794a1" }} className="league-item">Bronze<span style={{ opacity: isMenuSelected == "Bronze" ? 1 : 0 }} className="league-text"></span></div>
                            <div onClick={() => setIsMenuSelected("Silver")} style={{ color: isMenuSelected == "Silver" ? "White" : "#8794a1" }} className="league-item">Silver<span style={{ opacity: isMenuSelected == "Silver" ? 1 : 0 }} className="league-text"></span></div>
                            <div onClick={() => setIsMenuSelected("Gold")} style={{ color: isMenuSelected == "Gold" ? "White" : "#8794a1" }} className="league-item active">Gold<span style={{ opacity: isMenuSelected == "Gold" ? 1 : 0 }} className="league-text"></span></div>
                            <div onClick={() => setIsMenuSelected("Premum")} style={{ color: isMenuSelected == "Premum" ? "White" : "#8794a1" }} className="league-item">Premum<span style={{ opacity: isMenuSelected == "Premum" ? 1 : 0 }} className="league-text"></span></div>
                        </div>
                    </div>

                    <div className="info-layout">
                        <div className="info-container">
                            <div className="stat-container">
                                <span>from 20k</span>
                            </div>
                            {
                                LeaderBoard.map((data, i) => {
                                    return (
                                        <div class="rating_item">
                                            <div className="Rank">{i+1}</div>
                                            <div class="_avatar_container">
                                                <img alt="avatar" class="_avatar" src={data.ProfileImage} />
                                                {/* <div class="_position">1</div> */}
                                            </div>
                                            <div class="rating_main_info">
                                                <span class="_rating_name">{data.UserNmage}</span>
                                            </div>
                                            <div class="_rating_Pixel">
                                                <div className="PixelIcon"></div>
                                                <span>
                                                    {data.Pixels}
                                                    </span>
                                                </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Leaderboard;