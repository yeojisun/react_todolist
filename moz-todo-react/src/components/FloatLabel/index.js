import React, { useState } from 'react';

import Styled from './Styled';

const FloatLabel = (props) => {
    const [focus, setFocus] = useState(false);
    const { children, label, value } = props;

    const labelClass = focus || (value && value.length !== 0) ? 'label label-float' : 'label';

    return (
        <Styled>
            <div
                className="float-label"
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
            >
                {children}
                <label className={labelClass}>{label}</label>
            </div>
        </Styled>
    );
};

export default FloatLabel;