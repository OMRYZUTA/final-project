import Button from '@material-ui/core/Button'

const Documents = () => {
    return (
        <div>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    hidden
                />
            </Button>

        </div>
    )
}
export default Documents;