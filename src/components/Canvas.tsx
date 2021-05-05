import React, {useRef, useEffect, useState} from 'react'


interface CanvasProps{
    className?: string;
    lineWidth?: number;
    strokeColor?: string;
    backgroundColor?: string;
}


const Canvas: React.FC<CanvasProps> = ({className, lineWidth=5,strokeColor="black", backgroundColor="white", children}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D|null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [height, setHeight] = useState<number|null>(null);
    const [width, setWidth] = useState<number|null>(null);
    const [pixelHistogram, setPixelHistogram] = useState<number[]|null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.border = "1px solid gray";
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const context = canvas.getContext('2d');
            contextRef.current = context;
            setHeight(canvas.width);
            setWidth(canvas.width);
        }
   },[])

    useEffect(() => {
        if (contextRef.current !== null) {
            contextRef.current.fillStyle = backgroundColor;
            contextRef.current.fillRect(0, 0, width??200, height??200);
            contextRef.current.strokeStyle =strokeColor;
            contextRef.current.lineWidth = lineWidth;
            }
      },[lineWidth, strokeColor, backgroundColor, height, width])
  
    
    const clearCanvas = () => {
        if (contextRef.current !== null) {
            contextRef.current.clearRect(0, 0, width??200, height??200); 
        }
    }
    
    const formHistogram = () => {
        const imgData = contextRef.current?.getImageData(0, 0, width ?? 200, height ?? 200).data;
        const array: number[] = new Array(256).fill(0);
        imgData?.forEach((data) => {
            array[data]++;
        })
        setPixelHistogram(current=>array)
    }
    
    const isEmpty = () => {
        if (!pixelHistogram) {
            return true;
        }
      
        return pixelHistogram.some(pixel => {
            
        });
    }

    const startDrawing = (mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (contextRef.current !== null) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(mouseEvent.nativeEvent.clientX, mouseEvent.nativeEvent.clientY);
            setIsDrawing(true);
        }
    }
    
    const startDrawingTouch = (touchEvent: React.TouchEvent<HTMLCanvasElement>) => {
        if (contextRef.current !== null) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
            setIsDrawing(true);
        }

    }


    const finishDrawing = (mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        contextRef.current?.closePath();
        setIsDrawing(false);
        formHistogram();
    }

    const finishDrawingTouch = (touchEvent: React.TouchEvent<HTMLCanvasElement>) => {
        contextRef.current?.closePath();
        setIsDrawing(false);
        
    }

    const draw = (mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing) {
            return;
        }
        const {offsetX, offsetY } = mouseEvent.nativeEvent;
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    }
    
    const drawTouch = (touchEvent: React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
        const {clientX, clientY } = touchEvent.touches[0];
        contextRef.current?.lineTo(clientX, clientY);
        contextRef.current?.stroke();
    }

   
    return (
        <>
        <canvas ref={canvasRef} onMouseDown={startDrawing} onTouchStart={startDrawingTouch} onTouchEnd={finishDrawingTouch} onTouchMove={drawTouch} onMouseUp={finishDrawing} onMouseMove={draw} className={className} />
            <button onClick={clearCanvas}> Clear</button>
            <button onClick={()=>console.log(isEmpty())}>Check if Empty</button>
        </>
    )
}

export { Canvas }
