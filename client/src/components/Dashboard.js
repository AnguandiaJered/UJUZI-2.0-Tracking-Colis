import React,{ Fragment } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Dashboard = () =>{
    const data = [
        {
          name: 'Jan',
          "Active Colis": 4000,
        },
        {
            name: 'Feb',
            "Active Colis": 3000,
        },
        {
            name: 'Mar',
            "Active Colis": 5000,
        },
          {
            name: 'Apr',
            "Active Colis": 4000,
          },
          {
            name: 'May',
            "Active Colis": 3000,
          },
          {
            name: 'Jun',
            "Active Colis": 2000,
          },
          {
            name: 'Jul',
            "Active Colis": 4000,
          },
          {
            name: 'Agu',
            "Active Colis": 3000,
          },
          {
            name: 'Sep',
            "Active Colis": 4000,
          },
          {
            name: 'Act',
            "Active Colis": 1000,
          },
          {
            name: 'Nov',
            "Active Colis": 4000,
          },
          {
            name: 'Dec',
            "Active Colis": 3000,
          },
    
      ];
    return(
        <Fragment>
            <div className='dashboards container-fluid'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-title mt-3 ml-4">
                            <h1 className="titre">SYSTEM TRACKING COLIS
                                <small className="ml-3">Ujuzi Tracking</small>
                            </h1>
                            <div className="container-fluid">
                                <ol className="breadcrumb">
                                    <li className="active"><i className="fa fa-dashboard"></i> Dashboard</li>
                                </ol>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="row container ml-3">
                    <div className="col-md-4 futuredItem ">
                        <span className="futuredTitle">Colis</span>
                        <div className="futuredMoneyContainer">
                            <span className="futuredMoney">2.415</span>
                        </div>
                        <span className="futuredSub">Compared to last month</span>
                    </div>

                    <div className="col-md-4 futuredItem">
                        <span className="futuredTitle">Clients</span>
                        <div className="futuredMoneyContainer">
                            <span className="futuredMoney">4.415</span>                           
                        </div>
                        <span className="futuredSub">Compared to last month</span>
                    </div>
                    <div className="col-md-4 futuredItem">
                        <span className="futuredTitle">Expeditions</span>
                        <div className="futuredMoneyContainer">
                            <span className="futuredMoney">2.225</span>
                        </div>
                        <span className="futuredSub">Compared to last month</span>
                    </div>
                </div>
                <div className="chart">
                    <h3 className="chartTitle">Sales Analytics</h3>
                    <ResponsiveContainer width="100%" aspect={4 / 1}>
                        <LineChart data={data} >                 
                            <XAxis dataKey="name" stroke="#5550bd"/>
                            <YAxis />                           
                            <Line type="monotone" dataKey="Active Colis" stroke="#5550bd" activeDot={{ r: 8 }} />
                            <Tooltip />
                            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard;