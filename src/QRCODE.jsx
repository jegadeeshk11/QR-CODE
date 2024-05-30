import React, { useState } from 'react'
//  import QRimg from '../src/images/qr.png'
function QRCODE() {

const[img,setimg]=useState("")
const[loading,setloading]=useState("false")
const[qrcode,setqrcode]=useState("")
const[qrsize,setqrsize]=useState()

async function generateQR(){
  setloading(true)
  try {
    const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}*${qrsize}&data=${encodeURIComponent(qrcode)}`
    setimg(url)
  } catch (error) {
    console.log("qr-code error-",error)
  }finally{
    setloading(false)
  }
}

function downloadqr(){
fetch(img)
.then((response)=>response.blob())
.then((blob) =>{
  const link =document.createElement("a")
  link.href =URL.createObjectURL(blob)
  link.download="qrcode.png"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}).catch((error)=>{
  console.log("error:", error);
})
}


  return (
 <section className='box-border font-serif w-full h-lvh flex flex-col items-center justify-center  bg-yellow-400'>
    <h1  className='font-semibold'>QR CODE GENERATOR</h1>
   {loading && <p>Loading Please wait..</p>}
    {img &&<img src={img} alt="qr-code" className="p-8 shadow-black" />}

    <div >
        <label htmlFor="datainput " className='block my-px  text-blue-500 text-base font-normal'>  Data for QR code:</label>
        <input type="text" id="datainput" placeholder="Enter data for QR code " className="indata" value={qrcode} onChange={(e)=>setqrcode(e.target.value)} />
        <label htmlFor="sizeinput" className='block my-px text-blue-500 text-base font-normal'> Image size (eg:150):</label>
        <input type="text" id="sizeinput" placeholder="Enter image size" className="indata" value={qrsize} onChange={(e)=> setqrsize(e.target.value)}/>
        
        <button  type="button" onClick={generateQR}   className="text-white generate bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate QR Code</button>
        <button  type="button" onClick={downloadqr} class="text-white download bg-blue-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download Qr Code</button>
      
    </div>
   
 </section>
  )
}

export default QRCODE