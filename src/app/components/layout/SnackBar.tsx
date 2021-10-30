import React from "react"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

export interface ISnackBarProps {
  type: string
  text: string
}

 const SnackBar = (props: ISnackBarProps) => {
     
  const [open, setOpen] = React.useState(true)
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {props.type === "success" ?
        <Alert onClose={handleClose} severity={"success"}>
          {props.text}
        </Alert>
        :
        <Alert onClose={handleClose} severity={"error"}>
          {props.text}
        </Alert>
      }
    </Snackbar>
  )
}

export default SnackBar