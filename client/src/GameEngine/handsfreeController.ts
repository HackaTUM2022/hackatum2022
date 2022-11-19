export interface PlayerPostionData {
    x: number;
    y: number;
    landmarks: {
        nose: {
            x: number;
            y: number;
        };
        shoulders: {
            left: {
                x: number;
                y: number;
            };
            right: {
                x: number;
                y: number;
            };
        };
        elbows: {
            left: {
                x: number;
                y: number;
            };
            right: {
                x: number;
                y: number;
            };
        };
        wrists: {
            left: {
                x: number;
                y: number;
            };
            right: {
                x: number;
                y: number;
            };
        };
        hips: {
            left: {
                x: number;
                y: number;
            };
            right: {
                x: number;
                y: number;
            };
        };
    };
}

export function getPlayerPostionData(): PlayerPostionData {
    const poseLandmarks = (window as any).handsfree?.data?.pose?.poseLandmarks;
    return {
        x: 1 - poseLandmarks?.[0]?.x,
        y: poseLandmarks?.[0]?.y,
        landmarks: {
            nose: {
                x: 1 - poseLandmarks?.[0]?.x,
                y: poseLandmarks?.[0]?.y,
            },
            shoulders: {
                left: {
                    x: 1 - poseLandmarks?.[11]?.x,
                    y: poseLandmarks?.[11]?.y,
                },
                right: {
                    x: 1 - poseLandmarks?.[12]?.x,
                    y: poseLandmarks?.[12]?.y,
                },
            },
            elbows: {
                left: {
                    x: 1 - poseLandmarks?.[13]?.x,
                    y: poseLandmarks?.[13]?.y,
                },
                right: {
                    x: 1 - poseLandmarks?.[14]?.x,
                    y: poseLandmarks?.[14]?.y,
                },
            },
            wrists: {
                left: {
                    x: 1 - poseLandmarks?.[15]?.x,
                    y: poseLandmarks?.[15]?.y,
                },
                right: {
                    x: 1 - poseLandmarks?.[16]?.x,
                    y: poseLandmarks?.[16]?.y,
                },
            },
            hips: {
                left: {
                    x: 1 - poseLandmarks?.[23]?.x,
                    y: poseLandmarks?.[23]?.y,
                },
                right: {
                    x: 1 - poseLandmarks?.[24]?.x,
                    y: poseLandmarks?.[24]?.y,
                },
            },
        },
    };
}
