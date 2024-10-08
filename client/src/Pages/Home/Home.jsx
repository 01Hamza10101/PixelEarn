import React, { useRef, useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [SelectedColor, setSelectedColor] = useState('rgb(255, 214, 53)');
  const [pixelSize, setPixelSize] = useState(15); 
  const [XY, setXY] = useState({ X: 123, Y: 234 });
  const [zoomLevel, setZoomLevel] = useState(1); 
  const [MaxEnergy, setMaxEnergy] = useState(9);
  const [Energy, setEnergy] = useState(7);
  const [TEnergyTime, setTEnergyTime] = useState(10);
  const [EnergyTime, setEnergyTime] = useState(0);
  
  const [clickedPixels, setClickedPixels] = useState([]);

  const [CanvasCoordinates, setCanvasCoordinates] = useState(() => {
    const savedCoordinates = localStorage.getItem('canvasCoordinates');
    return savedCoordinates ? JSON.parse(savedCoordinates) : [];
  });

  useEffect(() => {
    if (Energy === MaxEnergy) {
      return;
    }
  
    const intervalId = setInterval(() => {
      setEnergyTime((prev) => {
        if (prev < TEnergyTime) {
          return prev + 1;
        } else {
          return 0; 
        }
      });
  
      setEnergy((prevEnergy) => {
        if (EnergyTime === TEnergyTime) {
          console.log('Energy refilled');
          return Math.min(prevEnergy + 1, MaxEnergy);
        }
        return prevEnergy;
      });
  
      if (EnergyTime === TEnergyTime) {
        clearInterval(intervalId);
      }
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [TEnergyTime, EnergyTime, Energy, MaxEnergy]);
  
  

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

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) * scaleY / pixelSize) * pixelSize;

    setXY({ X: x, Y: y });

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
      console.log(SelectedColor)
      setEnergy(prev => prev - 1)
      context.fillStyle = SelectedColor;
      context.fillRect(XY.X, XY.Y, pixelSize, pixelSize);

      const updatedCoordinates = [...CanvasCoordinates, { color: SelectedColor, X: XY.X, Y: XY.Y }];
      setCanvasCoordinates(updatedCoordinates);

      localStorage.setItem('canvasCoordinates', JSON.stringify(updatedCoordinates));
    }
  };
  
  function Animate(e){
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
      console.log('Coordinates copied to clipboard!');
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
            3.5 <div className='PixelIcon'></div>
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
