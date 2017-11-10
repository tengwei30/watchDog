import React from 'react';
import DTable from '../components/DTable/Chart.js';

export default class Meet extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <DTable />
            </div>
        )
    }
}