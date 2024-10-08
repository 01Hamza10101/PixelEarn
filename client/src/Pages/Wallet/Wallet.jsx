import { useState } from 'react';
import './Wallet.css';
import { useNavigate } from 'react-router-dom';

function Wallet() {
    const [isTasks, setIsTasks] = useState(true);
    const [Tasks, setTasks] = useState([{
        id: 1,
        title: 'Invite bonus',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAABhQTFRFHCk/6cGp86xt4I5f1YNQq4VwlU8bUzwyVRbffwAAAJZJREFUeNrt1cENw0AIBdG04BZo4bcwLWwLlGDaj7KKkeVTZFAu3jk/gcSF12r1vKAVbsza4PYpaRk62HaiVegCDmoA8hoEY3ZsV0QVojONcC9DMPvKMdxbIDJDEaMPIkW4T9cEkWd1aNYOsWaI3YP7v+7od+Ge8JpLl4lRg5MmTFaAMwklK8HMpWQ1mEWyX+B6yqtVtTf2acUX1leb/QAAAABJRU5ErkJggg==',
        reward: '64 for fren'
    },{
        id: 2,
        title: 'Invite bonus',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAABhQTFRFHCk/6cGp86xt4I5f1YNQq4VwlU8bUzwyVRbffwAAAJZJREFUeNrt1cENw0AIBdG04BZo4bcwLWwLlGDaj7KKkeVTZFAu3jk/gcSF12r1vKAVbsza4PYpaRk62HaiVegCDmoA8hoEY3ZsV0QVojONcC9DMPvKMdxbIDJDEaMPIkW4T9cEkWd1aNYOsWaI3YP7v+7od+Ge8JpLl4lRg5MmTFaAMwklK8HMpWQ1mEWyX+B6yqtVtTf2acUX1leb/QAAAABJRU5ErkJggg==',
        reward: '64 for fren'
    },
    {
        id: 3,
        title: 'Referral reward',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAABhQTFRFHCk/6cGp86xt4I5f1YNQq4VwlU8bUzwyVRbffwAAAJZJREFUeNrt1cENw0AIBdG04BZo4bcwLWwLlGDaj7KKkeVTZFAu3jk/gcSF12r1vKAVbsza4PYpaRk62HaiVegCDmoA8hoEY3ZsV0QVojONcC9DMPvKMdxbIDJDEaMPIkW4T9cEkWd1aNYOsWaI3YP7v+7od+Ge8JpLl4lRg5MmTFaAMwklK8HMpWQ1mEWyX+B6yqtVtTf2acUX1leb/QAAAABJRU5ErkJggg==',
        reward: '100 for new friend'
    }
    ]);
    const [Boosts, setBoosts] = useState([{
        id: 1,
        title: 'Paint Reward',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAADNQTFRFJS5B9v+18/Dl7NL//OZH1N6v1MdTura5/7AA1oX4ppdEyI4TwHoSZGNloiHkREJOZACci2GX6wAAAM5JREFUeNrt18EOgyAQRdFBpzKoQP//a8tbdGHGphppIWZuwoaEAwlhAVmWZVm3L6UQegFFNDaOITxLfYCfuJ+Adr6/gM5x6QjXCgQm8p1rB4qgi5wG7X3Y+S40DESAUlJcJ2CMIPcw/6gLzs5NR5/elovRe1LNzBNP9cBFmKiYZy8kZ3A5K3LFtlIRhLjIQugsCRTkjkj1QIgrnYnZOSzxHhzt1hIEJ8L8JvsDwWEARL2BwJjBiWznewGZFadqCUppLRGqCdrn07Is6+a9AG2rFi1gfBMTAAAAAElFTkSuQmCC',
        reward: '600 • 6 lvl'
    },
    {
        id: 2,
        title: 'Recharging Speed',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAABJQTFRFJS5B/+2k/8ZA/6cA5HQArUkAuEjH0AAAAGRJREFUeNrt1TENAEEMA8FQCAVTMAVTCH8qL0V6Bltcka2ntuu6rjcbGqZgqIGhXCx0h4VuDQrd7eLgupa3INDqPwbGm7QOgH9ZR0KvA+GsI2GUQuE4xcKkAAhMGTG2d0zX9WYfl2Yb5cnsVocAAAAASUVORK5CYII=',
        reward: '300 • 4 lvl'
    },
    {
        id: 3,
        title: 'Energy Limit',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAACRQTFRFJS1A1uLTscetgNhhcMJTiaeNUqhDYYZsLZkvMXI6BY4bRGNNme8YcAAAAMdJREFUeNrt1bENQyEMRdG/grMBXoEVWIEVvAIreAVvEHmFt1z4jiKlAykuUnAbmlM8ISSu0+mfs4bOaJYFmw3wGB3DWgoUdGAwD6BDMmDFuBHiqBnQKoDOzACqp0DVVu9aVbUU6KruKioingU9oKZCTodOtAnLLlSiVMg040zoRKK6B7Pv8UllCbvF9QjfsGdAIw44HZNlwO5ORA+aLTa6l7ejzY2+2lh24ffGBfxs3Hq4M0mBIQNKuAQYVCO/rk14PvvT6bdeUNkQ6l74HqUAAAAASUVORK5CYII=',
        reward: '300 • 4 lvl'
    }
    ]);
    const [isNotifiContaner,setIsNotifiContaner] = useState(true);
    const [HideNC,setHideNC] = useState(false);
    const navigate = useNavigate();


    function handleTask() {
        setIsTasks(prev => !prev);
        setHideNC(false)
    }

    function handleHideNC(is) {
        setHideNC(is);
    }

    return (
        <div className='Wallet'>
            <div className='Whead'>
                <div className="Back_Btn" onClick={() => navigate('/')}>
                    <button className='layoutBtn'>
                        <img className='ftrInvert6' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                    </button>
                </div>

                <div className="Balance">
                    Your balance
                </div>

                <div className="Records_Btn" onClick={() => navigate('/History')}>
                    <button className='layoutBtn'>
                        <img className='ftrInvert6' src="https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded_2-52-512.png" alt="Records" />
                    </button>
                </div>
            </div>
            <div className="Wbody">
                <div className="Px_Contaner_Balance">
                    <div className="PxIcon"></div>
                    <div className="PX">1243 PX</div>
                    <div className="PXTitle">Paint pixels and get PX </div>
                    <div className="Mining_Details">How it works <img className='blue-filter' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" /></div>
                    <div className="Claim_Button">
                        <button className='layoutBtn'>
                            <span>
                                Claim
                            </span>
                            <div className="PXIcon"></div>
                            <span>
                                1.234
                            </span>
                        </button>
                    </div>
                    <div className="Menu_Buttons">
                        <div>
                            <button className='layoutBtn' onClick={handleTask} style={{ color: !isTasks ? "rgba(255, 255, 255, 0.492)" : '' }}>
                                Tasks
                            </button>
                            <div className='bottom' style={{ opacity: isTasks ? 1 : 0 }}> </div>
                        </div>
                        <div>
                            <button className='layoutBtn' onClick={handleTask} style={{ color: isTasks ? "rgba(255, 255, 255, 0.492)" : '' }}>
                                Boosts
                            </button>
                            <div className='bottom' style={{ opacity: isTasks ? 0 : 1 }}> </div>
                        </div>
                    </div>
                </div>
                <div className="Tasks_Boosts" >
                    <div className="Tasks" style={{ display: !isTasks ? 'none' : '' }}>
                        {Tasks.map((task, i) => (
                            <div key={task.id} className="TaskItem" >
                                <div className="ImageContainer">
                                    <img src={task.imageUrl} alt="task image" className="TaskImage" />
                                </div>
                                <div className="TaskInfo">
                                    <span className="TaskTitle">{task.title}</span>
                                    <div className="TaskReward">
                                        {task.reward}
                                    </div>
                                </div>
                                <div className="TaskIconContainer">
                                    <img className='ftrInvert' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="Boosts" style={{ display: isTasks ? 'none' : '' }}>
                        {Boosts.map((task, i) => (
                            <div key={task.id} className="TaskItem" onClick={() => {setIsNotifiContaner((prev) => !prev) ; handleHideNC(true)}}>
                                <div className="ImageContainer">
                                    <img src={task.imageUrl} alt="task image" className="TaskImage" />
                                </div>
                                <div className="TaskInfo">
                                    <span className="TaskTitle">{task.title}</span>
                                    <div className="TaskReward">
                                        {task.reward}
                                    </div>
                                </div>
                                <div className="TaskIconContainer">
                                    <img className='ftrInvert' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                                </div>
                            </div>
                        ))}
                        {HideNC && (<div className={`NotificationContainer ${isNotifiContaner ? "SlideDown" : "SlideUp"}`} onClick={() => setIsNotifiContaner((prev) => !prev)}>
                            <div class="NotificationHeader">
                                <span className="NotificationTitle">Paint Reward</span>
                                <span class="NotificationLevel">• 2 lvl</span>
                            </div>
                            <div className="NotificationImageContainer">
                                <img alt="image" src={Boosts[1].imageUrl} />
                            </div>
                            <div className="NotificationDescription">
                                <div className="DescriptionText">Increase amount of PX you can earn per one repaint.</div>
                                <div className="RewardText">Reward: 1 ⇢ 1.5 PX</div>
                            </div>
                            <div className="NotificationButtons">
                                <button className="CancelButton layoutBtn">Cancel</button>
                                <button className="BuyButton layoutBtn">Buy for 5 PX</button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Wallet;