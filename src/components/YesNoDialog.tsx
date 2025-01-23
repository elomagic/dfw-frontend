"use client"

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Slide,
} from '@mui/material';
import {TransitionProps} from "@mui/material/transitions";
import {forwardRef, ReactElement, Ref} from "react";
import {useTranslation} from "react-i18next";

interface ComponentProps {
    title: string;
    text: string;
    captionYes?: string;
    captionNo?: string;
    open: boolean;
    onYesClick: () => void;
    onNoClick: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props}/>;
});

export const YesNoDialog = ({
                                                              title,
                                                              text,
                                                              captionYes,
                                                              captionNo,
                                                              open,
                                                              onYesClick,
                                                              onNoClick,
                                                          }: Readonly<ComponentProps>) => {

    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onNoClick} TransitionComponent={Transition} keepMounted>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="yes-no-dialog-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onNoClick}>{captionNo ?? t("cancel")}</Button>
                <Button onClick={onYesClick}>{captionYes ?? t("yes")}</Button>
            </DialogActions>
        </Dialog>
    );
};
