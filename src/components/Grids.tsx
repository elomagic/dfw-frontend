import {CSSProperties, ReactNode} from "react";

export declare type GridSize = number;

interface GridProps {
    style?: CSSProperties;
    children?: ReactNode;
}

export function Grid({ style, children }: Readonly<GridProps>) {

    return (
        <div className="grid grid-cols-12 gap-4" style={{ width: "100%", marginTop: 2, marginBottom: 2, ...style }}>
            {children}
        </div>
    );

}

interface GridItemProps {
    style?: CSSProperties;
    size?: GridSize;
    children?: ReactNode;
}

export function GridItem({ style, size, children }: Readonly<GridItemProps>) {

    return (
        <div className={`col-span-${size}`} style={style}>
            {children}
        </div>
    );

}