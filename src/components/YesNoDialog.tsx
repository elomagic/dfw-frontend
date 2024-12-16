import {useTranslation} from "react-i18next";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../components/ui/dialog.tsx";
import {Button} from "../components/ui/button.tsx";

interface YesNoDialogProps {
    title: string;
    text: string;
    captionYes?: string;
    captionNo?: string;
    open: boolean;
    onYesClick: () => void;
    onNoClick: () => void;
}

const YesNoDialog = ({
                         title,
                         text,
                         captionYes,
                         captionNo,
                         open,
                         onYesClick,
                         onNoClick
}: Readonly<YesNoDialogProps>) => {

    const { t } = useTranslation();

    return (
        <Dialog open={open} onOpenChange={(s) => !s && onNoClick}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription id="yes-no-dialog-description">{text}</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button onClick={onNoClick}>{captionNo ?? t("cancel")}</Button>
                    <Button onClick={onYesClick}>{captionYes ?? t("yes")}</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
};

export default YesNoDialog;