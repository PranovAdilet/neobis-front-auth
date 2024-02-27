import React from 'react';
import image from "../assets/images/login.png"

const Success = () => {
    return (
        <div className="logged">
            <div className="logged__content">
                <h2 className="logged__title">С возвращением!</h2>
                <p className="logged__text">Lorby - твой личный репетитор</p>
                <img className="logged__img" src={image} alt=""/>
                <button className="logged__btn">Выйти</button>
            </div>
        </div>
    );
};

export default Success;