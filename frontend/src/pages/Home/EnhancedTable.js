import * as appServices from '../../services/AppProcServices';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ApplicationProcessDialog from "./ApplicationProcessDialog";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import clsx from "clsx";
import FilterListIcon from '@material-ui/icons/FilterList';
import { getFiles, getEventMedia, getEventTypes, getStatuses } from "../../services/StaticServices";
import Grid from '@material-ui/core/Grid';
import { lighten, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchField from "./SearchField";
import { stableSort, getComparator, updateArray } from "../../utils/utils";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const filters = ['No Filter', 'Future Event', 'Open Status'];

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: '#FFFFC5'
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    paddingRight: "15px",
    flex: "1 1 100%",
    fontWeight: "bold",
    color: '#5f676e',
  },
  search: {
    backgroundColor: 'f7efd9',
  },
  selectedFilter: {
    fontWeight: 800,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  tableHeader: {
    backgroundColor: '#FFADE7'
  },
  addNewAppBtn: {
    marginLeft: "15px",
    marginBottom: "5px",
    color: "black",
    paddingRight: "15px",
    borderRadius: "45%",
    width: "5%",
    display: "flex",
  },
  malibuRow: {
    backgroundColor: '#5FE2FF'
  },
  anakiwaRow: {
    backgroundColor: '#93f7ff'
  },
  otherBlueRow: {
    backgroundColor: '#c3fff5'
  },
  pinkRow: {
    backgroundColor: '#FFADE7'
  },
  yellowRow: {
    backgroundColor: "#FFFFC5",
  },
  whiteRow: {
    backgroundColor: "white"
  },
  deleteBin: {
    color: '#5f676e'
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: "#FFFFC5"
  },
  table: {
    minWidth: 750,
  },
  pagination: {
    backgroundColor: "#FFFFC5"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 10,
    width: 1,
  },
}));

const headCells = [
  { id: "company_name", numeric: false, disablePadding: true, label: "Company" },
  { id: "job_title", numeric: false, disablePadding: true, label: "Position" },
  { id: "status", numeric: false, disablePadding: true, label: "Status" },
  { id: "last_modified", numeric: true, disablePadding: true, label: "Last Modified" },
];
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({ currentFilter, handleSearchChanged, setFilterRule, isFetching }) => {
  const classes = useToolbarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    setFilterRule(e.target.innerText);
    setAnchorEl(null);
  };

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Job Application Processes
      </Typography>

      <SearchField className={classes.search} handleSearchChanged={handleSearchChanged} disabled={isFetching} />

      <Tooltip title="Filter List">
        <IconButton aria-label="Filter List" onClick={handleMenuClick} disabled={isFetching}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {
          filters.map(filter => {
            const className = filter === currentFilter ? classes.selectedFilter : undefined;
            return <MenuItem key={filter} className={className} onClick={handleMenuClose}>{filter}</MenuItem>;
          })
        }
      </Menu>
    </Toolbar>
  );
};

const renderAlert = (alertText) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {alertText}
    </Alert>
  );
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [alertText, setAlertText] = React.useState('');
  const [applications, setApplications] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState();
  const [eventMedias, setEventMedias] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [filterRule, setFilterRule] = React.useState(filters[0]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("company_name");
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statuses, setStatuses] = React.useState([]);

  React.useEffect(() => {
    const fetchAllData = async () => {
      // calling all API calls in parallel, and waiting until they ALL finish before setting
      try {
        const [files, statuses, eventTypes, eventMedias, applications] = await Promise.all([
          getFiles(),
          getStatuses(),
          getEventTypes(),
          getEventMedia(),
          appServices.getAll(),
        ]);
        setFiles(files);
        setStatuses(statuses);
        setEventTypes(eventTypes);
        setEventMedias(eventMedias);
        setApplications(applications);
      } catch (e) {
        setAlertText('Failed initializing app, please reload page');
      } finally {
        setIsFetching(false);
      }
    };
    fetchAllData();
  }, []);

  const matchStatusToClassName = (statusID, classes) => {
    let className = ''
    switch (statusID) {
      case "Applied":
        className = classes["yellowRow"];
        break;
      case "In Progress":
        className = classes["malibuRow"];
        break;
      case "Closed":
        className = classes["anakiwaRow"];
        break;
      case "Interested":
        className = classes["otherBlueRow"];
        break;
      default:
        className = "";
        break;
    }
    return className;
  };

  const isMatching = (app, query) => {
    let result = false;

    if (!query) {
      result = true;
    }
    else {
      let normilizedQuery = query.toLowerCase();

      if (app.position.company_name.toLowerCase().includes(normilizedQuery.toLowerCase())) {
        result = true;
      }
      else if (app.position.job_title.toLowerCase().includes(normilizedQuery.toLowerCase())) {
        result = true;
      }
      else if (app.reference?.toLowerCase().includes(normilizedQuery.toLowerCase())) {
        result = true;
      }
      else if (app.contact_set.length > 0) {
        app.contact_set.forEach(contact => {
          if (contact.name.toLowerCase().includes(normilizedQuery.toLowerCase())) {
            result = true;
          }
        })
      }
    }

    return result;
  }

  const handleSearchChanged = useCallback(e => {

    if (e.target.value) {
      setQuery(e.target.value);
    }
    else {
      setQuery("");
    }
  }, [applications, query, filterRule]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = useCallback(() => {
    setCurrentItem(undefined);
  }, []);

  const handleDelete = useCallback(async applicationProcess => {
    try {
      await appServices.remove(applicationProcess);
      setApplications(applications.filter((app) => app.id !== applicationProcess.id));
    } catch (e) {
      setAlertText('Something went wrong, please reload page');
    } finally {
      handleClose();
    }
  }, [applications, handleClose]);

  const handleSave = useCallback(async applicationProcess => {
    try {
      let result;
      if (applicationProcess.url) {
        result = await appServices.update(applicationProcess);
      } else {
        result = await appServices.addNew(applicationProcess);
      }
      let newApplications = updateArray(applications, result)

      setApplications(stableSort(newApplications, getComparator(order, orderBy)));

    } catch (e) {
      setAlertText('Something went wrong, please reload page');
    } finally {
      handleClose();
    }

  }, [applications, orderBy, order, handleClose]);

  const applyFilterRule = (app, filterRule) => {
    let result = false;

    if (filterRule === "Open Status") {
      result = app.status.id !== "CL";
    } else if (filterRule === "Future Event") {
      return app.stage_set.some(element => {
        return new Date(element.stage_date) >= new Date();
      });
    }
    else {
      result = true;//if there was no filterRule applied
    }

    return result;
  }

  const renderCurrentItem = (currentItem) => {
    return (
      <ApplicationProcessDialog
        applicationProcess={currentItem}
        files={files}
        statuses={statuses}
        eventTypes={eventTypes}
        eventMedias={eventMedias}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />
    );
  };

  const handleAddNew = useCallback((e) => {
    const app = {
      position: { country_id: "IL" },
      contact_set: [],
      stage_set: [],
      document_set: [],
      user_id: 2,
      last_modified: new Date().toISOString().split('T')[0],
      status: { id: 'IN', name: "Interested" }
    };

    setCurrentItem(app);
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      setAlertText('');//remove alert message
      setFilterRule(""); //don't keep previous filter
      setQuery("");//don't keep previous search results    
      setIsFetching(true);
      const applicationList = await appServices.getAll();
      setApplications(stableSort(applicationList, getComparator(order, orderBy)));
    } catch (e) {
      setAlertText('Something went wrong, please try refreshing again');
    } finally {
      setIsFetching(false);
    }
  }, [order, orderBy]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, applications.length - page * rowsPerPage);

  const renderTable = (filteredArray) => {
    return (
      stableSort( //filter takes precedence over search
        filteredArray.map(app => ({
          id: app.id,
          company_name: app.position?.company_name,
          job_title: app.position?.job_title,
          status: app.status.name,
          last_modified: app.last_modified
        })),
        getComparator(order, orderBy),
      )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow
              hover
              onClick={() => { setCurrentItem(applications.find(app => app.id === row.id)) }}
              tabIndex={-1}
              key={row.id}
              className={matchStatusToClassName(row.status, classes)}
            >
              <TableCell align="left">
                {row.company_name}
              </TableCell>
              <TableCell align="left">
                {row.job_title}
              </TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.last_modified}
              </TableCell>
            </TableRow>
          );
        })
    )
  }

  const filteredArray = applications
    .filter(app => applyFilterRule(app, filterRule))
    .filter(app => isMatching(app, query));

  return (
    <div className={classes.root}>
      {currentItem && renderCurrentItem(currentItem, statuses)}
      <Paper className={classes.paper}>
        {alertText && renderAlert(alertText)}
        <EnhancedTableToolbar
          currentFilter={filterRule}
          handleSearchChanged={handleSearchChanged}
          setFilterRule={setFilterRule}
          isFetching={isFetching} />
        <Grid container direction="row">
          <Grid item>
            <IconButton disabled={isFetching} position={"relative"} onClick={handleAddNew}>
              <AddIcon />
            </IconButton>
            <IconButton disabled={isFetching} position={"relative"} onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <Grid item>
            {isFetching && <CircularIndeterminate />}
          </Grid>
        </Grid>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={applications.length}
              handleSearchChanged={handleSearchChanged}
            />

            <TableBody>
              {
                renderTable(filteredArray)
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          count={filteredArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
