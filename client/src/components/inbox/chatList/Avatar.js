import React from "react";

export const Avatar = ({ image, isOnline }) => {

    return (
        <div className="avatar">
            <div className="avatar-img">
                <img src={image} alt="#" />
            </div>
            {isOnline === 'active' && (
                <span className={`isOnline active`}></span>
            )}
        </div>
    );

}