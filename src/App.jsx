import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";

function App() {
     const [showCanvas, setShowCanvas] = useState(false);
     const headingref = useRef(null);
     const brandref = useRef(null);
     const growingSpan = useRef(null);

    useEffect(() => {
        new LocomotiveScroll();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            gsap.to(growingSpan.current, {
                top: e.clientY - 10,
                left: e.clientX - 10,
                duration: 0.1,
                ease: "power2.out",
            });
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
            gsap.set(growingSpan.current, {
                top: e.clientY - 10,
                left: e.clientX - 10,
            });

            gsap.to("body", {
                color: "#000",
                fontStyle: "bold",
                backgroundColor: "#fd2c2a",
                duration: 1.2,
                ease: "power2.inOut",
            });

            gsap.to(growingSpan.current, {
                scale: 1000,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(growingSpan.current, {
                    scale: 0,
                    clearProps: "all",
                    });
                },
            });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    const brandElement = brandref.current;
    
    if (headingElement) {
      headingElement.addEventListener("click", handleClick);
    }
    if (brandElement) {
      brandElement.addEventListener("click", handleClick);
    }

    // Clean up event listener on unmount
    return () => {
        if (headingElement) {
          headingElement.removeEventListener("click", handleClick);
        }
        if (brandElement) {
          brandElement.removeEventListener("click", handleClick);
        }
    };
  }, []);

    return (
    <>
        <span
            ref={growingSpan}
            className="growing rounded-full block fixed top-[20px] left-[5px] w-5 h-5"
        ></span>
        <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
            {showCanvas && data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
            <div className="w-full relative z-[1] h-screen">
                <nav className="w-full p-4 flex justify-between z-50">
                    <div ref={brandref} className="brand text-2xl font-md ml-7 cursor-pointer ml-2">Thirtysixstudio</div>
                    <div className="links flex gap-10 mr-20">
                        {[
                            "What we do",
                            "Who we are",
                            "How we give back",
                            "Talk to us",
                        ].map( (link, index) => (
                            <a
                                key={index}
                                href={'#${link.toLowerCase()}'}
                                className="text-xl font-medium hover:text-gray-300"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </nav>
                <div className="textcontainer w-full px-[20%]">
                    <div className="text w-[50%]">
                        <h2 className="text-4xl leading-[1.1]">
                        At Thirtysixstudio, we build immersive digital experiences for
                        brands with a purpose.
                        </h2>
                        <p className="text-xl w-[95%] mt-6 font-medium">
                        We are a team of designers, developers, and strategists who are
                        passionate about creating digital experiences that are both
                        beautiful and functional.
                        </p>
                        <p className="text-xl mt-6 font-medium">Scroll</p>
                    </div>
                </div>
                <div className="w-full absolute bottom-0 left-0">
                    <h1
                        ref={headingref}
                        className="text-[16rem] font-normal tracking-tight leading-none pl-5 mb-[-6%] cursor-pointer"
                        >
                        Thirtysixstudio
                    </h1>
                </div>
            </div>
        </div>
        <div className="w-full relative h-screen mt-20 px-10">
            {showCanvas && data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
            <div className="relative">
                <h1 className="text-7xl tracking-tighter pt-20 cursor-pointer">about the brand</h1>
                <p className="text-3xl leading-[1.5] w-[80%] mt-7 font-light">
                    we are a team of designers, developers, and strategists who are
                    passionate about creating digital experiences that are both beautiful
                    and functional, we are a team of designers, developers, and
                    strategists who are passionate about creating digital experiences that
                    are both beautiful and functional.
                </p>
                
                <img
                className="ml-[62.75%] w-[40%] h-[80%] absolute mt-10 opacity-30"
                style={{ zIndex: -1 }}
                src="https://directus.funkhaus.io/assets/f7d24b94-84c2-40df-8106-c181aef5ed97?withoutEnlargement=true&fit=outside&width=1400&height=1400"
                alt=""
                />
            </div> 
        </div>
    </>
  );
}
export default App;
