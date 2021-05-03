import React from 'react'


interface CanvasProps{
    className?: string;
}


const Canvas:React.FC<CanvasProps> = ({className}) => {
    return (
        <div className={`h-full w-full ${className}`}>
            Canvas
        </div>
    )
}

export { Canvas }
