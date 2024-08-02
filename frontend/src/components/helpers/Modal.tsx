import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { GeneratePassword } from '../../function/generatePassword';
import Modal from '@mui/material/Modal';
import { shortUrl, urlPattern, xKeyGenerator } from '../../function/util';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

export function LGModal({ handleClose }: any) {
    const [checkData, setCheckData] = useState({ capital: false, special: false, number: false, Small: false });
    const [error, setError] = useState("");
    const [length, setLength] = useState<number | string>("");
    const [password, setPassword] = useState("");

    const generatePassword = () => {
        if (validation()) {
            const inc: [boolean, boolean, boolean, boolean] = [checkData.capital, checkData.special, checkData.number, checkData.Small];
            const pass = GeneratePassword(Number(length), inc);
            setPassword(pass);
        }
    };

    function validation() {
        if (typeof length === 'number' && !isNaN(length) && length > 0 && length < 101) {
            if (Object.values(checkData).includes(true)) {
                return true;
            } else {
                setError("Please check at least one checkbox");
                return false;
            }
        } else {
            setError("Length must be between 1 to 100 containing only numbers");
            return false;
        }
    }

    function handleChange(section: string) {
        if (section === "capital" || section === "special" || section === "number" || section === "Small") {
            const val = checkData[section];
            setCheckData(rest => ({ ...rest, [section]: !val }));
            setError("");
        }
    }

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={true}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Password Generator
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                </IconButton>
                <DialogContent dividers>
                    <FormGroup>
                        {error && <p className="error mb-2">{error}</p>}
                        <Box sx={{ width: '100%' }}>
                            <TextField fullWidth type='number' label="Length of password 1 - 100" value={length} onChange={(e) => { setError(""); setLength(Number(e.target.value)) }} id="fullWidth" />
                        </Box>
                        <div className="flex flex-wrap justify-around m-3">
                            <FormControlLabel control={
                                <Checkbox
                                    checked={checkData.capital}
                                    onChange={() => handleChange("capital")}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } label="Capital" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={checkData.Small}
                                    onChange={() => handleChange("Small")}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } label="Small" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={checkData.special}
                                    onChange={() => setCheckData(rest => ({ ...rest, special: !rest.special }))}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } label="Special characters" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={checkData.number}
                                    onChange={() => setCheckData(rest => ({ ...rest, number: !rest.number }))}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } label="Numbers" />
                        </div>
                        <CustomMarks />
                    </FormGroup>
                    <div className="flex flex-col items-center mt-5 w-full">
                        {password && <div className="flex items-center mb-1 w-[350px] bg-gray-400 p-2 rounded">
                            <p className="flex-1 break-all">{password}</p>
                            <IconButton onClick={() => { navigator.clipboard.writeText(password); }}>
                                <ContentCopyIcon />
                            </IconButton>
                        </div>}
                        <div>
                            <Button autoFocus variant='outlined' onClick={generatePassword}>Generate Now</Button>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}


const MAX = 100;
const MIN = 0;

const marks = [
    { value: MIN, label: '' },
    { value: MAX, label: '' }
];

function CustomMarks() {
    const [val, setVal] = useState<number>(MIN);

    const handleChange = (_: Event, newValue: number | number[]) => { setVal(newValue as number); };

    return (
        <Box sx={{ width: "90%", margin: "auto" }}>
            <Slider
                marks={marks}
                step={25}
                value={val}
                min={MIN}
                max={MAX}
                onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    onClick={() => setVal(MIN)}
                    sx={{ cursor: 'pointer' }}
                >
                    Easy
                </Typography>
                <Typography
                    variant="body2"
                    onClick={() => setVal(MAX)}
                    sx={{ cursor: 'pointer' }}
                >
                    Hard
                </Typography>
            </Box>
        </Box>
    );
}




export function SimpleModal({ handleClose }: { handleClose: () => void }) {
    const [error, setError] = useState("")
    const [length, setLength] = useState(0);
    const [text, setText] = useState("");

    const generateID = () => {
        if (length > 0 && length <= 256) {
            setText(xKeyGenerator(length))
        } else {
            setError("length must between 1 - 256 ")
        }
    }

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter the length
                    </Typography>
                    {error && <p className='error'>{error}</p>}
                    <Box sx={{ width: '100%', marginTop: "5%" }}>
                        <TextField fullWidth type='number' label="Length of password 1 - 256" value={length} onChange={(e) => { setError(""); setLength(Number(e.target.value)) }} id="fullWidth" />
                        <div className="flex mt-2">
                            <div className="ml-auto">
                                <Button autoFocus variant='outlined' onClick={generateID}>Generate Now</Button>
                            </div>
                        </div>
                        {text && <div className="flex items-center mt-1 w-full bg-gray-400 p-1 rounded">
                            <p className="flex-1 break-all">{text}</p>
                            <IconButton onClick={() => { navigator.clipboard.writeText(text); }}> <ContentCopyIcon /> </IconButton>
                        </div>}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}



export function URLModal({ handleClose }: { handleClose: () => void }) {
    const [error, setError] = useState("")
    const [url, setURL] = useState("");
    const [text, setText] = useState("")

    const generateURL = () => {
        if (urlPattern.test(text)) {
            shortUrl(text).then(({ error, link }) => error ? setError(link) : setURL(link))
        } else {
            setError("Enter a valid url")
        }
    }

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Shorten URL</Typography>
                    {error && <p className='error'>{error}</p>}
                    <Box sx={{ width: '100%', marginTop: "5%" }}>
                        <TextField fullWidth type='text' label="URL" value={text} onChange={(e) => { setError(""); setText(e.target.value) }} id="fullWidth" />
                        <div className="flex mt-2">
                            <div className="ml-auto"> <Button autoFocus variant='outlined' onClick={generateURL}>Generate Now</Button></div>
                        </div>
                        {url &&
                            <div className="flex items-center mt-1 w-full bg-gray-400 p-1 rounded">
                                <p className="flex-1 break-all">{url}</p>
                                <IconButton onClick={() => { navigator.clipboard.writeText(url); }}> <ContentCopyIcon /> </IconButton>
                            </div>}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
