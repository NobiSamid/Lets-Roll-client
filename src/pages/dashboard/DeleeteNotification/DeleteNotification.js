
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    dialog: {
        // padding: theme.spacing(2),
        position: 'absolute'
        // top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    }
}))

export default function DeleteNotification(props) {
    const classes = useStyles();
    const { deleteNotification, setDeleteNotification } = props;
    return (
        <Dialog open={deleteNotification?.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle>
                <Typography>{deleteNotification?.title}</Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography>{deleteNotification?.subTitle}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    onClick={()=>setDeleteNotification({...deleteNotification, isOpen:false})}
                >Ok</Button>
            </DialogActions>
        </Dialog>
    )
}
