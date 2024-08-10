import React, { useState } from 'react';
import './payments.scss';

const PaymentsComponent = () => {
    const paymentsDue = [
        { dueDate: '2022/10/01', status: 'Pending', referenceNumber: '' },
        { dueDate: '2022/09/01', status: 'Due date passed', referenceNumber: '' },
    ];

    const [paymentHistory] = useState([
        { dueDate: '2022/08/01', doneDate: '2022/04/01', referenceNumber: 'REF123456' },
        { dueDate: '2022/07/01', doneDate: '2022/04/01', referenceNumber: 'REF234567' },
        { dueDate: '2022/06/01', doneDate: '2022/04/01', referenceNumber: 'REF345678' },
        { dueDate: '2022/05/01', doneDate: '2022/04/01', referenceNumber: 'REF456789' },
    ]);

    const [duePayments, setDuePayments] = useState(paymentsDue);

    const handleReferenceChange = (index, e) => {
        const updatedDuePayments = [...duePayments];
        updatedDuePayments[index].referenceNumber = e.target.value;
        setDuePayments(updatedDuePayments);
    };

    const handleSubmit = (index) => {
        // Logic to handle submission of reference numbers
        console.log('Reference number submitted:', duePayments[index].referenceNumber);
    };

    return (
        <div className="payments-container">
            <div className="section payments-due">
                <h2>Payments Due</h2>
                <ul>
                    {duePayments.map((payment, index) => (
                        <li key={index} className={payment.status === 'Due date passed' ? 'overdue' : ''}>
                            <span>Payment Due : {payment.dueDate}</span>
                            <span className="status">{payment.status}</span>
                            <input
                                type="text"
                                placeholder="Enter reference number"
                                value={payment.referenceNumber}
                                onChange={(e) => handleReferenceChange(index, e)}
                                className="reference-input"
                            />
                            <button
                                className="submit-btn"
                                onClick={() => handleSubmit(index)}
                            >
                                Submit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="section payment-history">
                <h2>Payment History</h2>
                <ul>
                    {paymentHistory.map((payment, index) => (
                        <li key={index}>
                            <span>Payment Due : {payment.dueDate}</span>
                            <span>Payment Done : {payment.doneDate}</span>
                            <span>Reference Number : {payment.referenceNumber}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PaymentsComponent;
