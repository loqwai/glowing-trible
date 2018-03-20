import React from "react"
import Card from "material-ui/Card"
import { withStyles } from "material-ui/styles"

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em"
  }
}

const Generation = ({ children, classes }) => (
  <Card className={classes.root}>{children}</Card>
)

export default withStyles(styles)(Generation)
