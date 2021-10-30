import React from "react"
import {Avatar, CssBaseline, Grid, Typography, Container, List, ListItem, CircularProgress, ListItemText, ListItemAvatar} from "@material-ui/core"
import LocalPhoneIcon from "@material-ui/icons/LocalPhone"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import AddIcon from "@material-ui/icons/AddCircle"
import { makeStyles, styled } from "@material-ui/core/styles"
import Snackbar from "./layout/SnackBar"
import PhoneNumberDialog from "./PhoneNumberDialog"
import * as api from "../api"
import { GetPhoneNumberResponse, PhoneNumberRequestBody } from "../models"

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: 60,
        height: 60
    },
    addIcon: {
        marginTop: 27,
        color: theme.palette.secondary.main,
        width: 50,
        height: 50,
        cursor: "pointer",
        float: "right"
    },
    actionIcons: {
        marginTop: 30,
        width: 30,
        height: 30,
        cursor: "pointer",
        float: "right"
    },
    spinner: {
        color: theme.palette.secondary.main,
    }
}))

const PhoneNumbers = () => {

    const classes = useStyles()
    const [phoneNumbers, setPhoneNumbers] = React.useState<GetPhoneNumberResponse[]>([])
    const [phoneNumber, setPhoneNumber] = React.useState<GetPhoneNumberResponse>({ __v: 0, _id: "", phone: "" })
    const [loading, setLoading] = React.useState<boolean>(true)
    const [openAddEditDialog, setOpenAddEditDialog] = React.useState<boolean>(false)
    const [isEdit, setIsEdit] = React.useState<boolean>(false)
    const [isErr, setIsErr] = React.useState<boolean>(false)
    const [snackMessage, setSnackMessage] = React.useState<{ open: boolean; type: string; text: string }>()
   
    const Paper = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        boxShadow: "2px 2px 2px 2px grey",
        borderRadius: "10px",
        marginTop: 10
    }))

    React.useEffect(() => {
        api.getPhoneNumbers().then((res) => {
            setLoading(false)
            setPhoneNumbers(res as GetPhoneNumberResponse[])
        })
    },[loading])

    const addOrUpdatePhoneNumber = (phoneNumber: PhoneNumberRequestBody, phoneId?: string) => {
        setSnackMessage({ open: false, type: "", text: "" })
        if (!phoneNumber.phone.length) {
            setIsErr(true)
            return
        }
        if (!isErr) {
            if (phoneId) {
                api.updatePhoneNumber(phoneId, phoneNumber).then((res) => {
                    if (res.status === 200) {
                        setIsEdit(false)
                        setOpenAddEditDialog(false)
                        setPhoneNumber({ __v: 0, _id: "", phone: "" })
                        setIsErr(false)
                        setLoading(true)
                        setSnackMessage({ open: true, type: "success", text: res.message })
                    } else {
                        setSnackMessage({ open: true, type: "error", text: res.message })
                    }
                })
            } else {
                api.addPhoneNumber(phoneNumber).then((res) => {
                    if (res.status === 200) {
                        setIsEdit(false)
                        setOpenAddEditDialog(false)
                        setPhoneNumber({ __v: 0, _id: "", phone: "" })
                        setIsErr(false)
                        setLoading(true)
                        setSnackMessage({ open: true, type: "success", text: res.message })
                    } else {
                        setSnackMessage({ open: true, type: "error", text: res.message })
                    }
                })
            }
        }
    }

    const deletePhoneNumber = (phoneId: string, phoneNumber: PhoneNumberRequestBody) => {
        setSnackMessage({ open: false, type: "", text: "" })
        api.deletePhoneNumber(phoneId, phoneNumber).then((res) => {
            if (res.status === 200) {
                setLoading(true)
                setSnackMessage({ open: true, type: "success", text: res.message })
            } else {
                setSnackMessage({ open: true, type: "error", text: res.message })
            }
        })
    }
    

    return (
        <Container component="main" maxWidth="md">
            {snackMessage?.open && <Snackbar type={snackMessage?.type} text={snackMessage?.text} />}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocalPhoneIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    PhoneBook App
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={10} md={10}>
                        <Typography style={{ marginTop: 30 }} variant="h5" component="div">
                            Phone Numbers
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <AddIcon onClick={() => setOpenAddEditDialog(true)} className={classes.addIcon} />
                    </Grid>
                </Grid>

                {loading ?
                    <div>
                        <CircularProgress className={classes.spinner} />
                    </div> :
                    
                    !phoneNumbers.length ?
                        <Typography style={{ marginTop: 30, textAlign: "center" }} variant="h6" component="div">
                            No Phone Number Found!
                        </Typography>
                        :
                        <Grid container spacing={2}>
                            {phoneNumbers.map((item, index) => {
                                return (
                                    <Grid key={index} container item xs={12} md={12} spacing={2}>
                                        <Grid item xs={10} md={10}>
                                            <Paper>
                                                <List>
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <LocalPhoneIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.phone} />
                                                    </ListItem>
                                                </List>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={1} md={1}>
                                            <EditIcon 
                                                className={classes.actionIcons}
                                                onClick={() => {
                                                    setOpenAddEditDialog(true)
                                                    setIsEdit(true)
                                                    setPhoneNumber(item)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={1} md={1}>
                                            <DeleteIcon 
                                                className={classes.actionIcons}
                                                onClick={() => deletePhoneNumber(item._id, { phone: item.phone })}
                                            />
                                        </Grid>
                                    </Grid>
                                )
                            })
                            }
                        </Grid>
                }

                <PhoneNumberDialog 
                    open={openAddEditDialog}
                    setOpen={setOpenAddEditDialog}
                    edit={isEdit}
                    setEdit={setIsEdit}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    isError={isErr}
                    setIsError={setIsErr}
                    savePhoneNumber={addOrUpdatePhoneNumber}
                />
                
            </div>
        </Container>
    )
  
}

export default PhoneNumbers