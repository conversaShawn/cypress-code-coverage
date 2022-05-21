import React from "react";

export default function MapPoints() {
    const points = [100, 200, 300, 400, 500]
    return ( 
        <div>
            {points.map(p => <div>{p}</div>)}
        </div>
    );
}
