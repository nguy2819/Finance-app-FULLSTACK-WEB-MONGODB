import React from 'react';

export default function({ id, month, homebills, loans, grocery, eatingout, transportationfees, shopping, medicalbills, deleteAction, updateAction }){
    return(
        <div className="card">
            <h1 className="header">{month}</h1>
            <p>{homebills} Home & Utilities Bills</p>
            <p>{loans} Loans</p>
            <p>{grocery} Grocery</p>
            <p>{eatingout} Eating Out</p>
            <p>{transportationfees} Transportation Fees</p>
            <p>{shopping} Shopping</p>
            <p>{medicalbills} Medical Bills</p>
            <span>
                <button className="header" onClick={e => deleteAction(e, id)}>Delete</button>
                <button className="header" onClick={e => updateAction(e, id)}>Edit</button>
            </span>
        </div>
    )
}
