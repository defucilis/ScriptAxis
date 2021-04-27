import React, { useEffect, useRef } from "react";

import { Funscript } from "funscript-utils/lib/types";
import { renderHeatmap, HeatmapOptions } from "funscript-utils/lib/funMapper";

const FunscriptHeatmap = ({
    funscript,
    width,
    height,
    options,
}: {
    funscript: Funscript;
    width: number;
    height: number;
    options?: HeatmapOptions;
}): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        if (canvasRef.current) {
            if (funscript) {
                if (options) renderHeatmap(canvasRef.current, funscript, options);
                else renderHeatmap(canvasRef.current, funscript);
            } else {
                canvasRef.current.getContext("2d").clearRect(0, 0, width, height);
            }
        }
    }, [funscript, height, width, options]);

    return (
        <div
            style={{
                position: "relative",
                width: { width } + "px",
                height: { height } + "px",
            }}
        >
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </div>
    );
};

export default FunscriptHeatmap;
