import { useEffect, useState } from 'react';
import './Leaderboard.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Leaderboard() {
    const navigate = useNavigate();
    const [isMenuSelected, setIsMenuSelected] = useState("Bronze");
    const Leaderboard = useSelector(state => state.Wallet.Leaderboard);
    const [Bronze, setBronze] = useState(Leaderboard.Leaderboard20k)
    // const [Bronze, setBronze] = useState([
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Bro gaming',
    //         Pixels: 45
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Pixel Master',
    //         Pixels: 34
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Paint Wizard',
    //         Pixels: 53
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Color Guru',
    //         Pixels: 34
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Palette King',
    //         Pixels: 43
    //     },
    
    // ]);
    // const [Silver, setSilver] = useState([
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Bro gaming',
    //         Pixels: 345
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Pixel Master',
    //         Pixels: 234
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Paint Wizard',
    //         Pixels: 453
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Color Guru',
    //         Pixels: 234
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Palette King',
    //         Pixels: 543
    //     },
    
    // ]);
    // const [Gold, setGold] = useState([
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Bro gaming',
    //         Pixels: 2345
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Pixel Master',
    //         Pixels: 3234
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Paint Wizard',
    //         Pixels: 3453
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Color Guru',
    //         Pixels: 4234
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Palette King',
    //         Pixels: 2543
    //     },
    
    // ]);
    // const [Premum, setPremum] = useState([
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Bro gaming',
    //         Pixels: 42345
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Pixel Master',
    //         Pixels: 43234
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Paint Wizard',
    //         Pixels: 83453
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Color Guru',
    //         Pixels: 54234
    //     },
    //     {
    //         ProfileImage: 'https://cdn.joincommunity.xyz/api-clicker/tg/team-avatars/580884.jpg',
    //         UserNmage: 'Palette King',
    //         Pixels: 42543
    //     },
    
    // ]);
    const [SelcetedLeaderBoard, setSelcetedLeaderBoard] = useState([]);

    // useEffect(()=>{
    //     console.log(SelcetedLeaderBoard,Leaderboard.Leaderboard20k);
    // },[Leaderboard,SelcetedLeaderBoard]);

    useEffect(() => {
        switch (isMenuSelected) {
            case "Bronze":
                setSelcetedLeaderBoard(Leaderboard.Leaderboard20k);
                break;
            case "Silver":
                setSelcetedLeaderBoard(Leaderboard.Leaderboard40k);
                break;
            case "Gold":
                setSelcetedLeaderBoard(Leaderboard.Leaderboard60k);
                break;
            case "Premum":
                setSelcetedLeaderBoard(Leaderboard.Leaderboard80k);
                break;
            default:
                setSelcetedLeaderBoard([]);
        }
    }, [isMenuSelected, Bronze]);
    
    function LeaderboardUnderLimit() {
        switch (isMenuSelected) {
            case "Bronze":
                return "20k";
                break;
            case "Silver":
                return "40k";
                break;
            case "Gold":
                return "60k";
                break;
            case "Premum":
                return "80k";
                break;
        }
    }
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
                                <span>Under {LeaderboardUnderLimit()}</span>
                            </div>
                            {SelcetedLeaderBoard &&
                                (SelcetedLeaderBoard?.map((data, i) => {
                                    console.log(data)
                                    return (
                                        <div className="rating_item" key={i}>
                                            <div className="Rank">{i+1}</div>
                                            <div className="_avatar_container">
                                                {/* <img alt="avatar" className="_avatar" src={data.ProfileImage} /> */}
                                                {/* <div className="_position">1</div> */}
                                            </div>
                                            <div className="rating_main_info">
                                                <span className="_rating_name">{data.Name}</span>
                                            </div>
                                            <div className="_rating_Pixel">
                                                <div className="PixelIcon"></div>
                                                <span>
                                                    {data.Pxbalance}
                                                    </span>
                                                </div>
                                        </div>
                                    )
                                }))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Leaderboard;