export function descendingComparator(a, b, orderBy) {
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

export function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {

        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function updateArray(arr, newAppProc) {
    const tempArray = arr.filter(a => {
        return a.id !== newAppProc.id;
    });
    tempArray.push(newAppProc);
    return tempArray;
}
