"use client"

import {ProxyType} from "../DTOs.ts";
import {SiApachemaven, SiNuget} from "react-icons/si";
import {FaDocker, FaNpm} from "react-icons/fa";

export const ProxyTypeIcon = ({ type }: Readonly<{ type: ProxyType }>) => {

    const icon = () => {
        switch(type) {
            case "MAVEN": return <SiApachemaven color="#b71c1c" style={{ verticalAlign: "inherit"}} size="1.5em" />;
            case "NPM": return <FaNpm color="#cb3837" style={{ verticalAlign: "inherit"}} size="1.5em" />;
            case "DOCKER": return <FaDocker color="#0db7ed" style={{ verticalAlign: "inherit"}} size="1.5em" />;
            case "NUGET": return <SiNuget color="#0db7ed" style={{ verticalAlign: "inherit"}} size="1.5em" />;
        }
    }

    return (
        <>{icon()}</>
    );

}
