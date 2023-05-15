import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/base';
import { Link } from 'react-router-dom';
import { AppState } from '../App';
import LoginIcon from '@mui/icons-material/Login';
const Header = () => {
    const useAppState =  useContext(AppState);
    return (
        <div className=' sticky top-1 p-2 z-10 bg-black text-4xl text-red-500 font-bold border-b-2 border-gray-500 flex justify-between items-center'>
            <Link to={'/'}>
            <span> Book
                <span className="text-white">
                    Reviewer
                </span>
            </span>
            </Link>
            {
            useAppState.login?
            <Link to={'/addbook'}><h1 className='text-lg flex items-center justify-center cursor-pointer'>
                <Button > <AddIcon className='mr-1' color='secondary' />
                    <span className='text-white mr-2'>ADD NEW</span>
                </Button>
            </h1>
            </Link>
            :
            <Link to={'/login'}><h1 className='text-lg flex items-center justify-center cursor-pointer'>
                <Button >
                    <LoginIcon className='mr-1' color='secondary' />
                    <span className='text-white mr-2'>Login</span>
                </Button>
            </h1>
            </Link>
            }
        </div>
    )
}

export default Header