import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ContactsCard from "./ContactsCard";
import Notes from "./Notes";
import * as apServices from '../../services/AppProcServices';
import DropDown from "./DropDown";
import IconButton from '@material-ui/core/IconButton';
import Document from "./Document";
import * as StaticServices from "../../services/StaticServices";
import HorizontalStepper from "./HorizontalLinearStepper";
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import CountrySelect from "./CountrySelect";

const useStyles = makeStyles((theme) => ({

  grid: {
    width: '100%',
    margin: '2px',
    backgroundColor: '#FFFFC5',//yellow
    spacing: 2,
    alignItems: 'stretch',
  },
  paper: {
    padding: theme.spacing(2),
    justifyContent: 'flex-start',
    backgroundColor: '#c3fff5',//veryLightBlue
  },
  paperWithHeight: {
    height: '90%',
  },
  paperField: {
    margin: "5px",
    width: "auto",
  }, container: {
    justifyContent: 'flex-start',
  },
  footer: {
    padding: "5px",
    xs: 12,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#FFADE7',//pink
    margin: '5px',
  },
  card: {
    backgroundColor: '#c3fff5',//veryLightBlue
    width: "100%",
  }
}))

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(DialogActions);

export default function ApplicationProcessDialog({
  open,
  handleClose,
  applicationProcess,
  statuses,
}) {
  const theme = useTheme();
  const [displayContacts, setDisplayContacts] = useState(true);
  //TODO: cache the status, etc - receive from backend not ask from backend
  //const [statusObjects, setStatusObjects] = useState([]);
  // useEffect(() => {
  //   const fetchStatusObjects = async () => {
  //     const result = await StaticServices.getStatuses();
  //     setStatusObjects(result.data.results);
  //   };
  //   fetchStatusObjects();
  // }, []);

  const [currentApplication, setCurrentApplication] =
    useState(applicationProcess);
  const renderContactsOrNotes = () => {
    return (
      <div className={classes.card}>
        {displayContacts ? (
          <ContactsCard
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
    setCurrentApplication({
      ...currentApplication,
      status: e.target.value,
    });
    console.log(currentApplication);
  };

  const updateArray = (arr, newAppProc) => {
    const tempArray = arr.filter(a => {
      return a.id !== newAppProc.id;
    });
    tempArray.push(newAppProc);
    return tempArray;

  };

  const handleSaveChanges = async (e) => {
    console.log("application process: ", currentApplication);

    // let result;

    // if (currentApplication.url) {
    //   result = await apServices.update(currentApplication);
    // } else {
    //   result = await apServices.addNew(currentApplication);
    // }
    // setData(updateArray(data, result.data));
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

  const handleApplicationChange = (e) => {
    setCurrentApplication({ ...currentApplication, [e.target.id]: e.target.value });
  };
  const classes = useStyles(theme);

  return (
    <div>
      <Dialog
        fullHeight={true}
        fullWidth={true}
        maxWidth={"xl"}
        onClose={handleClose}
        open={open}
      >
        <Grid container className={classes.grid} spacing={2} alignItems={"stretch"} backgroundColor={'#c9e8f2'}>

          <Grid item alignItems={"stretch"} xs={12} md={4}>
            <Paper className={classes.paper + " " + classes.paperWithHeight}>
              <Grid container direction={"column"}>

                <Grid item>
                  <TextField
                    className={classes.paperField}
                    onChange={handlePositionChange}
                    id="company_name"
                    label="Company Name"
                    type="text"
                    defaultValue={applicationProcess.position.company_name}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    className={classes.paperField}
                    id="job_title"
                    label="Job Title"
                    defaultValue={applicationProcess.position.job_title}
                    onChange={handlePositionChange}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    className={classes.paperField}
                    id="job_posting_URL"
                    label="Job URL"
                    defaultValue={
                      currentApplication.position.job_posting_URL
                    }
                    onChange={handlePositionChange}
                  />
                </Grid>

                <Grid item>
                  {/* need to add onchange and component id */}
                  <DropDown
                    className={classes.paperField}
                    label={"Status"}
                    options={statuses}
                    currentValue={currentApplication.status.id}
                    keyPropName="id"
                    namePropName="name"
                    onChange={handleStatusChange}
                  />
                </Grid>

              </Grid>
            </Paper>
          </Grid>

          <Grid item alignItems={"stretch"} xs={12} md={4}>
            <Paper className={classes.paper + " " + classes.paperWithHeight}>
              <Grid container justify={"space-between"} direction={"column"}>
                <Grid item>
                  <Grid container>
                    <CountrySelect country={currentApplication.position.country} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <TextField
                      className={classes.paperField}
                      id="city"
                      label="City"
                      value={currentApplication.position.city}
                      onChange={handlePositionChange}
                    />
                    <TextField
                      className={classes.paperField}
                      id="reference"
                      label="Reference"
                      value={currentApplication.reference}
                      onChange={handleApplicationChange}
                    />
                    <Typography>Documents</Typography>
                    <Card className={classes.card}>
                      <Grid container direction="row" className={classes.container}>
                        <IconButton >
                          <AddIcon />
                        </IconButton>
                        <Document text={"CV1"}></Document>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item alignItems={"stretch"} xs={12} md={4}>
            <Paper className={classes.paper + " " + classes.paperWithHeight}>
              <Grid container alignItems="center" >
                <ButtonGroup
                  color="neutral"
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

          <Grid item alignItems={"stretch"} xs={12}>
            <Paper className={classes.paper}>
              <HorizontalStepper className={classes.stepper} stage_set={currentApplication.stage_set} />
            </Paper>
          </Grid>

          <Grid container className={classes.footer} >
            <Grid item  >
              <Button
                id="saveChanges"
                onClick={handleSaveChanges}
                className={classes.button}
              >
                Save changes
              </Button>

              <Button
                id="cancel"
                onClick={() => {
                }}
                className={classes.button}
              >
                cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
