const HandleListChange = (e, listID, currentList, handleChange, index) => {
    const old = currentList[index];
    const updated = { ...old, [e.target.id]: e.target.value }
    const clone = [...currentList];
    clone[index] = updated;
    console.log('in local updated: ', updated);
    handleChange(
        {
            'target':
            {
                'id': listID,
                'value': clone
            }
        });
}
export default HandleListChange;