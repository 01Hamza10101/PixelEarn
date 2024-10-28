import { useState } from 'react';
import './Invite.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
function Invite() {
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const location = useLocation();
    const InvitesList = useSelector(state => state.Wallet.Wallet.InviteList);
    const UserID = useSelector(state => state.Wallet.Wallet.UserId);

    
    const handleCopy = () => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_APP_Current_URL}/Signup?RefreelID=${UserID}`).then(() => {
            console.log('Coordinates copied to clipboard!',import.meta.env.VITE_APP_Current_URL ,location);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000)
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };
    return (
        <div className="Invite">
            <div className="Ihead">
                <div className="Back_Btn" onClick={() => navigate('/')}>
                    <button className='layoutBtn'>
                        <img className="ftrInvert6" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                    </button>
                </div>
            </div>
            <div className="Ibody">
                <div className="Image_Invite">
                    <img src="https://app.notpx.app/assets/sitting_chars_shadow-DfXpFWWw.gif" alt="Invite" />
                </div>
                <div className="Title_Invite">Invite frens</div>
                <div className="description_container">
                    <div>Invite frens to get bonuses!</div>
                    <div> Your frens: <span>{InvitesList?.length}</span></div>
                </div>
                <div className="Invite_buttons">
                    <div onClick={handleCopy}>
                        <button className='layoutBtn'><span>{isCopied ? "Copied!" : "Copy Referral link"}</span> <img className='ftrInvert6' src="https://cdn1.iconfinder.com/data/icons/material-core/22/content-copy-512.png" alt="Copy" /></button>
                    </div>
                    <div>
                        <button className='layoutBtn'>Share</button>
                    </div>
                </div>
                <div className="info_layout">
                    <div className="benefits_container">
                        {/* <!-- Benefit Item 1 --> */}
                        <div className="benefits_item">
                            <div>
                                <span className="gray">Invite fren</span>
                            </div>
                            <div>
                                <span className="bold bright">100 PX </span>
                                <span className="gray">for you and fren.</span>
                            </div>
                        </div>

                        {/* <!-- Benefit Item 2 --> */}
                        <div className="benefits_item">
                            <div>
                                <span className="gray">Fren with</span>
                                <span className="bold purple">Telegram Premium</span>
                            </div>
                            <div>
                                <span className="bold bright">64 PX</span>
                                <span className="gray"> for you and fren.</span>
                            </div>
                        </div>

                        {/* <!-- Divider --> */}
                        <div className="divider"></div>

                        {/* <!-- Benefit Item 3 --> */}
                        <div className="benefits_item">
                            <div>
                                <span className="gray">Mining drop</span>
                            </div>
                            <div>
                                <span className="white bright">16%</span>
                                <span className="gray"> of all frens' mining</span>
                            </div>
                        </div>

                        {/* <!-- Benefit Item 4 --> */}
                        <div className="benefits_item">
                            <div>
                                <span className="gray">League bonuses</span>
                            </div>
                            <div>
                                <span className="bold bright">100% </span>
                                <span className="gray"> for you and fren.</span>
                            </div>
                        </div>

                        {/* <!-- Benefit Item 5 --> */}
                        <div className="benefits_item">
                            <div>
                                <span className="gray">Rank ‟Leader”</span>
                            </div>
                            <div>
                                <span className="bold">Mega Drop </span>
                                <span className="gray">If your referrals invite 1000+ people.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Invite;