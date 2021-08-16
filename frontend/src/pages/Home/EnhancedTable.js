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

function descendingComparator(a, b, orderBy) {
  let x, y;
  if (typeof a[orderBy] === "string") {
    x = a[orderBy].toLowerCase();
    y = b[orderBy].toLowerCase();
  }
  else {
    x = a[orderBy];
    y = b[orderBy];
  }
  if (y < x) {
    return -1;
  }
  if (y > x) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  console.log(array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {

    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "company_name", numeric: false, disablePadding: true, label: "Company",
  },
  { id: "job_title", numeric: false, disablePadding: true, label: "Position" },
  { id: "status", numeric: false, disablePadding: true, label: "Status" },
  { id: "last_modified", numeric: true, disablePadding: true, label: "Last Modified" },
  { id: "delete", disablePadding: true, label: "" }, // for the delete bin
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
            padding={"default"}
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


const EnhancedTableToolbar = (props) => {
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
      <SearchField className={classes.search} />
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
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("company");
  const [currentItem, setCurrentItem] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [applications, setApplications] = React.useState([]);
  const [rowEntries, setRowEntries] = React.useState([]);

  React.useEffect(() => {
    const fetchApplications = async () => {
      const result = await apServices.getAll()
      setApplications(result.data.results);
      setRowEntries(result.data.results.map(app => Object.create({ id: app.id, company_name: app.position.company_name, job_title: app.position.job_title, status: app.status.name, last_modified: app.last_modified })))
    };
    fetchApplications();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (app, event) => {
    setCurrentItem(app);
    console.log(app);
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setCurrentItem(null);
  };

  const renderCurrentItem = (currentItem) => {
    return (
      <div>
        <ApplicationProcessDialog
          open={open}
          handleClose={handleClose}
          applicationProcess={currentItem}
          data={applications}
          setData={setApplications}
        />
      </div>
    );
  };

  const handleAddNew = useCallback((e) => {
    const app = {
      position: {},
      contact_set: [],
      stage_set: [],
      user_id: 2,
      last_modified: new Date().toISOString().split('T')[0],
      status: 'CL'
    };

    setCurrentItem(app);
    setOpen(true);
  }, []);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, applications.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {currentItem && renderCurrentItem(currentItem)}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <IconButton position={"relative"} onClick={handleAddNew}>
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
            />
            <TableBody>
              {stableSort(rowEntries, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => { handleClick(applications.find(app => app.id === row.id)) }}
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
                      <TableCell align="left">{row.last_modified}</TableCell>
                      <TableCell align="left">
                        <DeleteIcon className={classes.deleteBin} />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
