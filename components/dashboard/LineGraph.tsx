import dayjs from "dayjs";

export type Point = {
    x: number;
    y: number;
};

const getInterval = (maxValue: number, marks = 1) => {
    for (let i = 1; i < 10; i++) {
        const base = Math.pow(10, i);
        if (maxValue < base) return Math.round(base / marks);
        const sub = Math.pow(10, i - 1);
        for (let j = 0; j < 10; j++) {
            const val = base + sub * j;
            if (maxValue < val) return Math.round(val / marks);
        }
        for (let j = 0; j < 10; j++) {
            const val = base + base * j;
            if (maxValue < val) return Math.round(val / marks);
        }
    }
    return Math.round(maxValue / marks);
};

export const ceilMaxValue = (maxValue: number): number => {
    const interval = getInterval(maxValue);
    const newMax = Math.ceil(maxValue / interval) * interval;
    return newMax;
};

export const drawMarksY = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    maxValue: number
): void => {
    if (!ctx) return;

    const drawLine = (amount: string | number, y: number) => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        ctx.fillText(String(amount), 0, y);
    };

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#FFF";
    const interval = getInterval(maxValue, 10);
    const max = Math.ceil(maxValue / interval) * interval;

    for (let i = 0; i <= max; i += interval) {
        drawLine(i, height - height * (i / max));
    }
};

export const drawMarksX = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    minTimestamp: number,
    maxTimestamp: number
): void => {
    if (!ctx) return;

    const drawLine = (amount: string | number, x: number) => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.fillText(String(amount), x, 0);
    };

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#FFF";

    const startMonth = dayjs(minTimestamp).startOf("month");
    const endMonth = dayjs(maxTimestamp).startOf("month").add(1, "month");
    const diff = endMonth.diff(startMonth, "month");
    for (let i = 0; i <= diff; i++) {
        const month = dayjs(startMonth).add(i, "month");
        const ts = month.valueOf();
        drawLine(
            month.format("MMM YY"),
            (width * (ts - minTimestamp)) / (maxTimestamp - minTimestamp)
        );
    }
};

export const drawLineGraph = (
    canvas: HTMLCanvasElement,
    pointSets: Point[][],
    labels?: string[]
): void => {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    //Remap the data into one that's more useful for drawing one line per player
    const xRange = {
        min: pointSets[0][0].x,
        max: pointSets[0][0].x,
    };
    const yRange = {
        min: pointSets[0][0].y,
        max: pointSets[0][0].y,
    };
    pointSets.forEach(points => {
        points.forEach(point => {
            xRange.max = Math.max(xRange.max, point.x);
            xRange.min = Math.min(xRange.min, point.x);
            yRange.max = Math.max(yRange.max, point.y);
            yRange.min = Math.min(yRange.min, point.y);
        });
    });
    yRange.max = ceilMaxValue(yRange.max);
    yRange.min = 0;

    const mapPoint = (point: Point) => ({
        x: ((point.x - xRange.min) / (xRange.max - xRange.min)) * width,
        y: height - ((point.y - yRange.min) / (yRange.max - yRange.min)) * height,
    });

    //Draw the horizontal lines for the y-axis scale
    drawMarksY(ctx, width, height, yRange.max);
    drawMarksX(ctx, width, height, xRange.min, xRange.max);

    //Draw the lines
    ctx.lineWidth = 3;
    pointSets.forEach((points, i) => {
        ctx.strokeStyle = `hsl(${Math.round((360 * i) / pointSets.length)}, 100%, 50%)`;
        ctx.beginPath();
        let canvasPoint = mapPoint(points[0]);
        ctx.moveTo(canvasPoint.x, canvasPoint.y);
        points.forEach((point, index) => {
            if (index === 0) return;
            canvasPoint = mapPoint(point);
            ctx.lineTo(canvasPoint.x, canvasPoint.y);
        });
        ctx.stroke();
    });

    if (labels) {
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.font = "12px sans-serif";
        labels.forEach((label, i) => {
            if (!pointSets[i]) return;
            const point = mapPoint(pointSets[i].slice(-1)[0]);
            ctx.fillStyle = `hsl(${Math.round((360 * i) / pointSets.length)}, 100%, 50%)`;
            ctx.fillText(label, point.x - 10, point.y - 10);
        });
    }
};
