import React, { useState } from 'react';
import { Compass, ZoomIn, ZoomOut, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const InteractiveMap = ({ className = "" }) => {
  const [mapType, setMapType] = useState('street'); // 'street' or 'satellite'
  const [latitude, setLatitude] = useState(18.7651235);
  const [longitude, setLongitude] = useState(73.6970609);
  const [dValue, setDValue] = useState(3780.043690623351); // scale/zoom parameter
  
  const defaultLat = 18.7651235;
  const defaultLng = 73.6970609;
  const defaultD = 3780.043690623351;

  const toggleMapType = () => {
    setMapType(prev => (prev === 'street' ? 'satellite' : 'street'));
  };

  const handlePan = (direction) => {
    // Scale step size dynamically with zoom level
    const step = 0.001 * (dValue / defaultD);
    
    switch(direction) {
      case 'up':
        setLatitude(prev => prev + step);
        break;
      case 'down':
        setLatitude(prev => prev - step);
        break;
      case 'left':
        setLongitude(prev => prev - step);
        break;
      case 'right':
        setLongitude(prev => prev + step);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setLatitude(defaultLat);
    setLongitude(defaultLng);
    setDValue(defaultD);
  };

  const handleZoom = (zoomType) => {
    if (zoomType === 'in') {
      // Zoom in: decrease dValue (minimum scale threshold 400)
      setDValue(prev => Math.max(450, prev * 0.5));
    } else {
      // Zoom out: increase dValue (maximum scale threshold 30000)
      setDValue(prev => Math.min(30000, prev * 2.0));
    }
  };

  // Build the dynamic pb Google Maps embed URL using the official place ID (direct directions)
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${dValue}!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b405ac494d45%3A0xc302bc70566bb0f8!2sIndian+Institute+of+Information+Technology+Pune!5e${mapType === 'street' ? '0' : '1'}!3m2!1sen!2sin!4v1716744000000!5m2!1sen!2sin`;

  return (
    <div className={`relative w-full h-full min-h-[350px] bg-slate-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-inner ${className}`}>
      {/* Google Maps Iframe */}
      <iframe
        title="IIIT Pune Location Map"
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full absolute inset-0 z-0 transition-opacity duration-300"
      ></iframe>
      
      {/* Style layer toggle button (Street / Satellite) */}
      <div className="absolute right-14 top-4 z-[10]">
        <button 
          onClick={toggleMapType}
          className="flex items-center px-2.5 py-1 rounded bg-black/40 hover:bg-black/60 text-white hover:text-accent border border-white/10 backdrop-blur-md shadow-md transition-all duration-200 text-[10px] font-bold uppercase tracking-wider h-8"
        >
          <span>{mapType === 'street' ? 'Satellite View' : 'Map View'}</span>
        </button>
      </div>
      
      {/* Zoom controls */}
      <div className="absolute right-4 top-4 z-[10] flex flex-col space-y-1.5">
        <button 
          onClick={() => handleZoom('in')}
          className="w-8 h-8 rounded bg-black/40 hover:bg-black/60 text-white hover:text-accent border border-white/10 backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-200"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <button 
          onClick={() => handleZoom('out')}
          className="w-8 h-8 rounded bg-black/40 hover:bg-black/60 text-white hover:text-accent border border-white/10 backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-200"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
      </div>
      
      {/* Floating Joystick D-pad */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[10]">
        <div className="relative w-22 h-22 bg-black/40 border border-white/15 rounded-full shadow-lg flex items-center justify-center backdrop-blur-md">
          {/* Pan North */}
          <button 
            onClick={() => handlePan('up')} 
            className="absolute top-1 w-6 h-5 flex items-center justify-center text-white/70 hover:text-accent active:scale-95 transition-all duration-150"
            title="Pan North"
          >
            <ChevronUp size={16} />
          </button>
          
          {/* Pan South */}
          <button 
            onClick={() => handlePan('down')} 
            className="absolute bottom-1 w-6 h-5 flex items-center justify-center text-white/70 hover:text-accent active:scale-95 transition-all duration-150"
            title="Pan South"
          >
            <ChevronDown size={16} />
          </button>
          
          {/* Pan West */}
          <button 
            onClick={() => handlePan('left')} 
            className="absolute left-1 w-5 h-6 flex items-center justify-center text-white/70 hover:text-accent active:scale-95 transition-all duration-150"
            title="Pan West"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Pan East */}
          <button 
            onClick={() => handlePan('right')} 
            className="absolute right-1 w-5 h-6 flex items-center justify-center text-white/70 hover:text-accent active:scale-95 transition-all duration-150"
            title="Pan East"
          >
            <ChevronRight size={16} />
          </button>
          
          {/* Center / Reset to Pin */}
          <button 
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-primary hover:bg-accent border border-white/10 flex items-center justify-center text-white hover:text-white transition-all duration-300 shadow-md group active:scale-90"
            title="Center on Campus"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
