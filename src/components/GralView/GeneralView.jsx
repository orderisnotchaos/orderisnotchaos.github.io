import React from "react";
import "./GeneralView.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import {Line} from "react-chartjs-2";



export default function GeneralView(props){

    const colors = ["red","green","blue","yellow","orange","brown","lightblue","black","lightgreen","gray"];
        
    let totalIncome=0;
    
    let conicGradientArgs= "";

    let incomes = [];
    incomes = props.data.map((business)=>{
        let bIncome=0;
        business.Sales.forEach(sale=>{
            bIncome+=sale.value;
        })
        return bIncome;
    });

    function totalIncomeByDay(businesses) {
        const dailyTotalIncome = [];
        const days =[];

        businesses.forEach(business => {
          business.Sales.forEach(sale => {
            const day =new Date(sale.time).toISOString().split('T')[0];
            if(days[days.length-1] !== day){
                days.push(day);
                dailyTotalIncome.push(sale.value);
            }else{
                dailyTotalIncome[days.length-1] += sale.value; 
            }
          });
        });
        return {dailyTotalIncome,days};
      }
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
        let data =totalIncomeByDay(props.data);

        let businessesData ={
        labels: data.days,
        datasets: [{label: "ingresos diarios",
                    data: data.dailyTotalIncome,    
                    }]
        };        
        for(let i = 0; i<data.dailyTotalIncome.length;i++){

                totalIncome+=data.dailyTotalIncome[i];
        }

        let prevIncPer = 0;
        for(let i=0;i<incomes.length;i++){

            if(i+1 === incomes.length){
                let thisIncPer =((prevIncPer+incomes[i]/totalIncome*100));
                conicGradientArgs+= colors[i]+" "+prevIncPer+"% "+thisIncPer+"%";    
            }else{
                if(prevIncPer === 100) break;
                if(prevIncPer+incomes[i]/totalIncome*100 === 100){
                    conicGradientArgs+=colors[i]+" 0.00% 100%";
                    break;
                }
                conicGradientArgs+= colors[i]+" "+prevIncPer+"% "+(prevIncPer+incomes[i]/totalIncome*100)+"%, ";
                prevIncPer +=incomes[i]/totalIncome*100;
            }
        }
        if(totalIncome === 0){
            conicGradientArgs += "blue 0% 100%"
        }

    return(
        <React.Fragment>
            <div id="general-view-component" className="general-view"> 
                <div className="top-content">
                    <div className="general-view-row1">
                            <h3 className="general-view-h3">Ingresos del día</h3>
                    </div>
                    <div className="general-view-row2">

                        <div className="pie-chart-container">
                            <div id="pie-chart" className="pie-chart" style={{background:`conic-gradient(${conicGradientArgs})`}} ></div>
                        </div>

                        <div id="income-chart" className="income-chart-container">
                            <ul className="businesses-profits">
                                {props.data.map((business,i)=>{

                                    return(
                                        <>
                                            <li className="business-name" key={business.name}><div className={totalIncome === 0? "zero-color":`pie-chart-color-${colors[i]}`}></div><p className="business-name-p">{business.name}:</p></li>
                                            <li className="business-income" key={business.name+business.income}> ${incomes[i]}</li>
                                            <li className="business-income-percentage"  key={business.name+"%"}>{totalIncome === 0 ? 0 : (incomes[i]/totalIncome*100).toFixed(2)}%</li>
                                        </>
                                    );
                                })}
                                <ul className="total-income-container">
                                    <li className="total-income-text"><div className="total-color"></div>total: </li>
                                    <li className="total-income-number">${totalIncome}</li>
                                    <li className="total-income-percentage">100%</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="general-view-row-3">

                    <Line data={businessesData}/>
                </div>
            </div>
        </React.Fragment>
    );
}