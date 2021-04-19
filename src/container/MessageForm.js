import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, TextareaAutosize } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';
import ChipInput from 'material-ui-chip-input'
import UserlistIcon from 'components/IconList/UserlistIcon';
import { getUsernameChips } from './api/authapi';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));
const MessageForm = () => {
    const classes = useStyles();
    const [messagetext, setMessagetext] = React.useState('');
    const [chipData, setChipData] = React.useState([
        // { key: 0, label: 'Angular' },

        // 'angular',
        // 'jquery'
    ]);
    const [chipuser, setChipuser] = React.useState([])
    const [userslistdata, setUserslistdata] = React.useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(messagetext)
    }


    // Chips

    const handleAddChip = (chips) => {

        chipData.push(chips)
    }


    const onUpdateInput = async (chip) => {

        var response = await getUsernameChips({ value: chip.target.value, action: 'Getusername' })
        setChipuser(response.users)



    }

    const handleDeleteChip = (chipToDelete, index) => {

        setChipData((chips) => chips.filter((chip, chipindex) => chipindex !== index));

    };

    // const url = "http://127.0.0.1:8000/"
    const url = 'https://app.contentbond.com/'


    // Users

    const getalluserss = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.get(url + 'auth/admin/saveuser/', config).then(res => {
            if (!res.data.error) {

                setUserslistdata(res.data.GETmethodData.splice(5, 30))


            }
        }).catch(err => {

            alert('myalert', err.message)

        })
    }
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        Users:
            <Paper component="ul" className="">

                <ChipInput
                    onUpdateInput={(chip) => onUpdateInput(chip)}
                    disableUnderline={false}
                    variant="outlined"
                    value={chipData}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                />
                {/* {chipuser.map((val,index) => {
                                return <p key={index}>{JSON.stringify(val.username)}</p>
                            })} */}
                <Box pt={3} display="flex" justifyContent="space-between">
                    <UserlistIcon chipuser={chipuser} chipdata={chipData} handleAddChip={handleAddChip} handleDeleteChip={handleDeleteChip} />
                </Box>
                {/* {productlistdata.map((val, index) => {
                                        return <MenuItem key={val.id} value={val.id}>{val.title}</MenuItem>
                                    })} */}
            </Paper>


            <br></br>
            <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder="Insert Message"
                onChange={(e) => setMessagetext(e.target.value)} /><br></br>

            <Button type="submit" color="primary" variant="contained">Submit</Button>
        </form>
    );
}

export default MessageForm
