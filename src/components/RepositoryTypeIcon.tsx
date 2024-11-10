import {RepositoryTypes} from "../DTOs.ts";
import {SiApachemaven, SiNuget} from "react-icons/si";
import {FaDocker, FaNpm} from "react-icons/fa";

interface RepositoryTypeIconProps {
    type: RepositoryTypes;
}

export default function RepositoryTypeIcon({ type }: Readonly<RepositoryTypeIconProps>) {

    const icon = () => {
        switch(type) {
            case "MAVEN": return <SiApachemaven />;
            case "NPM": return <FaNpm color="red" />;
            case "DOCKER": return <FaDocker />;
            case "NUGET": return <SiNuget />;
        }
    }

    return (
        <>{icon()}</>
    );
}
