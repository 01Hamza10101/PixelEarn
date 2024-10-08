import { useState } from 'react';
import './Invite.css';
import { useNavigate } from 'react-router-dom';
function Invite() {
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Coordinates copied to clipboard!');
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
                    <div> Your frens: <span>124</span></div>
                </div>
                <div className="Invite_buttons">
                    <div onClick={handleCopy}>
                        <button className='layoutBtn'><span>{isCopied ? "Copied!" : "Copy Referral link"}</span> <img className='ftrInvert6' src="https://cdn1.iconfinder.com/data/icons/material-core/22/content-copy-512.png" alt="Copy" /></button>
                    </div>
                    <div>
                        <button className='layoutBtn'>Share</button>
                    </div>
                </div>
                <div class="info_layout">
                    <div class="benefits_container">
                        {/* <!-- Benefit Item 1 --> */}
                        <div class="benefits_item">
                            <div>
                                <span class="gray">Invite fren</span>
                            </div>
                            <div>
                                <span class="bold bright">8 PX </span>
                                <span class="gray">for you and fren.</span>
                            </div>
                        </div>

                        {/* <!-- Benefit Item 2 --> */}
                        <div class="benefits_item">
                            <div>
                                <span class="gray">Fren with</span>
                                <span class="bold purple">Telegram Premium</span>
                            </div>
                            <div>
                                <span class="bold bright">64 PX</span>
                                <span class="gray"> for you and fren.</span>
                            </div>
                        </div>

                        {/* <!-- Divider --> */}
                        <div class="divider"></div>

                        {/* <!-- Benefit Item 3 --> */}
                        <div class="benefits_item">
                            <div>
                                <span class="gray">Mining drop</span>
                            </div>
                            <div>
                                <span class="white bright">16%</span>
                                <span class="gray"> of all frens' mining</span>
                            </div>
                        </div>

                        {/* <!-- Benefit Item 4 --> */}
                        <div class="benefits_item">
                            <div>
                                <span class="gray">League bonuses</span>
                            </div>
                            <div>
                                <span class="bold bright">100% </span>
                                <span class="gray"> for you and fren.</span>
                            </div>
                        </div>

                        {/* <!-- Benefit Item 5 --> */}
                        <div class="benefits_item">
                            <div>
                                <span class="gray">Rank ‟Leader”</span>
                            </div>
                            <div>
                                <span class="bold">Mega Drop </span>
                                <span class="gray">If your referrals invite 1000+ people.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Invite;