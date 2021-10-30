import React from "react"
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText} from "@material-ui/core"
import { GetPhoneNumberResponse, PhoneNumberRequestBody } from "../models"

export interface IPhoneNumberDialogProps {
    open: boolean
    setOpen: (val: boolean) => void
    edit: boolean
    setEdit: (val: boolean) => void
    phoneNumber: GetPhoneNumberResponse
    setPhoneNumber: (val: GetPhoneNumberResponse) => void
    isError: boolean
    setIsError: (val: boolean) => void
    savePhoneNumber: (phoneNumber: PhoneNumberRequestBody, phoneId?: string) => void
}

const PhoneNumberDialog = (props: IPhoneNumberDialogProps) => {    
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth={"sm"} fullWidth>
            <DialogTitle>{props.edit ? "Edit Phone Number" : "Add Phone Number"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={props.phoneNumber.phone}
                    onChange={(event) => {
                        props.setPhoneNumber({ ...props.phoneNumber, phone: event.target.value })
                    }}
                    error={props.isError}
                />
                <FormHelperText style={{ color: "red" }}>
                    {props.isError ? props.phoneNumber?.phone?.length === 0 ? "Field is required" : "" : ""}
                </FormHelperText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => {
                        props.setEdit(false)
                        props.setOpen(false)
                        props.setPhoneNumber({ __v: 0, _id: "", phone: "" })
                        props.setIsError(false)
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    style={{ color: "#f50057" }} 
                    onClick={() => {
                        props.edit ? props.savePhoneNumber({ phone: props.phoneNumber?.phone }, props.phoneNumber?._id) : props.savePhoneNumber({ phone: props.phoneNumber?.phone })
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
  
}

export default PhoneNumberDialog