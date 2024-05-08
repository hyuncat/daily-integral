import React from 'react';
import './CurrentDate.css';

function CurrentDate({ fontSize }) {
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        const now = new Date();
        const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const msUntilMidnight = nextDay - now;

        const timer = setTimeout(() => {
            setDate(new Date());
        }, msUntilMidnight);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <div className="current-date-container">
                <p className="current-date" style={{ fontSize: `${fontSize}` }}>
                    {date.toDateString().toLowerCase()}
                </p>
            </div>
        </>
    );
}

export default CurrentDate;