import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React from 'react'

import TableMaterialuser from '../components/TableMaterial/TableMaterialuser'
import { fade, makeStyles } from "@material-ui/core/styles";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import axios from 'axios';

import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';

import Select from '@material-ui/core/Select';
import { grey } from '@material-ui/core/colors'

import ChipInput from 'material-ui-chip-input'
import { getUsernameChips } from './api/authapi';
import { getProductChips, ProductUserSave, ProductGroupSave } from './api/cardactionsapi'
import UserlistIcon from '../components/IconList/UserlistIcon';
import Producticonlist from 'components/IconList/Producticonlist';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {

        "& .MuiInputBase-input": {
            backgroundColor: grey[100],
            outline: "none",
            borderRadius: 5,
            border: `1px solid ${grey[500]}`,
        },
        "& .MuiInputLabel-formControl": {
            color: grey[800],

        },
        "& .Mui-disabled": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            cursor: "no-drop",
        },
    },
    chiproot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        marginTop: 20
    },
    chip: {
        margin: theme.spacing(0.5),
    },


}));

const UsersList = () => {

    const calsses = useStyles();
    const [usercategory, setUsercategory] = React.useState('creator')
    const [usertype, setUsertype] = React.useState('user')
    const [productlistvalue, setProductlistvalue] = React.useState('')
    const [userlist, setUserlist] = React.useState('')
    const [usergroup, setUsergroup] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [usercreatedmessage, setUsercreatedmessage] = React.useState('')
    const [alertseverity, setAlertseverity] = React.useState('success')
    const [userslistdata, setUserslistdata] = React.useState([])
    const [usersgroupdata, setUsersgroupdata] = React.useState([])
    const [productlistdata, setProductlistdata] = React.useState([])

    const [chipuser, setChipuser] = React.useState([])
    const [chipproduct, setChipproduct] = React.useState([])


    const [uservalues, setUservalues] = React.useState({
        username: '',
        password: '',
        phone: ''

    })

    const [chipData, setChipData] = React.useState([
        // { key: 0, label: 'Angular' },

        // 'angular',
        // 'jquery'
    ]);
    const [chipDataProduct, setChipDataProduct] = React.useState([]);



    // 
    // SnackBar

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // 

    const handleDeleteChip = (chipToDelete, index) => {

        setChipData((chips) => chips.filter((chip, chipindex) => chipindex !== index));

    };

    const handleDeleteChipProduct = (chipToDelete, index) => {

        setChipDataProduct((chips) => chips.filter((chip, chipindex) => chipindex !== index));

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


    const getproductlist = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.get(url + 'admin/getProductsall/', config).then(res => {

            if (res.data.status == 200) {

                setProductlistdata(res.data.obs)


            }
        }).catch(err => {

            alert(err.message)

        })
    }


    // Users

    const getallgroups = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }
        axios.get(url + 'admin/getallgroups/', config).then(res => {
            if (!res.data.error) {

                setUsersgroupdata(res.data.groups)


            }
        }).catch(err => {

            alert(err.message)

        })
    }

    React.useEffect(() => {
        getalluserss()
        getallgroups()
        return () => {

        }
    }, [])
    React.useEffect(() => {

        getproductlist()
        return () => {

        }
    }, [])


    // Users



    const handleSubmit = async () => {

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            }
        }

        let form_data = new FormData()
        form_data.append('username', uservalues.username)
        form_data.append('password', uservalues.password)
        form_data.append('phone', uservalues.phone)
        form_data.append('usertype', usertype)
        form_data.append('usercategory', usercategory)
        await axios.post(url + 'auth/admin/saveuser/', form_data, config).then(res => {
            if (!res.data.error) {
                setUsercreatedmessage("User Created Successfully")
                setOpen(true)
                setAlertseverity('success')


            }
        }).catch(err => {

            setUsercreatedmessage("User Creation is Failed")
            setOpen(true);
            setAlertseverity('error')

        })

    }


    // Products

    const AssignhandleSubmit = async () => {

        const u = await chipuser.filter((val, index) => chipData.includes(val.username))
        const p = await chipproduct.filter((val, index) => chipDataProduct.includes(val.title))
        console.log(p.map(val => val.id))
        console.log(u.map(val => val.id))
        var response = await ProductUserSave({ userdata: u.map(val => val.id), productdata: p.map(val => val.id), action: 'saveuserproducts' })

    }

    const AssignhandleGroupSubmit = async () => {


        const p = await chipproduct.filter((val, index) => chipDataProduct.includes(val.title))

        var response = await ProductGroupSave({ groupdata: usergroup, productdata: p.map(val => val.id), action: 'savegroupproducts' })

    }

    // End Products
    const onhandleChangeusertype = (e) => {
        setUsertype(e.target.value)

    }
    const onhandleChangecategory = (e) => {
        setUsercategory(e.target.value)
    }

    const onhandleChange = (e) => {
        setUservalues({
            ...uservalues,
            [e.target.id]: e.target.value
        })
    }

    const userstatusUpdate = (status) => {
        if (status == "success") {
            setUsercreatedmessage("User Changed Successfully")
            setOpen(true)
            setAlertseverity('success')

        } else {
            setUsercreatedmessage("Something is went wrong")
            setOpen(true)
            setAlertseverity('error')
        }
    }

    // Chips

    const handleAddChip = (chips) => {

        chipData.push(chips)
    }
    const handleAddChipProduct = (chips) => {

        chipDataProduct.push(chips)
    }

    const onUpdateInput = async (chip) => {

        var response = await getUsernameChips({ value: chip.target.value, action: 'Getusername' })
        setChipuser(response.users)



    }

    const onUpdateInputProduct = async (chip) => {

        var response = await getProductChips({ value: chip.target.value, action: 'getproduct' })
        setChipproduct(response.products)




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
    const vertical = "top"
    const horizontal = "right"
    return (
        <div>
            {/* <ModelDialogue /> */}

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertseverity}>
                    {usercreatedmessage}
                </Alert>
            </Snackbar>
            <Grid container style={{ marginBottom: '2%' }} spacing={2}>
                <Grid item md={6} xs={12} sm={12}>

                    <Card>
                        <Box p={1}>
                            <Typography>
                                Create User
                            </Typography>
                        </Box>

                        <Box p={2} className={calsses.root}>


                            <TextField id="username" label="Username" variant="outlined"
                                InputLabelProps={{
                                    shrink: uservalues.username ? true : false
                                }}

                                value={uservalues.username}
                                onChange={onhandleChange}
                                fullWidth
                            />


                            <br></br>
                            <TextField id="password" label="Password" variant="outlined"
                                InputLabelProps={{
                                    shrink: uservalues.password ? true : false
                                }}

                                value={uservalues.password}
                                onChange={onhandleChange}
                                fullWidth
                                style={{ marginTop: '30px' }}
                            />


                            <br></br>

                            <TextField id="phone" label="phone" variant="outlined"
                                InputLabelProps={{
                                    shrink: uservalues.phone ? true : false
                                }}

                                value={uservalues.phone}
                                onChange={onhandleChange}
                                fullWidth
                                style={{ marginTop: '30px' }}
                            />
                            <br></br>


                            <FormControl fullWidth>
                                <InputLabel value={usertype} id="usertype">Type</InputLabel>

                                <Select
                                    labelId="usertype"
                                    id="usertype"
                                    variant="outlined"
                                    name="usertype"
                                    value={usertype}
                                    style={{ marginTop: '30px' }}
                                    onChange={onhandleChangeusertype}


                                >
                                    <MenuItem value={""}>Choose Type of User</MenuItem>
                                    <MenuItem value={"user"}>User</MenuItem>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                    <MenuItem value={"superuser"}>SuperUser</MenuItem>
                                </Select>
                            </FormControl>


                            <br></br>
                            <FormControl fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    variant="outlined"
                                    name="category"
                                    style={{ marginTop: '30px' }}
                                    value={usercategory}
                                    onChange={onhandleChangecategory}



                                >
                                    <MenuItem value={""}>Choose Category of User</MenuItem>
                                    <MenuItem value={"producer"}>Producer</MenuItem>
                                    <MenuItem value={"creator"}>Creator</MenuItem>

                                </Select>
                            </FormControl>
                            <br></br>


                            <Box pl={1} pt={2}>
                                <Button

                                    type="button" onClick={handleSubmit} color="primary" variant="contained">Create</Button>
                            </Box>








                        </Box>
                    </Card>
                </Grid>

                <Grid item md={6} xs={12} sm={12}>
                    <Card style={{ height: '100%' }}>
                        <Box p={1}>
                            <Typography>
                                Create Assign
                            </Typography>
                        </Box>

                        <Box p={2} className={calsses.root}>




                            <FormControl fullWidth>
                                {/* <InputLabel id="userlist">Users</InputLabel>

                                <Select
                                    labelId="userlist"
                                    id="userlist"
                                    variant="outlined"
                                    name="userlist"
                                    value={userlist}
                                    // style={{marginTop:'30px'}}
                                    onChange={(e) => setUserlist(e.target.value)}


                                >
                                    <MenuItem value="">Choose User</MenuItem>
                                    {userslistdata.map((val, index) => {
                                        return <MenuItem key={val.id} value={val.id}>{val.username}</MenuItem>
                                    })}
                                </Select> */}

                                {/* <TextareaAutosize aria-label="empty textarea" placeholder="Empty" /> */}
                            </FormControl>
                            <br></br>
                            Users:
                            <Paper component="ul" className={calsses.chiproot}>

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
                            Products:
                            <Paper component="ul" className={calsses.chiproot}>

                                <ChipInput
                                    onUpdateInput={(chip) => onUpdateInputProduct(chip)}
                                    disableUnderline={false}
                                    variant="outlined"
                                    value={chipDataProduct}
                                    onAdd={(chip) => handleAddChipProduct(chip)}
                                    onDelete={(chip, index) => handleDeleteChipProduct(chip, index)}
                                />
                                {/* {chipuser.map((val,index) => {
                                return <p key={index}>{JSON.stringify(val.username)}</p>
                                })} */}
                                <Box pt={3} display="flex" justifyContent="space-between">
                                    <Producticonlist chipuser={chipproduct} chipdata={chipDataProduct} handleAddChip={handleAddChipProduct} handleDeleteChip={handleDeleteChipProduct} />
                                </Box>
                                {/* {productlistdata.map((val, index) => {
                                        return <MenuItem key={val.id} value={val.id}>{val.title}</MenuItem>
                                    })} */}
                            </Paper>
                            <br></br>
                            {/* <Paper component="ul" className={calsses.chiproot}>
                                {chipData.map((data) => {


                                    return (
                                        <li key={data.key}>
                                            <Chip
                                                icon={<TagFacesIcon />}
                                                label={data.label}
                                                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                                className={calsses.chip}
                                            />
                                        </li>
                                    );
                                })}
                            </Paper> */}
                            <br></br>


                            <Box pl={1} pt={2}>
                                <Button

                                    type="button" onClick={AssignhandleSubmit} color="primary" variant="contained">Assign Poroducts</Button>
                                    &nbsp; <Button

                                    type="button" onClick={AssignhandleGroupSubmit} color="primary" variant="contained">Group Assign Poroducts</Button>
                            </Box>

                            <br></br>


                        </Box>

                    </Card>


                </Grid>

            </Grid>
            <Grid container>
                <Grid item md={12} xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel id="usergroup">Groups</InputLabel>

                        <Select
                            labelId="usergroup"
                            id="usergroup"
                            variant="outlined"
                            name="usergroup"
                            value={usergroup}
                            // style={{marginTop:'30px'}}
                            onChange={(e) => setUsergroup(e.target.value)}


                        >
                            <MenuItem value="">Choose Group</MenuItem>
                            {usersgroupdata.map((val, index) => {
                                return <MenuItem key={val.id} value={val.id}>{val.groupname}({val.rule})</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TableMaterialuser usergroup={usergroup} userstatusupdate={userstatusUpdate} />
                </Grid>
            </Grid>
        </div>
    )
}

export default UsersList
