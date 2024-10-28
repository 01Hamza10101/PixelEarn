import React, { useRef, useState, useEffect } from 'react';
import './Home.css';
import { io } from 'socket.io-client';
import { GetTaskBoosts , LevelUPBoosts ,ErrorHandlerBackendW,PaintPixel,handleCanvasCordinate} from '../../Redux/Walletslice';
import { useSelector, useDispatch } from 'react-redux';

let socket = "";

const Home = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [SelectedColor, setSelectedColor] = useState('rgb(255, 214, 53)');
  const Walletdata = useSelector(state => state.Wallet.Wallet);
  const EnergyPrice = useSelector(state => state.Wallet.TasksBoosts);
  const CanvasCoordinates = useSelector(state => state.Wallet.CanvasCordinate);
  const dispatch = useDispatch();

  const [pixelSize, setPixelSize] = useState(15);
  const [XY, setXY] = useState({ X: 123, Y: 234 });
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const [MaxEnergy, setMaxEnergy] = useState(0);
  const [Energy, setEnergy] = useState(10);
  const [TEnergyTime, setTEnergyTime] = useState(0);
  const [EnergyTime, setEnergyTime] = useState(0);
  const [AmoutPixels, setAmoutPixels] = useState("");

  const [clickedPixels, setClickedPixels] = useState([]);
  
  
  // const [CanvasCoordinates, setCanvasCoordinates] = useState([]);
  
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    // Initialize socket connection only once when the component mounts
    socket = io(`${import.meta.env.VITE_APP_API_URL}`);
    
    return () => {
      // Clean up socket connection on component unmount
      socket.disconnect();
    };
  }, []);
  
  if (isLoading) {
    dispatch(GetTaskBoosts());
      setisLoading(false);
  }
  
  useEffect(()=>{
    function HandleEnergyPrice() {
      setAmoutPixels(EnergyPrice?.Boosts?.[0]?.Rewardslvl[Walletdata?.PaintRewardLvl]?.[1]);
      setTEnergyTime(EnergyPrice?.Boosts?.[1]?.Rewardslvl[Walletdata?.RechargingSpeedLvl]?.[1]);
      setMaxEnergy(EnergyPrice?.Boosts?.[2]?.Rewardslvl[Walletdata?.EnergyLimitLvl]?.[1]);
    }
    HandleEnergyPrice();
  },[EnergyPrice,Walletdata])

  useEffect(() => {
    if (Energy === MaxEnergy) {
      return;  // No need to continue if energy is full
    }
  
    const intervalId = setInterval(() => {
      setEnergyTime((prevTime) => {
        // Increment energy time, reset if it reaches TEnergyTime
        if (prevTime + 1 < TEnergyTime) {
          return prevTime + 1;
        } else {
          setEnergy((prevEnergy) => {
            // Only increase energy if it's below MaxEnergy
            if (prevEnergy < MaxEnergy) {
              console.log('Energy refilled');
              return prevEnergy + 1;
            }
            return prevEnergy;
          });
          return 0;  // Reset timer after energy refills
        }
      });
    }, 1000);
  
    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [Energy, MaxEnergy, TEnergyTime]);
  

  useEffect(() => {
    socket.on('pixel-Total-data', (data) => {
      dispatch(handleCanvasCordinate(data));
    });

    // Listen for individual pixel updates
    socket.on('pixel-update', (data) => {
      console.log('Received pixel update:', data);

      // Update the coordinates locally
      const updatedCoordinates = CanvasCoordinates.map(coord =>
        coord.Id === data.Id ? { ...coord, color: data.color } : coord
      );

      // If the pixel doesn't already exist, add it
      const finalCoordinates = updatedCoordinates.some(coord => coord.Id === data.Id)
        ? updatedCoordinates
        : [...updatedCoordinates, data];

        dispatch(handleCanvasCordinate(finalCoordinates));
      });
    return () => {
      socket.off('pixel-Total-data');
      socket.off('pixel-update');
    };
}, [CanvasCoordinates]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = 525;
    canvas.height = 525;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    CanvasCoordinates.forEach((data) => {
      context.fillStyle = data.color;
      context.fillRect(data.X, data.Y, pixelSize, pixelSize);
    });
  }, [CanvasCoordinates, pixelSize]);

  const createPixelGrid = (numberOfColumns, numberOfRows) => {
    const grid = [];
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfColumns; col++) {
        const id = row * numberOfColumns + col;  // Unique ID
        grid.push({ id, row, col, color: '#ffffff' });  // Store pixel info
      }
    }
    return grid;
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) * scaleY / pixelSize) * pixelSize;

    setXY({ X: x, Y: y });
    let numberOfColumns = canvas.width / pixelSize;
    let numberOfrows = canvas.height / pixelSize;
    highlightSelectedPixel(x, y);
  };

  const highlightSelectedPixel = (x, y) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    CanvasCoordinates.forEach((data) => {
      context.fillStyle = data.color;
      context.fillRect(data.X, data.Y, pixelSize, pixelSize);
    });

    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.strokeRect(x, y, pixelSize, pixelSize);
  };

  const HandlePaint = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (Energy > 0) {
      Animate(e);
      setEnergy(prev => prev - 1)
      context.fillStyle = SelectedColor;
      context.fillRect(XY.X, XY.Y, pixelSize, pixelSize);
      
      dispatch(PaintPixel({Pixel:AmoutPixels,XY}));
      const newCoordinate = { Id: `${XY.X}${XY.Y}`, color: SelectedColor, X: XY.X, Y: XY.Y };

      const updatedCoordinates = CanvasCoordinates.map(coord =>
        coord.Id === newCoordinate.Id ? { ...coord, color: SelectedColor } : coord
      );

      const finalCoordinates = updatedCoordinates.some(coord => coord.Id === newCoordinate.Id)
        ? updatedCoordinates
        : [...updatedCoordinates, newCoordinate];

      socket.emit('pixel-update', newCoordinate);
      dispatch(handleCanvasCordinate(finalCoordinates));

    }
  };

  function Animate(e) {
    setClickedPixels(prevPixels => [
      ...prevPixels,
      { x: e.clientX - 30, key: Math.random() }
    ]);
  }

  const handleZoom = () => {
    const container = canvasContainerRef.current;
    const canvas = canvasRef.current;
    const prevZoomLevel = zoomLevel;
    const newZoomLevel = zoomLevel === 1 ? 2 : 1;
    setZoomLevel(newZoomLevel);
  };

  const colors = [
    'rgb(228, 110, 110)', 'rgb(255, 214, 53)', 'rgb(126, 237, 86)', 'rgb(0, 204, 192)',
    'rgb(81, 233, 244)', 'rgb(148, 179, 255)', 'rgb(228, 171, 255)', 'rgb(255, 153, 170)',
    'rgb(255, 180, 112)', 'rgb(255, 255, 255)', 'rgb(190, 0, 57)', 'rgb(255, 150, 0)',
    'rgb(0, 204, 120)', 'rgb(0, 158, 170)', 'rgb(54, 144, 234)', 'rgb(106, 92, 255)',
    'rgb(180, 74, 192)', 'rgb(255, 56, 129)', 'rgb(156, 105, 38)', 'rgb(137, 141, 144)',
    'rgb(109, 0, 26)', 'rgb(191, 67, 0)', 'rgb(0, 163, 104)', 'rgb(0, 117, 111)',
    'rgb(36, 80, 164)', 'rgb(73, 58, 193)', 'rgb(129, 30, 159)', 'rgb(160, 3, 87)',
    'rgb(109, 72, 47)', 'rgb(0, 0, 0)'
  ];
  const [isColorPalate, setisColorPalate] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  const calculateProgress = () => {
    return (EnergyTime / TEnergyTime) * 100;
  };

  return (
    <div className='Home'>
      <div
        ref={canvasContainerRef}
        className='CanvasDiv'
        style={{
          width: `332px`,
          height: `332px`,
        }}
      >
        <canvas
          ref={canvasRef}
          onDoubleClick={HandlePaint}
          onClick={handleCanvasClick}
        >
          Canvas is not supported
        </canvas>
      </div>

      <div className="Paint_Color">

        <div className="Color_Cordinate">
          <div className="Color" style={{ background: SelectedColor }} onClick={() => setisColorPalate(prev => !prev)}></div>

          <div className="Cordinaate">
            <span>
              {XY.X},{XY.Y}
            </span>
            <button className='layoutBtn' onClick={() => handleCopy(`${XY.X}, ${XY.Y}`)}>
              <img className='ftrInvert' src="https://cdn1.iconfinder.com/data/icons/material-core/22/content-copy-512.png" alt="Copy" />
            </button>
          </div>

          <div className="Info_button">
            <button className='layoutBtn'>Info</button>
          </div>
        </div>


        <div className={`Color_Palate ${isColorPalate ? 'Expanded' : 'Collapsed'}`} style={{ transition: 'height 0.3s ease-in-out , opacity 0.3s ease-in-out' }}>
          {colors.map((color, index) => (
            <div
              key={index}
              className="Color_Item"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}

        </div>

        <div className="Paint_button" onClick={HandlePaint}>
          {clickedPixels.map((pixel, index) => (
            <div key={pixel.key} className='Px_Animation' style={{ left: `${pixel.x}px` }}>
              {AmoutPixels}
              <div className='PixelIcon'></div>
            </div>
          ))}
          <div className="progress" style={{ width: `${calculateProgress()}%`, transition: 'width 0.3s ease-in-out' }}>
          </div>

          <span>{Energy} <img className='ftrInvert' src="https://cdn2.iconfinder.com/data/icons/rpg-fantasy-game-basic-ui/512/element_thunder_energy_electric_lightning_flash-512.png" alt="Energy" /></span>
          <button className='layoutBtn'>
            {Energy !== 0 ? "Paint" : "No Energy"}
          </button>
        </div>

      </div>


    </div>
  );
};

export default Home;
