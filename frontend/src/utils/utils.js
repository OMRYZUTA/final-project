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

// this function receives an array of items with ID and an item to add or update in the array
export function updateArray(arr, newAppProc) {
    // if there's already an ID to the new item, we assume it's an update to an existing one
    // and we remove the previous version of it  
    const tempArray = newAppProc.id ? arr.filter(a => {
        return a.id !== newAppProc.id;
    }) : [...arr];

    tempArray.push(newAppProc);

    return tempArray;
}
