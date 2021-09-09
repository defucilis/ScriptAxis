import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ceilMaxValue, drawLineGraph, drawMarksY, Point } from "./LineGraph";

import style from "./AdminDashboard.module.scss";

export interface ViewRecord {
    timestamp: number;
    totalCount: number;
    categoryCounts: { [key: string]: number };
}

const map = (val: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
    return ((val - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
};

const drawViewBreakdown = (canvas: HTMLCanvasElement, counts: { [key: string]: number }) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    let max = 0;
    Object.keys(counts).forEach(key => {
        max = Math.max(max, counts[key]);
    });
    max = ceilMaxValue(max);

    ctx.clearRect(0, 0, width, height);

    drawMarksY(ctx, width, height, max);

    const rectWidth = width / Object.keys(counts).length;

    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.font = "12px sans-serif";

    Object.keys(counts).forEach((key, i) => {
        ctx.fillStyle = `hsl(${Math.round((360 * i) / Object.keys(counts).length)}, 100%, 50%)`;
        const rectHeight = map(counts[key], 0, max, 0, height);
        ctx.fillRect(i * rectWidth, height - rectHeight, rectWidth, rectHeight);
        ctx.fillText(key, i * rectWidth + rectWidth / 2, height - rectHeight - 5);
    });
};

const AdminDashboard = (): JSX.Element => {
    const [records, setRecords] = useState<ViewRecord[]>([]);
    const totalViewsCanvas = useRef<HTMLCanvasElement>(null);
    const totalCountsCanvas = useRef<HTMLCanvasElement>(null);
    const categoryCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const getData = async () => {
            const data = (
                await axios(`${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/viewRecords.json`)
            ).data;
            setRecords(Object.keys(data).map(key => data[key]));
        };

        getData();
    }, []);

    useEffect(() => {
        console.log(totalViewsCanvas.current, totalCountsCanvas.current, categoryCanvas.current);
        if (!records || records.length === 0) return;
        if (!totalViewsCanvas.current || !totalCountsCanvas.current || !categoryCanvas.current)
            return;

        drawLineGraph(totalViewsCanvas.current, [
            records.map(record => {
                return {
                    x: record.timestamp,
                    y: record.totalCount,
                };
            }),
        ]);

        const recordCounts: { [key: string]: Point[] } = {};
        records.forEach(record => {
            Object.keys(record.categoryCounts).forEach(category => {
                if (!recordCounts[category]) recordCounts[category] = [];
                recordCounts[category].push({
                    x: record.timestamp,
                    y: record.categoryCounts[category],
                });
            });
        });
        drawLineGraph(
            totalCountsCanvas.current,
            Object.keys(recordCounts).map(record => recordCounts[record]),
            Object.keys(recordCounts)
        );

        drawViewBreakdown(categoryCanvas.current, records[records.length - 1].categoryCounts);
    }, [records, totalViewsCanvas, totalCountsCanvas, categoryCanvas]);

    return (
        <div className={style.graphGrid}>
            <div>
                <h3>Total Views</h3>
                <canvas ref={totalViewsCanvas} width={500} height={500} />
            </div>
            <div>
                <h3>Category Popularity</h3>
                <canvas ref={totalCountsCanvas} width={500} height={500} />
            </div>
            <div>
                <h3>Total Category Views</h3>
                <canvas ref={categoryCanvas} width={500} height={500} />
            </div>
            {/*             
            {records.map(record => {
                return (
                    <div key={record.timestamp}>
                        <h3>{new Date(record.timestamp).toLocaleString()}</h3>
                        <p>Total Count: {record.totalCount}</p>
                        <ul>
                            {Object.keys(record.categoryCounts).map(key => {
                                return (
                                    <li key={key}>{key}: {record.categoryCounts[key]}</li>
                                );
                            })}
                        </ul>
                    </div>
                )
            })} */}
        </div>
    );
};

export default AdminDashboard;
