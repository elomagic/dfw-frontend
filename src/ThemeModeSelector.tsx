import {Button} from "./components/ui/button.tsx";
import {ImBrightnessContrast} from "react-icons/im";
import {useState} from "react";

export default function ModeSwitcher() {

    const [ mode, setMode ] = useState<string>("dark");

    return (
        <div>
            <Button
                size="icon"
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            >
                <ImBrightnessContrast/>
            </Button>
        </div>
    );

};