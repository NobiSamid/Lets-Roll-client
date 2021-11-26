import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles(theme => ({
    dialog: {
        // padding: theme.spacing(2),
        position: 'absolute'
        // top: theme.spacing(5)
    },
    dialogContent:{
        textAlign:'center'
    },
    dialogAction:{
        justifyContent:'center'
    }
}))

export default function ConfirmDialog(props) {
    const { confirmDelete, setConfirmDelete } = props;
    const classes = useStyles();
    return (
        <Dialog open={confirmDelete?.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle>
                <Typography>{confirmDelete?.title}</Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography>{confirmDelete?.subTitle}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button 
                onClick={()=>setConfirmDelete({...confirmDelete, isOpen:false})}
                >Disagree</Button>
                <Button onClick={confirmDelete.onConfirm} autoFocus style={{color:'red'}}>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
