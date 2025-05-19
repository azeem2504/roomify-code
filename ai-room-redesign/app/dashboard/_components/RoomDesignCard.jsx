import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDiag from './AiOutputDiag';

function RoomDesignCard({ room }) {
    const [openDiag, setOpenDiag] = useState(false)
    const onClickHandler = () => {
        setOpenDiag(true)
    }
    return (
        <div className='shadow-md rounded-md cursor-pointer' onClick={() => onClickHandler()}>
            <ReactBeforeSliderComponent
                firstImage={{
                    imageUrl: room?.orgImage
                }}
                secondImage={{
                    imageUrl: room?.aiImage
                }}
            />
            <div className='P-4'>
                <h2>🏠 Room Type: {room.roomType}</h2>
                <h2>🎨 Design Type: {room.designType}</h2>
            </div>
            <AiOutputDiag
                aiImage={room.aiImage}
                orgImage={room.orgImage}
                closeDiag={() => setOpenDiag(false)}
                openDiag={openDiag}
            />

        </div>
    )
}

export default RoomDesignCard
