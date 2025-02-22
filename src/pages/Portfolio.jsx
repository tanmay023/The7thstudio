import { useEffect } from "react";

const Portfolio = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white relative">
      <h1 className="text-4xl font-bold mb-6 text-center">PORTFOLIO:</h1>
      
      {/* Heyzine Flipbook Embed */}
      <div className="w-full flex justify-center items-center relative">
        <iframe
          allowFullScreen
          scrolling="no"
          className="fp-iframe w-full relative"
          style={{ border: "0px",width:"100%", height: "700px" }}
          src="https://heyzine.com/flip-book/200297a56b.html"
        ></iframe>
        
        {/* Overlay to hide branding */}
        <div className="absolute bottom-0 left-0 w-24 h-10 bg-gray-900"></div>
      </div>
    </div>
  );
};

export default Portfolio;
