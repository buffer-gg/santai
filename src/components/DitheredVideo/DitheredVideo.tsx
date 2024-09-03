"use client"

import { useEffect } from "react"

export default function DitheredVideo() {
        useEffect(() => {
            // JS to detect preview
    
            const isPreview = location.href.includes('fullcpgrid');
            const previewContainer = document.querySelector('.container--preview');
            const noPreviewContainer = document.querySelector('.container--no-preview');
    
            if (isPreview) {
                noPreviewContainer.style.display = "none";
            } else {
                previewContainer.style.display = "none";
            }
    
            // JS to keep dither from breaking at different pixel ratios
    
            const ditherImages = document.querySelectorAll('.ditherImage');
    
            function setDitherImageSizesToPixelRatio() {
            let size = 8 / window.devicePixelRatio * (isPreview ? 2 : 1);
            console.log('new size ', size);
            Array.from(ditherImages).forEach(img => {
                img.setAttribute('width', size);
                img.setAttribute('height', size);
            })
            }
    
            setDitherImageSizesToPixelRatio();
            window.addEventListener("resize", setDitherImageSizesToPixelRatio);
        }, [])
        return (
            <div className="h-full w-full">
                <div className="container container--preview">
                    <img className="video" src="https://assets.codepen.io/108721/left.gif" alt=""/>
                    {/* <img className="video-right" src="https://assets.codepen.io/108721/right.gif" alt=""/> */}
                </div>
                <div className="container container--no-preview justify-center">
                <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" width="900" height="150" className="z-[2] h-[16rem] w-[32rem] absolute opacity-80 top-8">
                    <defs>
                        <image  width="41" height="34" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAiCAMAAAD1eQAHAAAAAXNSR0IB2cksfwAAAblQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsVsYBQAAAJN0Uk5TABW65EwEHYD//b46yDhj58YvIbfKDez1SKn7dwehmAZL8l5+pRfpKubvLRK4kvR7bvqWCOMkWcwWGeoY0e5iA196uWQU2P5YAWbrxDPo8fwFENv2Vb1smT7VNDzPLhFC+Ck14B+IpytHwmsLpofhN1f53Ms2SQy0cht0q5MPWvMc1w6RjXYCZ8MiQLU9l2qqyVYsAxqzaAAAAlpJREFUeJxtlG1IU2EUx88xZdJIY6l0aTMya7Qg/eBCao1A6QVDHBkMB0bBFuiHhCQoEepLEkIgEYlfAo0sWShUMgmE+hCDzYEShqFrxgZjqzV6GamB3Zdt939198s55//8uM//Oc8Lk/oxM2nLdSzVtKSINVxGz/yrIFnGa0CWsswmC5Bc+RPAco4LnKI9HN1OmpIAUhVzXAwCh7eSJdUxBI38pearlGzULm0h9aYIgAdEk8vKeG08qSHZ8AfAwzxfn0hl8+8xDWmq+ASkRSQ/5gqhIgDk8QU0WSfOHVLL4t3RPHmSgwBaRdAPtcEcXs2SjTs/wACfSM81M78H2wL7FPJ8HE02RMTJymyzIDUlAjJ5gd+CemZJbmD9/hkQi5unRNLB06C1sFeOladf4SJbJ4jPJRbRZOvynJI5eRL06oZn7Pr7BpR2HstmbWlcPxW182V+joYuPcmlV8c3YcAlnnL3GAjUObOqJNde/gbZWTrMdNS+gr2zhX1S7ObPoJL7odSlK7tGQGsxDkmhhx+D2LX2SO5811QK1G6vOH9vDFfu0Q0qe3STh9Bqz9Oocd88CAbbBGVPyK2I5g/8rzyIJm8sTuZI2puGgV7xLN1Hk99GKU+S53XeqiddwwMA2usGCUiH/0fOlN0yGgXQebCfkCRnSL6KdORi0OoLAKnfTGnJe3xXjnfWdRk0aQ3lrqL6Mngk3y7zbFM/mjQLt7eRDtMInT013tEHIPWF8v2DF+yBNzTwzn8ITep2qLsHZJul6sWCwwug69h1KkRSY8d0IIOH0j28oRb/AVC5pOXC40muAAAAAElFTkSuQmCC"/>
                        <image  width="608" height="104" id="img2" href="data:image/png;base64,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"/>
                    </defs>
                    <style>
                    </style>
                    <use id="Puck Black" href="#img1" x="673" y="150"/>
                    <use id="SANTAI." href="#img2" x="59" y="81"/>
                    <g id="Folder 1">
                        <path id="G" className="s0" d="m768.9 185h-37.3q-3.6 0-6.6-1.8-3-1.7-4.8-4.7-1.7-3-1.7-6.6v-37.5q0-3.6 1.7-6.5 1.8-3 4.8-4.8 3-1.7 6.6-1.7h37.3q3.7 0 6.6 1.7 3 1.8 4.7 4.8 1.9 2.9 1.9 6.5v6.1h-13.9v-5.3h-36v36h36v-9.5h-13.8v-13.8h27.7v24q0 3.6-1.9 6.6-1.7 3-4.7 4.7-2.9 1.8-6.6 1.8z"/>
                        <path id="G copy" className="s0" d="m837.8 185h-37.4q-3.5 0-6.5-1.8-3-1.7-4.8-4.7-1.8-3-1.8-6.6v-37.5q0-3.6 1.8-6.5 1.8-3 4.8-4.8 3-1.7 6.5-1.7h37.4q3.6 0 6.5 1.7 3 1.8 4.8 4.8 1.9 2.9 1.9 6.5v6.1h-13.9v-5.3h-36.1v36h36.1v-9.5h-13.8v-13.8h27.7v24q0 3.6-1.9 6.6-1.8 3-4.8 4.7-2.9 1.8-6.5 1.8z"/>
                    </g>
                </svg>
                    <video className="video" loop autoPlay muted preload="none" poster="https://assets.codepen.io/108721/videoframe_0.png">
                        <source src="http://localhost:3000/herovid.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    {/* <video className="video-right" loop autoPlay muted preload="none" poster="https://assets.codepen.io/108721/videoframe_0+%281%29.png">
                        <source src="https://videos.pexels.com/video-files/14952031/14952031-sd_960_540_30fps.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video> */}
                </div>
                <svg className="overflow-hidden">
                    <filter id="filter1" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
                        <feFlood floodColor="#000000" floodOpacity="0.50" x="0%" y="0%" result="flood"/>
                        <feBlend mode="normal" x="0%" y="0%" in="SourceGraphic" in2="flood" result="blend1"/>
                        <feImage className="ditherImage" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA5ElEQVQYlQXBgQbCUABA0fdrk0ySSZJJkiRJMjOTTGZmkiRJZiYzyczMzGQmfdrtHPH7/TgcDuR5zna7pWka9vs9aZqyXq8R0+mU5/OJoihcLhfG4zFBENDtdjmdToj3+81yueTz+WCaJnEcM5/PKcsSXdcRsizjeR6j0YjH40Gr1cJxHAaDAbfbDVHXNbvdjiRJWK1WfL9fLMsiyzI2mw1CVVV836fT6XA8HplMJoRhSK/X43w+I6IoYjabURQFmqbxer1YLBZUVYVhGAhJkrBtm36/z/V6pd1u47ouw+GQ+/3OH4/Fn8FvF/NxAAAAAElFTkSuQmCC" x="0" y="0" width="4" height="4" crossOrigin="anonymous" result="image1"/>
                        <feTile x="0" y="0"  in="image1" result="tile"/>
                        <feBlend mode="overlay" x="0%" y="0%"  in="blend1" in2="tile" result="blend2"/>
                        <feColorMatrix type="saturate" values="0"/>
                        <feComponentTransfer>
                            <feFuncR type="discrete" tableValues="0 0"/>
                            <feFuncG type="discrete" tableValues="0 1"/>
                            <feFuncB type="discrete" tableValues="0 1"/>
                        </feComponentTransfer>
                    </filter>
                    <filter id="filter2" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
                        <feFlood floodColor="#000000" floodOpacity="0.50" x="0%" y="0%" result="flood"/>
                        <feBlend mode="normal" x="0%" y="0%" in="SourceGraphic" in2="flood" result="blend1"/>
                        <feImage className="ditherImage" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA5ElEQVQYlQXBgQbCUABA0fdrk0ySSZJJkiRJMjOTTGZmkiRJZiYzyczMzGQmfdrtHPH7/TgcDuR5zna7pWka9vs9aZqyXq8R0+mU5/OJoihcLhfG4zFBENDtdjmdToj3+81yueTz+WCaJnEcM5/PKcsSXdcRsizjeR6j0YjH40Gr1cJxHAaDAbfbDVHXNbvdjiRJWK1WfL9fLMsiyzI2mw1CVVV836fT6XA8HplMJoRhSK/X43w+I6IoYjabURQFmqbxer1YLBZUVYVhGAhJkrBtm36/z/V6pd1u47ouw+GQ+/3OH4/Fn8FvF/NxAAAAAElFTkSuQmCC" x="0" y="0" width="4" height="4" crossOrigin="anonymous" result="image1"/>
                        <feTile x="0" y="0"  in="image1" result="tile"/>
                        <feBlend mode="overlay" x="0%" y="0%"  in="blend1" in2="tile" result="blend2"/>
                        <feColorMatrix type="saturate" values="0"/>
                        <feComponentTransfer>
                            <feFuncR type="discrete" tableValues="0 0.5 1"/>
                            <feFuncG type="discrete" tableValues="0 0"/>
                            <feFuncB type="discrete" tableValues="0 0"/>
                        </feComponentTransfer>
                    </filter>
                </svg>
            </div>  
        )
}