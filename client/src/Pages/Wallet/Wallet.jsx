import { useEffect, useState } from 'react';
import './Wallet.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GetTaskBoosts , LevelUPBoosts ,ErrorHandlerBackendW , ADDTask} from '../../Redux/Walletslice';

function Wallet() {
    const [isTasks, setIsTasks] = useState(true);
    const [Tasks, setTasks] = useState([{
        id: 1,
        title: 'Invite bonus',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAABhQTFRFHCk/6cGp86xt4I5f1YNQq4VwlU8bUzwyVRbffwAAAJZJREFUeNrt1cENw0AIBdG04BZo4bcwLWwLlGDaj7KKkeVTZFAu3jk/gcSF12r1vKAVbsza4PYpaRk62HaiVegCDmoA8hoEY3ZsV0QVojONcC9DMPvKMdxbIDJDEaMPIkW4T9cEkWd1aNYOsWaI3YP7v+7od+Ge8JpLl4lRg5MmTFaAMwklK8HMpWQ1mEWyX+B6yqtVtTf2acUX1leb/QAAAABJRU5ErkJggg==',
        reward: '64 for fren'
    }, {
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
    // const [Boosts, setBoosts] = useState([{
    //     id: 1,
    //     title: 'Paint Reward',
    //     imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAADNQTFRFJS5B9v+18/Dl7NL//OZH1N6v1MdTura5/7AA1oX4ppdEyI4TwHoSZGNloiHkREJOZACci2GX6wAAAM5JREFUeNrt18EOgyAQRdFBpzKoQP//a8tbdGHGphppIWZuwoaEAwlhAVmWZVm3L6UQegFFNDaOITxLfYCfuJ+Adr6/gM5x6QjXCgQm8p1rB4qgi5wG7X3Y+S40DESAUlJcJ2CMIPcw/6gLzs5NR5/elovRe1LNzBNP9cBFmKiYZy8kZ3A5K3LFtlIRhLjIQugsCRTkjkj1QIgrnYnZOSzxHhzt1hIEJ8L8JvsDwWEARL2BwJjBiWznewGZFadqCUppLRGqCdrn07Is6+a9AG2rFi1gfBMTAAAAAElFTkSuQmCC',
    //     reward: '600 • 6 lvl'
    // },
    // {
    //     id: 2,
    //     title: 'Recharging Speed',
    //     imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAABJQTFRFJS5B/+2k/8ZA/6cA5HQArUkAuEjH0AAAAGRJREFUeNrt1TENAEEMA8FQCAVTMAVTCH8qL0V6Bltcka2ntuu6rjcbGqZgqIGhXCx0h4VuDQrd7eLgupa3INDqPwbGm7QOgH9ZR0KvA+GsI2GUQuE4xcKkAAhMGTG2d0zX9WYfl2Yb5cnsVocAAAAASUVORK5CYII=',
    //     reward: '300 • 4 lvl'
    // },
    // {
    //     id: 3,
    //     title: 'Energy Limit',
    //     imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAACRQTFRFJS1A1uLTscetgNhhcMJTiaeNUqhDYYZsLZkvMXI6BY4bRGNNme8YcAAAAMdJREFUeNrt1bENQyEMRdG/grMBXoEVWIEVvAIreAVvEHmFt1z4jiKlAykuUnAbmlM8ISSu0+mfs4bOaJYFmw3wGB3DWgoUdGAwD6BDMmDFuBHiqBnQKoDOzACqp0DVVu9aVbUU6KruKioingU9oKZCTodOtAnLLlSiVMg040zoRKK6B7Pv8UllCbvF9QjfsGdAIw44HZNlwO5ORA+aLTa6l7ejzY2+2lh24ffGBfxs3Hq4M0mBIQNKuAQYVCO/rk14PvvT6bdeUNkQ6l74HqUAAAAASUVORK5CYII=',
    //     reward: '300 • 4 lvl'
    // }
    // ]);
    const [isNotifiContaner, setIsNotifiContaner] = useState(true);
    const [HideNC, setHideNC] = useState(false);
    const Walletdata = useSelector(state => state.Wallet.Wallet);
    const EroorMsg = useSelector(state => state.Wallet.ErrorMsgBackend);
    const [selectedPopUp, setSelectedPopUp] = useState("");
    const [BoostsTask, setBoostsTask] = useState([]);

    const TaskBoosts = useSelector(state => state.Wallet.TasksBoosts);
    const navigate = useNavigate();
    const dispath = useDispatch();

    const [isLoading, setisLoading] = useState(true);
    if (isLoading) {
        dispath(GetTaskBoosts());
        setisLoading(false);
    }
    
    useEffect(()=>{
        if(EroorMsg === "Wallet levels updated successfully"){
            console.log("Wallet levels updated successfully");
            setIsNotifiContaner((prev) => !prev)
        }
    },[EroorMsg,Walletdata])

    useEffect(() => {
        console.log(selectedPopUp, Walletdata);
       
        if (TaskBoosts?.Boosts) {
            setBoostsTask(TaskBoosts.Boosts);
        }
    }, [isTasks]);
    
    useEffect(() => {
        if (BoostsTask && BoostsTask.length > 0 && Walletdata) {
            const filteredBoosts0 = BoostsTask[0]?.Rewardslvl?.filter(item => item[0] == Walletdata?.PaintRewardLvl);
            const filteredBoosts1 = BoostsTask[1]?.Rewardslvl?.filter(item => item[0] == Walletdata?.RechargingSpeedLvl);
            const filteredBoosts2 = BoostsTask[2]?.Rewardslvl?.filter(item => item[0] == Walletdata?.EnergyLimitLvl);
            
            console.log('filteredBoosts0', filteredBoosts0);
            console.log('filteredBoosts1', filteredBoosts1);
            console.log('filteredBoosts2', filteredBoosts2);
            
            // Update the BoostsTask only if all filtering succeeded
            setBoostsTask((prev) => [
                { ...prev[0], Rewardslvl: filteredBoosts0 || prev[0].Rewardslvl }, 
                { ...prev[1], Rewardslvl: filteredBoosts1 || prev[1].Rewardslvl },
                { ...prev[2], Rewardslvl: filteredBoosts2 || prev[2].Rewardslvl }
            ]);
        }
        console.log("BoostsTask after filtering", BoostsTask);
    }, []); 
    

    function handleTask() {
        setIsTasks(prev => !prev);
        setHideNC(false)
        console.log(TaskBoosts)
        // console.log(TaskBoosts.Boosts[0].Rewardslvl[0][1])
    }

    function handleHideNC(is) {
        setHideNC(is);
    }


    function calculateNextLevel() {
        if (selectedPopUp.Title === "Paint Reward") {
            return parseInt(Walletdata?.PaintRewardLvl) + 1;
        } else if (selectedPopUp.Title === "Recharging Speed") {
            return parseInt(Walletdata?.RechargingSpeedLvl) + 1;
        } else if (selectedPopUp.Title === "Energy Limit") {
            return parseInt(Walletdata?.EnergyLimitLvl) + 1;
        }
        return 1; // Default level in case of an unknown title
    }
    
    function isMaxLevelReached() {
        if (selectedPopUp?.Title === "Paint Reward") {
            return selectedPopUp?.TaskReward?.length === parseInt(Walletdata?.PaintRewardLvl);
        } else if (selectedPopUp?.Title === "Recharging Speed") {
            return parseInt(Walletdata?.RechargingSpeedLvl) >= selectedPopUp?.Rewardslvl?.length;
        } else if (selectedPopUp?.Title === "Energy Limit") {
            return parseInt(Walletdata?.EnergyLimitLvl) >= selectedPopUp?.Rewardslvl?.length;
        }
        return false; // Default if title doesn't match any known types
    }
    
    function handleBuy() {
        const nextLevel = calculateNextLevel();
        const isMaxLevel = isMaxLevelReached();
    
        if (!isMaxLevel) {
            const levelUpAmount = selectedPopUp?.Rewardslvl[nextLevel]?.[2];
            const checkPxel = Walletdata.Pxbalance - levelUpAmount;

            if (levelUpAmount && checkPxel > 0) {
                dispath(LevelUPBoosts({
                    type: selectedPopUp?.Title,
                    levelUpAmount: levelUpAmount
                }));
            } else {
                console.error("Level up amount not found for the next level");
                // Optionally display an alert or notification
                dispath(ErrorHandlerBackendW("Pixel not enough"));
            }
        } else {
            console.log("Max level reached, cannot level up further.");
            alert("You have reached the maximum level for this reward.");
        }
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
                    <div className="PX">{Walletdata?.Pxbalance} PX</div>
                    <div className="PXTitle">Paint pixels and get PX </div>
                    {/* <div className="Mining_Details">How it works <img className='blue-filter' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" /></div> */}
                    {/* <div className="Claim_Button">
                        <button className='layoutBtn'>
                            <span>
                                Claim
                            </span>
                            <div className="PXIcon"></div>
                            <span>
                                1.234
                            </span>
                        </button>
                    </div> */}
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
                        {TaskBoosts?.Tasks?.map((task, i) => {
                            let isCompleted = Walletdata?.TaskCompleted?.includes(task.ID);
                            return (
                                <div key={i} className="TaskItem" style={{opacity: isCompleted ? "0.5" : ""}} onClick={()=> {if(!isCompleted){dispath(ADDTask(task.ID));window.open(task.TaskUrl, '_blank')}}}>
                                    <div className="ImageContainer">
                                        <img src={task.ImageUrl} alt="task image" className="TaskImage" />
                                    </div>
                                    <div className="TaskInfo">
                                        <span className="TaskTitle">{task.Title}</span>
                                        <div className="TaskReward">
                                            {task.RewardTitle}
                                        </div>
                                    </div>
                                    <div className="TaskIconContainer">
                                        <img className='ftrInvert' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="Boosts" style={{ display: isTasks ? 'none' : '' }}>
                        {BoostsTask?.map((task, i) => {
                          let TaskReward = "";
                          
                          const getReward = (task, level, title) => {
                              if (task?.Title === title ) {
                                console.log("getReward",task?.Rewardslvl?.length , level,task?.Rewardslvl[level]?.[0]);
                                  return (task?.Rewardslvl?.length - 1) === level ? `Max • ${level} lvl` : `${task?.Rewardslvl[level]?.[2]} • ${task?.Rewardslvl[level]?.[0]} lvl`;
                              }
                              return "";
                          };
                          
                          if (task?.Title === "Paint Reward") {
                              TaskReward = getReward(task, Walletdata?.PaintRewardLvl, "Paint Reward");
                            //   console.log('w1');
                          } else if (task?.Title === "Recharging Speed") {
                              TaskReward = getReward(task, Walletdata?.RechargingSpeedLvl, "Recharging Speed");
                            //   console.log('w2');
                          } else if (task?.Title === "Energy Limit") {
                              TaskReward = getReward(task, Walletdata?.EnergyLimitLvl, "Energy Limit");
                            //   console.log('w3');
                          }
                          
                            return (
                                <div key={i} className="TaskItem" onClick={() => { if(!TaskReward.includes("Max")){setIsNotifiContaner((prev) => !prev); handleHideNC(true); setSelectedPopUp(task);} }}>
                                    <div className="ImageContainer">
                                        <img src={task.ImageUrl} alt="task image" className="TaskImage" />
                                    </div>
                                    <div className="TaskInfo">
                                        <span className="TaskTitle">{task.Title}</span>
                                        <div className="TaskReward" >
                                            {TaskReward}
                                        </div>
                                    </div>
                                    <div className="TaskIconContainer">
                                        {!TaskReward.includes("Max") && 
                                            (<img className='ftrInvert' src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />)
                                        }
                                    </div>
                                </div>
                            );
                        })}

                        {HideNC && (
                            <div className={`NotificationContainer ${isNotifiContaner ? "SlideDown" : "SlideUp"}`} >
                                <div className="NotificationHeader">
                                    <span className="NotificationTitle">{selectedPopUp.Title}</span>
                                    <span className="NotificationLevel">• {calculateNextLevel()} lvl</span>
                                </div>
                                <div className="NotificationImageContainer">
                                    <img alt="image" src={selectedPopUp.ImageUrl} />
                                </div>
                                <div className="NotificationDescription">
                                    <div className="DescriptionText">{selectedPopUp.Description}</div>
                                    <div className="RewardText">Reward: {selectedPopUp?.Rewardslvl[parseInt(selectedPopUp?.Title === "Paint Reward" ? Walletdata?.PaintRewardLvl : selectedPopUp?.Title === "Recharging Speed" ? Walletdata?.RechargingSpeedLvl : Walletdata?.EnergyLimitLvl) ]?.[1]}
                                         ⇢ {selectedPopUp?.Rewardslvl[parseInt(selectedPopUp?.Title === "Paint Reward" ? Walletdata?.PaintRewardLvl : selectedPopUp?.Title === "Recharging Speed" ? Walletdata?.RechargingSpeedLvl : Walletdata?.EnergyLimitLvl) + 1]?.[1]} </div>
                                </div>
                                <div className="NotificationButtons">
                                    <button className="CancelButton layoutBtn" onClick={() => setIsNotifiContaner((prev) => !prev)} >Cancel</button>
                                    <button className="BuyButton layoutBtn" onClick={handleBuy}>Buy for {selectedPopUp.Rewardslvl[parseInt(selectedPopUp.Title === "Paint Reward" ? Walletdata?.PaintRewardLvl : selectedPopUp.Title === "Recharging Speed" ? Walletdata?.RechargingSpeedLvl : Walletdata?.EnergyLimitLvl) + 1]?.[2]} PX</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Wallet;