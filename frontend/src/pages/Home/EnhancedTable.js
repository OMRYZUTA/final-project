import React, { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import ApplicationProcessDialog from "./ApplicationProcessDialog";
import SearchField from "./SearchField";
import * as apServices from '../../services/AppProcServices';
import { getEventMedia, getEventTypes, getStatuses } from "../../services/StaticServices";
import { stableSort, getComparator, updateArray } from "../../utils/utils";

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
}));

const headCells = [
  {
    id: "company_name", numeric: false, disablePadding: true, label: "Company",
  },
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

const EnhancedTableToolbar = ({ handleSearchChanged }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
      >
        Job Application Processes
      </Typography>
      <SearchField className={classes.search} handleSearchChanged={handleSearchChanged} />
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

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
    backgroundColor: "#FFFFC5"
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
    top: 20,
    width: 1,
  },
}));



export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("company_name");
  const [currentItem, setCurrentItem] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [statuses, setStatuses] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [eventMedias, setEventMedias] = React.useState([]);
  const [applications, setApplications] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(true);
  const matchStatusToClassName = (statusID, classes) => {
    let className = ''
    switch (statusID) {
      case "Applied":
        className = classes["yellowRow"];
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
  const handleSearchChanged = useCallback(e => {

    if (e.target.value) {
      setQuery(e.target.value);
    }
    else {
      setQuery("");
    }

  }, [applications])

  React.useEffect(() => {
    const fetchAllData = async () => {
      // calling all API calls in parallel, and waiting until they ALL finish before setting
      const [statuses, eventTypes, eventMedias, applications] = await Promise.all([
        getStatuses(),
        getEventTypes(),
        getEventMedia(),
        apServices.getAll(),
      ]);

      setStatuses(statuses.data.results);
      setEventTypes(eventTypes.data.results);
      setEventMedias(eventMedias.data.results);
      setIsFetching(false);
      setApplications(applications.data.results);
    };
    fetchAllData();
  }, []);

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
    // https://www.npmjs.com/package/react-confirm-alert
    await apServices.remove(applicationProcess);
    setApplications(applications.filter((app) => app.id !== applicationProcess.id));
    setCurrentItem(undefined);
  }, [applications]);

  const handleSave = useCallback(async applicationProcess => {
    let result;


    if (applicationProcess.url) {
      result = await apServices.update(applicationProcess);
    } else {
      result = await apServices.addNew(applicationProcess);
    }
    let newApplications = updateArray(applications, result.data)

    setApplications(stableSort(newApplications, getComparator(order, orderBy)));
    setCurrentItem(undefined);
  }, [applications, orderBy, order]);

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
    }
    return result;
  }


  const renderCurrentItem = (currentItem) => {
    return (
      <ApplicationProcessDialog
        applicationProcess={currentItem}
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
      user_id: 2,
      last_modified: new Date().toISOString().split('T')[0],
      status: { id: 'IN', name: "Interested" }
    };

    setCurrentItem(app);
  }, []);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, applications.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {currentItem && renderCurrentItem(currentItem, statuses)}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar handleSearchChanged={handleSearchChanged} />
        <IconButton disabled={isFetching} position={"relative"} onClick={handleAddNew}>
          <AddIcon />
        </IconButton>

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
                stableSort(
                  applications.filter((app) => isMatching(app, query)).map(app => ({
                    id: app.id,
                    company_name: app.position?.company_name,
                    job_title: app.position?.job_title,
                    status: app.status.name,
                    last_modified: app.last_modified
                  })),
                  getComparator(order, orderBy)
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
          count={applications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
