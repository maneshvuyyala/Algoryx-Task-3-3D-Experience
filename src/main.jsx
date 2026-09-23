import React, {Suspense, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {Canvas, useFrame} from "@react-three/fiber";
import {Environment, Float, OrbitControls, Stage, useGLTF} from "@react-three/drei";
import {ArrowDown, Box, Maximize2, RotateCcw, Sparkles} from "lucide-react";
import "./App.css";

function Model({scale=2.5}){
  const ref=useRef();
  const {scene}=useGLTF("/algoryx-community-asset.glb");
  useFrame((_,delta)=>{if(ref.current) ref.current.rotation.y += delta*.18});
  return <Float speed={1.2} rotationIntensity={.12} floatIntensity={.3}>
    <primitive ref={ref} object={scene} scale={scale}/>
  </Float>
}
useGLTF.preload("/algoryx-community-asset.glb");

function Viewer(){
 const [auto,setAuto]=useState(true);
 return <div className="viewer">
   <Canvas camera={{position:[0,1.2,6],fov:38}} dpr={[1,1.7]}>
    <Suspense fallback={null}>
      <Stage environment="city" intensity={.8} shadows="contact" adjustCamera={false}><Model/></Stage>
      <Environment preset="city"/>
    </Suspense>
    <OrbitControls enablePan={false} autoRotate={auto} autoRotateSpeed={1.2} minDistance={3} maxDistance={9}/>
   </Canvas>
   <div className="viewer-tools">
    <button onClick={()=>setAuto(!auto)}>{auto?"Pause rotation":"Auto rotate"}</button>
    <button onClick={()=>location.reload()}><RotateCcw size={15}/></button>
   </div>
 </div>
}

function App(){
 return <div className="app">
  <nav className="nav"><div className="brand"><span><Sparkles size={15}/></span>NEXORA</div>
   <div className="navlinks"><a href="#experience">Experience</a><a href="#details">Details</a><a href="#technology">Technology</a><a href="#about">About</a></div>
   <button className="navcta" onClick={()=>document.getElementById("experience").scrollIntoView({behavior:"smooth"})}>Explore <ArrowDown size={15}/></button>
  </nav>

  <main>
   <section className="hero">
    <div className="hero-copy">
      <p className="eyebrow"><Sparkles size={15}/> ALGORYX COMMUNITY · 3D EXPERIENCE</p>
      <h1>Meet the model.<br/><span>Explore it in space.</span></h1>
      <p>A responsive interactive web experience built around a web-ready 3D asset. Rotate, zoom and inspect the model directly in the browser.</p>
      <div className="hero-buttons"><button className="primary" onClick={()=>document.getElementById("experience").scrollIntoView({behavior:"smooth"})}>Enter 3D experience <ArrowDown size={17}/></button><a href="#details">View details</a></div>
    </div>
    <div className="hero-model"><Viewer/></div>
   </section>

   <section id="experience" className="experience">
    <div className="section-title"><p className="eyebrow">01 · INTERACTIVE VIEW</p><h2>Designed around the <span>3D asset.</span></h2><p>Use drag to orbit, scroll to zoom and the controls to change the presentation.</p></div>
    <Viewer/>
   </section>

   <section id="details" className="details">
    <div className="detail-copy"><p className="eyebrow">02 · ASSET DETAILS</p><h2>Digital object.<br/><span>Real interaction.</span></h2><p>This section gives the 3D model context instead of treating it as a decorative image. The surrounding interface explains what visitors can inspect and how the asset is presented.</p></div>
    <div className="detail-grid">
      <article><Box/><b>Web-ready</b><p>GLB/glTF based asset integration for browser delivery.</p></article>
      <article><Maximize2/><b>Interactive</b><p>Orbit controls allow rotation and zoom directly in the scene.</p></article>
      <article><Sparkles/><b>Responsive</b><p>The experience adapts to desktop, tablet and mobile layouts.</p></article>
      <article><RotateCcw/><b>Animated</b><p>Subtle motion keeps the hero and model presentation alive.</p></article>
    </div>
   </section>

   <section id="technology" className="technology">
    <p className="eyebrow">03 · TECHNOLOGY</p><h2>Built for modern <span>Web3D.</span></h2>
    <div className="techs"><div>React</div><div>Vite</div><div>Three.js</div><div>React Three Fiber</div><div>React Three Drei</div><div>WebGL</div></div>
   </section>

   <section id="about" className="about">
    <div><p className="eyebrow">04 · ABOUT THE EXPERIENCE</p><h2>A 3D asset should be part of the story.</h2></div>
    <p>The layout combines a focused product narrative with a live 3D viewer, giving the model a clear purpose inside the page. The interface is designed to remain usable even on smaller screens.</p>
   </section>
  </main>
  <footer>© 2026 NEXORA · Algoryx Internship — Task 3</footer>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
