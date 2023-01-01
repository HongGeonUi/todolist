import React from 'react';
import '../css/Form.css';

const Form = ({value, onChange, onCreate, onKeyDown}) => {
    return (
        <div className="form">
            <input
                value={value}
                placeholder="2023년 목표를 입력하세요"
                onChange={onChange}
                onKeyDown={onKeyDown} />
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
        </div>
    );
};

export default Form;