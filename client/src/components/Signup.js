import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, Checkbox, CircularProgress, Grid2, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async() => {
        try{
            setLoading(true)
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {email, password})

            console.log(result)

            if(result?.data?.success){
                navigate("/login", {replace: true})
            }
            setLoading(false)
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

  return (
    <Box
        sx={{
            backgroundColor:'rgb(193, 229, 233)', 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Grid2 container spacing={2} sx={{width: '60%', border: '1px solid black', padding: '20px', borderRadius: '8px',}}>
            <Grid2 size={{xs: 12, md: 12}}>
                <Typography sx={{fontWeight: 'bold', textAlign: 'center'}}>Signup</Typography>
            </Grid2> 
            <Grid2 size={{xs: 12, md: 12}} sx={{marginBottom: '10px'}}>
                <TextField
                    label='Enter Email'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                        width: '100%'
                    }}
                />
            </Grid2>
            <Grid2 size={{xs: 12, md: 12}}>
                <TextField
                    label='Enter Password'
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    
                    sx={{
                        width: '100%'
                    }}
                />
            </Grid2>
            <Grid2 sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Checkbox
                    value={showPassword}
                    onChange={()=>setShowPassword(!showPassword)}
                />
                <Typography>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                </Typography>
            </Grid2>
            <Grid2 sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Button 
                    variant='contained' 
                    sx={{
                        backgroundColor: "black", 
                        color: "white"
                    }}
                    onClick={handleSubmit}
                    disabled={(loading || !email || !password )}
                >
                    {
                        loading ? 
                        <CircularProgress size='22px' color='white'/> : 'Submit'
                    }
                </Button>
            </Grid2>
            <Grid2 sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Link to="/login">
                    Already have an account? Login
                </Link>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default Signup