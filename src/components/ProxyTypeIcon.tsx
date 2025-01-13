import {ProxyType} from "../DTOs.ts";
import {SiApachemaven, SiNuget} from "react-icons/si";
import {FaDocker, FaNpm} from "react-icons/fa";

export default function ProxyTypeIcon({ type }: Readonly<{ type: ProxyType }>) {

    const icon = () => {
        switch(type) {
            case "MAVEN": return <SiApachemaven color="#b71c1c" size="1.5em" />;
            case "NPM": return <FaNpm color="#cb3837" size="1.5em" />;
            case "DOCKER": return <FaDocker color="#0db7ed" size="1.5em" />;
            case "NUGET": return <SiNuget color="#0db7ed" size="1.5em" />;
        }
    }

    return (
        <>{icon()}</>
    );
}
