import React from 'react';
import useLocalStorage from '../hook/useLocalStorage';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../store/redux/user-data-slice';
import { userAccountDataActions } from '../store/redux/user-account-data';
import { useIonRouter } from '@ionic/react';
import { useEffect } from 'react';

export default function Logout() {
    const dispatch = useDispatch();
    const router = useIonRouter();
    const [value, saveValueToLocalStorage, clearValueFromLocalStorage] =
    useLocalStorage("useLogin", {});
    useEffect(()=>{
        clearValueFromLocalStorage();
        dispatch(userDataActions.setData({field:'user_id', data:0}));
        dispatch(userDataActions.setData({field:'token', data:''}));
        dispatch(userAccountDataActions.resetState());
        router.push("/landing", "forward", "refresh");
    },[]);
    
}
