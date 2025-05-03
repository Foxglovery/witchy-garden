import React, { useState } from 'react';

const HypertufaCalculator = () => {
    const [cement, setCement] = useState('');
    const [peatMoss, setPeatMoss] = useState('');
    const [perlite, setPerlite] = useState('');
    const [total, setTotal] = useState(0);

    const calculateMix = () => {
        const cementValue = parseFloat(cement) || 0;
        const peatMossValue = parseFloat(peatMoss) || 0;
        const perliteValue = parseFloat(perlite) || 0;

        const totalMix = cementValue + peatMossValue + perliteValue;
        setTotal(totalMix);
    };

    return (
        <div>
            <h2>Hypertufa Mixing Calculator</h2>
            <div>
                <label>
                    Cement (parts):
                    <input
                        type="number"
                        value={cement}
                        onChange={(e) => setCement(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Peat Moss (parts):
                    <input
                        type="number"
                        value={peatMoss}
                        onChange={(e) => setPeatMoss(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Perlite (parts):
                    <input
                        type="number"
                        value={perlite}
                        onChange={(e) => setPerlite(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={calculateMix}>Calculate</button>
            <div>
                <h3>Results</h3>
                <p>Total Mix: {total} parts</p>
                {total > 0 && (
                    <p>
                        Ratio: {cement}:{peatMoss}:{perlite}
                    </p>
                )}
            </div>
        </div>
    );
};

export default HypertufaCalculator;