import Button from '../../components/button/button'
import Account from '../../components/account/account';
import EditButton from '../../components/editButton/editButton';

import accountInformation from '../../data/accountInformation/accountInformation';

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGetProfile } from "../../redux/reducers/profileSlice"

import { useNavigate } from 'react-router-dom';

function User() {
    const token = useSelector(state => state.userAuth.token)
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        if(!token){
            navigate('/signin');
            return
        }
        const fetchDataUser = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                const data = await response.json()
                dispatch(setGetProfile({ data }))
            } catch (err) {
                console.log(err)
            }
        }
        fetchDataUser()
    }, [token,navigate])
    
    return (
    <div className="main  bg-dark">
        <div className="header">
            <h1>Welcome back<br />{profile.firstName + " " + profile.lastName + "!"}</h1>
            <EditButton
            className={'edit-button'}
            name={'Edit Name'}
            />
        </div>
        <h2 className="sr-only">Accounts</h2>
            {accountInformation.map((info, index) => (
            <Account
                key={index} 
                title={info.title}
                amount={info.amount} 
                description={info.description} 
            >
                <Button
                className={'transaction-button'}
                name={'View transactions'}
                />
            </Account>    
            ))}  
    </div>
    );
}

export default User