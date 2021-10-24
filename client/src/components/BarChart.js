import React from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

// gotta import workouts
function BarChart() {
      
    let today = new Date();
    let year = today.getFullYear();

    const workouts = useSelector(state => state.user.user.workouts)
    if(workouts === null) {return (<> <Line 
            data={{
                // months
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Lowerbody workouts',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                    backgroundColor: "pink",
                    borderColor: "pink",
                    borderWidth: 1
                },
                {
                    label: "# of Upperbody workouts",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 1
                },
                {
                    label: "# of Full body workouts",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                    backgroundColor: "yellow",
                    borderColor: "yellow",
                    borderWidth: 1
                },
                {
                    label: "# of Cardio workouts",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 1
                },
                {
                    label: "# of Core workouts",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 1
                },

            ],
            }}
            height={400}
            width={400}
            />
            </>)}
    console.log("workouts: ", workouts)    
        
    const data_upper = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    const data_lower = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    const data_full = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    const data_cardio = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    const data_core = { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 }
    
    const dataUpper = []
    const dataLower = []
    const dataFull = []
    const dataCardio = []
    const dataCore = []

    

    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    workouts.forEach( (workout) => {

        const wo_month = workout.session_date.split("-")[1]
        const wo_year = workout.session_date.split("-")[0]

        months.forEach( (month) => {
            if(workout.exercise_section === "upper" && wo_month === month && wo_year === "2021") {data_upper[month] += 1} 
           
         else if(workout.exercise_section === "lower" && wo_month === month && wo_year === "2021") {data_lower[month] += 1} 
           
         else if(workout.exercise_section === "full" && wo_month === month && wo_year === "2021") {data_full[month] += 1} 
           
         else if( workout.exercise_section === "core" && wo_month === month && wo_year === "2021") {data_core[month] += 1}
           
          else if(workout.exercise_is_cardio === true && wo_month === month && wo_year === "2021") {data_cardio[month] += 1} 
            
        } )


    } ) 


    dataUpper.push(data_upper["01"])    
    dataUpper.push(data_upper["02"])    
    dataUpper.push(data_upper["03"])    
    dataUpper.push(data_upper["04"])    
    dataUpper.push(data_upper["05"])    
    dataUpper.push(data_upper["06"])    
    dataUpper.push(data_upper["07"])    
    dataUpper.push(data_upper["08"])    
    dataUpper.push(data_upper["09"])    
    dataUpper.push(data_upper["10"])    
    dataUpper.push(data_upper["11"])    
    dataUpper.push(data_upper["12"])    

    
    dataLower.push(data_lower["01"])    
    dataLower.push(data_lower["02"])    
    dataLower.push(data_lower["03"])    
    dataLower.push(data_lower["04"])    
    dataLower.push(data_lower["05"])    
    dataLower.push(data_lower["06"])    
    dataLower.push(data_lower["07"])    
    dataLower.push(data_lower["08"])    
    dataLower.push(data_lower["09"])    
    dataLower.push(data_lower["10"])    
    dataLower.push(data_lower["11"])    
    dataLower.push(data_lower["12"])    

    dataFull.push(data_full["01"])    
    dataFull.push(data_full["02"])    
    dataFull.push(data_full["03"])    
    dataFull.push(data_full["04"])    
    dataFull.push(data_full["05"])    
    dataFull.push(data_full["06"])    
    dataFull.push(data_full["07"])    
    dataFull.push(data_full["08"])    
    dataFull.push(data_full["09"])    
    dataFull.push(data_full["10"])    
    dataFull.push(data_full["11"])    
    dataFull.push(data_full["12"])    

    dataCore.push(data_core["01"])    
    dataCore.push(data_core["02"])    
    dataCore.push(data_core["03"])    
    dataCore.push(data_core["04"])    
    dataCore.push(data_core["05"])    
    dataCore.push(data_core["06"])    
    dataCore.push(data_core["07"])    
    dataCore.push(data_core["08"])    
    dataCore.push(data_core["09"])    
    dataCore.push(data_core["10"])    
    dataCore.push(data_core["11"])    
    dataCore.push(data_core["12"])    

    dataCardio.push(data_cardio["01"])    
    dataCardio.push(data_cardio["02"])    
    dataCardio.push(data_cardio["03"])    
    dataCardio.push(data_cardio["04"])    
    dataCardio.push(data_cardio["05"])    
    dataCardio.push(data_cardio["06"])    
    dataCardio.push(data_cardio["07"])    
    dataCardio.push(data_cardio["08"])    
    dataCardio.push(data_cardio["09"])    
    dataCardio.push(data_cardio["10"])    
    dataCardio.push(data_cardio["11"])    
    dataCardio.push(data_cardio["12"])    



    // for (let i = 1; i < Object.keys(data_upper).length; i++) {
    //     // const keys = Object.keys(data_upper)
    //     // console.log("keys: ", keys)
    //     if(i < 9) { dataUpper.push( data_upper[`${0}${i}`] ) }
    //     else { dataUpper.push(data_upper[i] ) }
    //     // console.log("data upper: ", dataUpper)
        
    // }
//     Object.keys(data_upper).forEach((key) => {
//         dataUpper.push(data_upper[key])
//     })
//     Object.keys(data_lower).forEach((key) => {
//         dataLower.push(data_lower[key])
//     })
//     Object.keys(data_full).forEach((key) => {
//         dataFull.push(data_full[key])
//     })
//     Object.keys(data_cardio).forEach((key) => {
//         dataCardio.push(data_cardio[key])
//     })
//     Object.keys(data_core).forEach((key) => {
//         dataCore.push(data_core[key])
//     })
//   console.log("data_upper: ", data_upper)
//   console.log("data_lower: ", data_lower)
//   console.log("data_full: ", data_full)
//   console.log("data_cardio: ", data_cardio)
//   console.log("data_core: ", data_core)
 
  console.log("data_upper: ", dataUpper)
  console.log("data_lower: ", dataLower)
  console.log("data_full: ", dataFull)
  console.log("data_cardio: ", dataCardio)
  console.log("data_core: ", dataCore)
    
    return (
        <div>
           
            <Line 
            data={{
                // months
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Lowerbody workouts',
                    data: dataLower,
                    backgroundColor: "pink",
                    borderColor: "pink",
                    borderWidth: 1
                },
                {
                    label: "# of Upperbody workouts",
                    data: dataUpper,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 1
                },
                {
                    label: "# of Full body workouts",
                    data: dataFull,
                    backgroundColor: "yellow",
                    borderColor: "yellow",
                    borderWidth: 1
                },
                {
                    label: "# of Cardio workouts",
                    data:  dataCardio,
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 1
                },
                {
                    label: "# of Core workouts",
                    data:  dataCore,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 1
                },

            ],
            }}
            height={400}
            width={400}
            
            />
            
            
            
        </div>
    )
}

export default BarChart
