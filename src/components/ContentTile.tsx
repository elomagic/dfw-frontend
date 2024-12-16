import * as React from "react";

interface ContentTileProps {
    children: React.ReactNode;
}

export function ContentTile({ children }: Readonly<ContentTileProps>) {

    return (
        <div style={{ margin: "1em", display: "flex", flexDirection: "column", width: "100%" }}>
            {children}
        </div>
    );

}