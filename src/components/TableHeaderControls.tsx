import {useAuth} from "../auth/useAuth.ts";
import {Role} from "../auth/Auth.tsx";
import {Button} from "../components/ui/button.tsx";
import {IoMdAddCircleOutline, IoMdRefresh} from "react-icons/io";
import {Input} from "../components/ui/input.tsx";

interface TableHeaderControlsProps {
    createCaption?: string;
    onCreateClicked?: () => void;
    onFilterChanged: (filter: string) => void;
    onRefresh: () => void;
    role?: Role;
}

export default function TableHeaderControls({ createCaption, role, onCreateClicked, onFilterChanged, onRefresh }: Readonly<TableHeaderControlsProps>) {

    const auth = useAuth();

    return (
        <div style={{display: "flex", flexDirection: "row", marginBottom: 2}} >
            {(role === undefined || auth.roles.includes(role)) && onCreateClicked &&
                <Button variant="outline" onClick={onCreateClicked} size="sm">
                    <IoMdAddCircleOutline/>
                    {createCaption}
                </Button>
            }

            <div style={{flexGrow: 1}} />

            {onFilterChanged &&
                <Input onChange={e => {onFilterChanged(e.target.value)}} />
            }
            <Button size="icon" aria-label="refresh" onClick={onRefresh}><IoMdRefresh/></Button>
        </div>
    );
}
