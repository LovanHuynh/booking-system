import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctor from '../components/RelatedDoctor';

const Appointment = () => {
    const { doctorId } = useParams();
    const { doctors, currentSymbol } = useContext(AppContext);
    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [doctorInfor, setDoctorInfor] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const fetchDoctor = async () => {
        const doctorInfor = doctors.find(doc => doc._id === doctorId)
        setDoctorInfor(doctorInfor);
        // console.log('huynh: ', doctorInfor)
    }
    useEffect(() => {
        fetchDoctor();
    }, [doctors, doctorId])
    // doan nay k hieu logic
    const getAvalibaleSlot = async () => {
        setDocSlots([])
        // getting current time
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i)
            //setting end time of the date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)
            //setting hour
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formatedDate = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                //add slot to array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formatedDate
                })
                //increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }

    }
    useEffect(() => {
        getAvalibaleSlot();
    }, [doctorInfor])
    useEffect(() => {
        //console.log("Data: ", docSlots)
    }, [docSlots])

    return doctorInfor && (
        <div>
            {/* doctor details */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img
                        className='bg-primary w-full sm:max-w-72 rounded-lg'
                        src={doctorInfor.image} alt="" />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* doctor: name, degree exprerience */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {doctorInfor.name}
                        <img className='w-5' src={assets.verified_icon} alt="" />
                    </p>
                    <div className='flex items-center gap-2 mt-1 text-sm font-medium text-gray-600'>
                        <p>{doctorInfor.degree}-{doctorInfor.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{doctorInfor.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About
                            <img src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{doctorInfor.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{currentSymbol}{doctorInfor.fees}</span>
                    </p>
                </div>
            </div>
            {/* Booking slot */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
                    {
                        docSlots.length && docSlots.map((items, index) => (
                            <div
                                onClick={() => setSlotIndex(index)}
                                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : " border border-gray-200"}`}
                                key={index}>
                                <p>{items[0] && dayOfWeek[items[0].datetime.getDay()]}</p>
                                <p>{items[0] && items[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
                    {
                        docSlots.length && docSlots[slotIndex].map((items, index) => (
                            <p
                                onClick={() => setSlotTime(items.time)}
                                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${items.time === slotTime ? 'bg-primary text-white' : ' text-gray-400 border border-gray-300'}`}
                                key={index}>
                                {items.time.toLowerCase()}
                            </p>
                        ))
                    }
                </div>
                <button className='bg-primary my-6 rounded-full px-14 py-3 text-white text-sm font-light'>Book an appoinment</button>
            </div>
            {/* list releated docotr */}
            <RelatedDoctor doctorId={doctorId} speciality={doctorInfor.speciality} />

        </div>
    )
}

export default Appointment