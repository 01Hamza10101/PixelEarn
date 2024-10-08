import { useState } from 'react';
import './History.css';
import { useNavigate } from 'react-router-dom';

const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', ' at');
  };


function History() {
    const navigate = useNavigate();
    const [History, setHistory] = useState([{
        type: 'Paint Pixel',
        Cordinate: '256, 144',
        Date: '08 October  at 19:48',
        Pixels: 4.5
    },
    {
        type: 'Paint Pixel',
        Cordinate: '256, 144',
        Date: formatDate(new Date()),
        Pixels: 5
    },
    {
        type: 'Claim',
        Date: '08 October  at 19:48',
        Pixels: 25
    }
    ]);

    return (
        <div className="History">
            <div className="Hhead">
                <div className="Back_Btn" onClick={() => navigate('/Wallet')}>
                    <button className='layoutBtn'>
                        <img className="ftrInvert6" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png" alt="Back" />
                    </button>
                </div>
                <div className="headerTitle">
                    History
                </div>
            </div>
            <div className="Hbody">
                {History.map((data, i) => {
                    console.log(data, i)
                    return (
                        <div className="Records" key={i}>
                            <div className="info_container">
                                <div>
                                    <span className="title_text">{data.type}</span>
                                    {data?.Cordinate &&
                                        <span className="hint_text">{data.Cordinate}</span>
                                    }
                                </div>
                                <div className="date_text">
                                    <span>{data.Date}</span>
                                </div>
                            </div>
                            <div className="value_container">
                                <span className="value_text">+{data.Pixels}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default History;