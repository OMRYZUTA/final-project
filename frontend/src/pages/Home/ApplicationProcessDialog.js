import React, { useCallback, useState } from "react";
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
import DropDown from "./DropDown";
import IconButton from '@material-ui/core/IconButton';
import Document from "./Document";
import HorizontalStepper from "./HorizontalLinearStepper";
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import CountrySelect from "./CountrySelect";
import AreYouSure from "./AreYouSure";
import { updateArray } from "../../utils/utils";
import DeleteIcon from '@material-ui/icons/Delete';
import DocumentChooser from "../../components/DocumentChooser";

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
    width: "100%",
  }
}));

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(DialogActions);

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
  const theme = useTheme();
  const [displayContacts, setDisplayContacts] = useState(false);
  const [showAreYouSure, setShowAreYouSure] = React.useState(false);
  const [headline, setHeadline] = React.useState("");
  const [content, setContent] = React.useState("");
  const [onSure, setOnSure] = useState();
  const [showFiles, setShowFiles] = React.useState(false);
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
  const renderAreYouSure = (handleClose) => {
    return (
      <AreYouSure handleClose={handleClose} onOK={onSure} headline={headline} content={content} />
    )
  }

  const handleShowFiles = () => {
    setShowFiles(true);
  };

  const handleCloseFiles = (value) => {
    setShowFiles(false);
    // setSelectedFile(value);
  };


  const handleAreYouSureClose = useCallback(() => {
    setShowAreYouSure(false);
  });


  const handleChange = (e) => {
    setCurrentApplication({
      ...currentApplication,
      [e.target.id]: e.target.value,
    });
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
      ...currentApplication,
      status: newStatus,
    });
  };

  const handlePositionChange = (e) => {
    const position = {
      ...currentApplication.position,
      [e.target.id]: e.target.value,
    };
    setCurrentApplication({ ...currentApplication, position: position });
  };

  const handleStagesChange = useCallback((newStage, isUpdate) => {
    let newStages;
    if (isUpdate) {
      newStages = currentApplication.stage_set.filter(stage => JSON.stringify(stage) !== JSON.stringify(newStage)
      )
    }
    newStages = updateArray(currentApplication.stage_set, newStage).sort((s1, s2) => new Date(s1.stage_date) - new Date(s2.stage_date))
    setCurrentApplication({ ...currentApplication, stage_set: newStages });
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
  const handleSureDeleteApp = useCallback(() => {
    handleDelete(currentApplication);
    handleAreYouSureClose();
  }, [handleAreYouSureClose, handleAreYouSureClose, currentApplication, handleDelete]);

  const onDelete = useCallback(() => {
    setOnSure(() => handleSureDeleteApp);
    setContent("It Will delete the application permanently, you can instead click cancel and set the status to close")
    setHeadline("Are You Sure You want to delete the application?");
    setShowAreYouSure(true);
  }, [currentApplication, handleDelete, handleAreYouSureClose]);


  const onDeleteStage = useCallback((stageToDelete, handleClose) => {
    console.log(stageToDelete);
    setOnSure(() => () => handleDeletStage(stageToDelete, handleClose));
    setContent("It will delete the Stage permanently")
    setHeadline("Are You Sure You want to delete the Stage?");
    setShowAreYouSure(true);
  }, [currentApplication, handleDelete, handleAreYouSureClose]);


  const handleDeletStage = useCallback((stageToDelete, handleClose) => {
    console.log(stageToDelete)
    setCurrentApplication({
      ...currentApplication, stage_set: currentApplication.stage_set.filter(stage => JSON.stringify(stage) !== JSON.stringify(stageToDelete)
      )
    });
    setShowAreYouSure(false);
    handleClose();
  })



  const onSave = useCallback(() => {
    handleSave(currentApplication);
  }, [currentApplication, handleSave]);

  const classes = useStyles(theme);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"xl"}
      onClose={handleClose}
      open={true}
    >
      {showAreYouSure && renderAreYouSure(handleAreYouSureClose, onSure)}

      <Grid container className={classes.grid} spacing={2} alignItems={"stretch"}>
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
                      {currentApplication.document_set.map(document => {
                        return (
                          <Document document={document}></Document>
                        )
                      })}

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
              onDeleteStage={onDeleteStage}
              className={classes.stepper}
              stage_set={currentApplication.stage_set}
              eventTypes={eventTypes}
              eventMedias={eventMedias}
              handleStagesChange={handleStagesChange}
            />
          </Paper>
        </Grid>

        <Grid container className={classes.footer}>
          <IconButton className={classes.deleteBin} onClick={onDelete}>
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
