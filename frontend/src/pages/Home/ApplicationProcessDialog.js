
import AddIcon from '@material-ui/icons/Add';
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CircularIndeterminate from "../../components/CircularIndeterminate";
import ContactsCard from "./ContactsCard";
import CountrySelect from "./CountrySelect";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import Document from "./Document";
import DocumentChooser from "../../components/DocumentChooser";
import DropDown from "./DropDown";
import Grid from '@material-ui/core/Grid';
import HorizontalStepper from "./HorizontalLinearStepper";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Notes from "./Notes";
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { updateArray } from "../../utils/utils";
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  grid: {
    margin: 0,
    width: '100%',
    backgroundColor: '#FFFFC5',//yellow
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
    // width: "auto",
    width: '100%',
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
  blueButton: {
    backgroundColor: '#93F7FF'
  },
  card: {
    backgroundColor: '#c3fff5',//veryLightBlue
    width: "90%",
  },
}));


export default function ApplicationProcessDialog({
  applicationProcess,
  statuses,
  eventTypes,
  eventMedias,
  files,
  handleClose,
  handleSave,
  handleDelete,
}) {
  const [content, setContent] = React.useState("");
  const [currentApplication, setCurrentApplication] = React.useState(applicationProcess);
  const [displayContacts, setDisplayContacts] = React.useState(false);
  const [headline, setHeadline] = React.useState("");
  const [onConfirmDelete, setOnConfirmDelete] = React.useState();
  const [showCircular, setShowCircular] = React.useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [showFiles, setShowFiles] = React.useState(false);
  const theme = useTheme();

  const classes = useStyles(theme);

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

  const handleShowFiles = () => {
    setShowFiles(true);
  };

  const handleCloseFiles = (value) => {
    if (value) {
      let newFiles = updateArray(currentApplication.document_set, value);
      setCurrentApplication({ ...currentApplication, document_set: newFiles })
    }

    setShowFiles(false);
  };

  const handlePositionChange = (e) => {
    const position = {
      ...currentApplication.position,
      [e.target.id]: e.target.value,
    };
    setCurrentApplication({ ...currentApplication, position: position });
  };

  const handleCountryChange = useCallback((event) => {
    const [span] = event.target.getElementsByTagName('span');
    let country_id;
    if (span) {
      country_id = span.getAttribute('data-code');
    }
    else {
      country_id = null;
    }

    setCurrentApplication({
      ...currentApplication,
      position: {
        ...currentApplication.position,
        country_id,
      },
    });
  }, [currentApplication])

  const handleStatusChange = (e) => {
    const oneElementArray = statuses.filter(a => {
      return a.id == e.target.value;
    })

    const newStatus = oneElementArray[0]

    setCurrentApplication({
      ...currentApplication, status: newStatus
    });
  };

  function updateStatusByEvent(currStatus, eventType) {
    let status = currStatus;
    let statusID = status.id;

    switch (eventType.id) {
      case 'CV':
        if (statusID === 'IN') {
          statusID = 'AP';
        }
        break;
      case 'RJ':
      case 'WD':
        statusID = 'CL';
        break;
      case 'OT': //just wanted to catch eventType "other" so the rest will go to default
        break;
      default:
        if (statusID === 'AP') {
          statusID = 'PR'
        }
        break;
    }

    status = statuses.find((item) => item.id === statusID);
    return status;
  }

  const handleStagesChange = useCallback((newStage, isUpdate) => {
    let { stage_set: stages, status } = currentApplication;

    status = updateStatusByEvent(status, newStage.event_type);

    if (isUpdate) {
      stages = stages
        .filter(stage => JSON.stringify(stage) !== JSON.stringify(newStage));
    }

    stages = updateArray(stages, newStage);
    setCurrentApplication({ ...currentApplication, status, stage_set: stages });
  }, [currentApplication]);

  const handleContactsChange = (e, new_contact_set) => {
    setCurrentApplication({
      ...currentApplication,
      contact_set: new_contact_set,
    });
  };

  const handleApplicationChange = (e) => {
    setCurrentApplication({ ...currentApplication, [e.target.id]: e.target.value });
  };

  const onSave = useCallback(() => {
    handleSave(currentApplication);
    setShowCircular(true);
  }, [currentApplication, handleSave]);

  const handleCloseDeleteConfirmAlert = useCallback(() => {
    // we're wrapping this useState in a function so that when sent in renderDeleteConfirmAlert
    // it won't revaluate the function every time
    setShowDeleteConfirmation(false);
  }, [setShowDeleteConfirmation]);

  const renderDeleteConfirmAlert = () => {
    return (
      <DeleteConfirmationAlert handleClose={handleCloseDeleteConfirmAlert}
        onOK={onConfirmDelete}
        headline={headline}
        content={content} />
    )
  }

  const handleDeleteAppProcess = useCallback(() => {
    handleDelete(currentApplication); //handleDelete sent from EnhancedTable
    setShowDeleteConfirmation(false);
    setShowCircular(true);
  }, [currentApplication, handleDelete]);

  const handleDeleteEvent = useCallback((eventToDelete, handleClose) => {
    setCurrentApplication({
      ...currentApplication, stage_set: currentApplication.stage_set
        .filter(stage => JSON.stringify(stage) !== JSON.stringify(eventToDelete))
    });

    setShowDeleteConfirmation(false);
    handleClose();
  })

  const onDeleteAppProcess = useCallback(() => {
    setOnConfirmDelete(() => handleDeleteAppProcess);
    setContent("It will be permanently deleted. You can click cancel and then set the status to Closed instead.")
    setHeadline("Are you sure you'd like to delete the application process?");
    setShowDeleteConfirmation(true);
  }, [currentApplication, handleDelete]);

  const onDeleteEvent = useCallback((eventToDelete, handleClose) => {
    setOnConfirmDelete(() => () => handleDeleteEvent(eventToDelete, handleClose));
    setContent("It will be permanently deleted")
    setHeadline("Are you sure you'd like to delete the event?");
    setShowDeleteConfirmation(true);
  }, [currentApplication, handleDelete]);

  return (
    <Dialog onClose={handleClose} fullWidth={true} maxWidth={"xl"} open={true}>
      {showDeleteConfirmation && renderDeleteConfirmAlert()}
      <Grid container className={classes.grid} spacing={2} alignItems={"stretch"} >
        {showFiles && <DocumentChooser files={files} showFiles={showFiles} handleClose={handleCloseFiles} />}

        <Grid item xs={12} md={4}>
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

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper + " " + classes.paperWithHeight}>
            <Grid container justifyContent={"space-between"} direction={"column"}>
              <Grid item>
                <Grid container>
                  <CountrySelect
                    country_id={currentApplication.position.country_id} onChange={handleCountryChange} />
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
                      <IconButton onClick={handleShowFiles} >
                        <AddIcon />
                      </IconButton>
                      <Grid container direction="row" spacing={2}>
                        {currentApplication.document_set?.map(document => {
                          return (
                            <Document document={document} />
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper + " " + classes.paperWithHeight}>
            <Grid container alignItems="center" >
              <ButtonGroup
                className={classes.blueButton}
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
          <Paper className={classes.paper}>
            <HorizontalStepper
              onDeleteStage={onDeleteEvent}
              className={classes.stepper}
              stage_set={currentApplication.stage_set}
              eventTypes={eventTypes}
              eventMedias={eventMedias}
              handleStagesChange={handleStagesChange}
            />
          </Paper>
        </Grid>

        <Grid container className={classes.footer}>
          {showCircular && <CircularIndeterminate />}
          <IconButton className={classes.deleteBin} onClick={onDeleteAppProcess}>
            <DeleteIcon />
          </IconButton>
          <Grid item>
            <Button
              id="cancel"
              className={classes.button}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              id="saveChanges"
              className={classes.button}
              onClick={onSave}
            >
              Save changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
