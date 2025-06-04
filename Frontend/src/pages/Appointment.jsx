import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {
    const { doctorId } = useParams();
    const { doctors } = useContext(AppContext);

    const [doctorInfor, setDoctorInfor] = useState(null);
    const fetchDoctor = async () => {
        const doctorInfor = doctors.find(doc => doc._id === doctorId)
        setDoctorInfor(doctorInfor);
        //console.log('huynh: ', doctorInfor)
    }
    useEffect(() => {
        fetchDoctor();
    }, [doctors, doctorId])


    return (
        <div>

        </div>
    )
}

export default Appointment