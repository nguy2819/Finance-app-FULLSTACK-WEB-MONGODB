import React from 'react';

export default function({ id, month, homebills, loans, grocery, eatingout, transportationfees, shopping, medicalbills, deleteAction, updateAction }){
    return(
        <div className="card">
            <h1 className="header">{month}</h1>
            <p> &#x26FA; Home & Utilities Bills: ${homebills}</p>
            <p>Loans: ${loans}</p>
            <p>Grocery: ${grocery}</p>
            <p>Eating Out: ${eatingout}</p>
            <p>Transportation Fees: ${transportationfees}</p>
            <p>Shopping: ${shopping}</p>
            <p>Medical Bills: ${medicalbills}</p>
            <span>
                <button className="header" onClick={e => deleteAction(e, id)}>Delete</button>
                <button className="header" onClick={e => updateAction(e, id)}>Edit</button>
            </span>
        </div>
    )
}
