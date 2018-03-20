import React from "react"
import Card from "material-ui/Card"
import { withStyles } from "material-ui/styles"

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "912px"
  }
}

const Generation = ({ children, classes }) => (
  <Card className={classes.root}>{children}</Card>
)

export default withStyles(styles)(Generation)
