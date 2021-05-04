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


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.border = "1px solid black";
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const context = canvas.getContext('2d');
            contextRef.current = context;
        }
   },[])

    useEffect(() => {
        if (contextRef.current !== null) {
            contextRef.current.fillStyle = backgroundColor;
            contextRef.current.fillRect(0, 0, canvasRef.current?.offsetWidth??200, canvasRef?.current?.offsetHeight??200);
            contextRef.current.strokeStyle =strokeColor;
            contextRef.current.lineWidth = lineWidth;
            }
      },[lineWidth, strokeColor, backgroundColor])
  
    
    const clearCanvas = () => {
        if (contextRef.current !== null) {
            contextRef.current.clearRect(0, 0, canvasRef.current?.offsetWidth??200, canvasRef.current?.offsetHeight??200); 
        }
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
            <button onClick={ clearCanvas}> Clear</button>
            </>
    )
}

export { Canvas }
