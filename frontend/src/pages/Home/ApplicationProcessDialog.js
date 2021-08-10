import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Contacts from "./Contacts";
import Notes from "./Notes";
import Stages from "./Stages";
import * as apServices from '../../services/AppProcServices';
import DropDown from "./DropDown";
import * as StaticServices from "../../services/StaticServices";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/Styles";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    justify: 'center'
  }
}))

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ApplicationProcessDialog({
  open,
  handleClose,
  applicationProcess,
  data,
  setData,
}) {

  const [displayContacts, setDisplayContacts] = React.useState(true);

  const [statusObjects, setStatusObjects] = React.useState([]);
  React.useEffect(() => {
    const fetchStatusObjects = async () => {
      const result = await StaticServices.getStatuses();
      setStatusObjects(result.data.results);
    };
    fetchStatusObjects();
  }, []);

  const [countries, setCountries] = React.useState([]);
  React.useEffect(() => {
    const fetchCountries = async () => {
      const result = await StaticServices.getCountries();
      setCountries(result.data.results);
    };
    fetchCountries();
  }, []);


  const [currentApplication, setCurrentApplication] =
    React.useState(applicationProcess);
  const renderContactsOrNotes = () => {
    return (
      <div>
        {displayContacts ? (
          <Contacts
            contact_set={currentApplication.contact_set}
            handleContactsChange={handleContactsChange}
          />
        ) : (
          <Notes
            notes={currentApplication.position.about_the_job}
            id={"about_the_job"}
            handleChange={handlePositionChange}
          />
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    setCurrentApplication({
      ...currentApplication,
      [e.target.id]: e.target.value,
    });
  };
  const handleStatusChange = (e) => {
    let status = {};
    // switch(e.target.value){
    //   case "Interested":
    //     status["name"] = "Interested";
    //     status["id"] ="IN";
    //     break;
    //   case ""
    // }
    setCurrentApplication({
      ...currentApplication,
      [e.target.id]: e.target.value,
    });
  };
  const updateArray = (arr, newAppProc) => {
    const tempArray = arr.filter(a => {
      return a.id !== newAppProc.id;
    });
    tempArray.push(newAppProc);
    return tempArray;
  }

  const handleSaveChanges = async (e) => {
    console.log("application process: ", currentApplication);

    let result;

    if (currentApplication.url) {
      result = await apServices.update(currentApplication);
    } else {
      result = await apServices.addNew(currentApplication);
    }
    setData(updateArray(data, result.data));
    handleClose();
  };

  const handlePositionChange = (e) => {
    const position = {
      ...currentApplication.position,
      [e.target.id]: e.target.value,
    };
    setCurrentApplication({ ...currentApplication, position: position });
  };
  const handleStagesChange = (e, new_stage_set) => {
    setCurrentApplication({ ...currentApplication, stage_set: new_stage_set });
  };
  const handleContactsChange = (e, new_contact_set) => {
    setCurrentApplication({
      ...currentApplication,
      contact_set: new_contact_set,
    });
  };
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullHeight={true}
        fullWidth={true}
        maxWidth={"xl"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid container spacing={2} className={classes.grid} alignItems={"stretch"}>
          <Grid item xs={12} md={4}>

            <Paper className={classes.paper}>
              <Grid container direction={"column"}>
                <Grid item>
                  <TextField
                    onChange={handlePositionChange}
                    id="company_name"
                    label="Company Name"
                    type="text"
                    defaultValue={applicationProcess.position.company_name}
                  />
                </Grid>
                <Grid item>

                  <TextField
                    id="job_title"
                    label="Job Title"
                    defaultValue={applicationProcess.position.job_title}
                    onChange={handlePositionChange}
                  />
                </Grid>
                <Grid item>
                  {/* need to add onchange and component id */}
                  <DropDown dropdownOptions={statusObjects.map(status => status.name)} label={"Status"} />
                </Grid>

              </Grid>
            </Paper>

          </Grid>
          <Grid item xs={12} md={4}>

            <Paper className={classes.paper}>
              <Grid container justify={"space-between"} direction={"column"}>
                <Grid item>
                  <Grid container>
                    {/* <TextField
                        id="city"
                        label="Country"
                        defaultValue={currentApplication.position.city}
                        onChange={handlePositionChange}
                      /> */}
                    <DropDown dropdownOptions={countries.map(country => country.name)} label={"Country"} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container>
                    <TextField
                      id="city"
                      label="City"
                      defaultValue={currentApplication.position.city}
                      onChange={handlePositionChange}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container>
                    <TextField
                      id="job_posting_URL"
                      label="Job URL"
                      defaultValue={
                        currentApplication.position.job_posting_URL
                      }
                      onChange={handlePositionChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Grid container alignItems="center" >
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Button
                    id="ContactsButton"
                    onClick={() => {
                      setDisplayContacts(true);
                    }}
                  >
                    Contacts
                  </Button>
                  <Button
                    id="NotesButton"
                    onClick={() => {
                      setDisplayContacts(false);
                    }}
                  >
                    Notes
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Grid container>{renderContactsOrNotes()}</Grid>
              </Grid>
            </Paper>

          </Grid>

          <Grid item xs={12}>
            <Paper>
              <HorizontalLinearStepper stage_set={  currentApplication.stage_set } />
            </Paper>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
