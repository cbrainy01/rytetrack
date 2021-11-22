import React, {useState} from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

function BarChart() {
      
    let today = new Date();
    let currentYear = today.getFullYear().toString();
    const [selectedYear, setSelectedYear] = useState(currentYear)

    const workouts = useSelector(state => state.user.user.workouts)   
            
    const dataUpper = []
    const dataLower = []
    const dataFull = []
    const dataCardio = []
    const dataCore = []

    // const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const store = {"01": {},"02": {},"03": {},"04": {},"05": {},"06": {},"07": {},"08": {},"09": {},"10": {},"11": {},"12": {},}
    // filter workouts so were only dealing with workouts from current year/selected year
    const selectedYearsWorkouts = workouts.filter( (workout) => {  if(workout.session_date.split("-")[0] === selectedYear) {return true} } )
    // console.log("filtered workouts: ", selectedYearsWorkouts)
    // go through all workouts and use frequency counter to store how many times each type of workout appears
    selectedYearsWorkouts.forEach( (workout) => {
        
        const wo_month = workout.session_date.split("-")[1]

        // if theres no existing record in store for that exercise section, create one
        if( store[wo_month][workout.exercise_section] === undefined ) { store[wo_month][workout.exercise_section] = 1 }
        else if( store[wo_month]["cardio"] === undefined && workout.is_cardio === true ) { store[wo_month]["cardio"] = 1 }
        else if( store[wo_month]["cardio"] !== undefined && workout.is_cardio === true ) { store[wo_month]["cardio"] += 1}  
        else if( store[wo_month][workout.exercise_section] !== undefined ) { store[wo_month][workout.exercise_section] += 1 }

    } ) 
    console.log("summary: ", store)
    console.log("keys: ", Object.keys(store).sort() ) 
// keys of store need to be sorted so months can appear in order. (Object.keys disregards order)
    const months = Object.keys(store).sort()
    // iterate over each month. push values into corresponding data array. If theres no section value for that month, push 0 into array
    months.forEach( (month) => {
        store[month]["upper"] ? dataUpper.push(store[month].upper) : dataUpper.push(0)
        store[month]["lower"] ? dataLower.push(store[month].lower) : dataLower.push(0)
        store[month]["full"] ? dataFull.push(store[month].full) : dataFull.push(0)
        store[month]["core"] ? dataCore.push(store[month].core) : dataCore.push(0)
        store[month]["cardio"] ? dataCardio.push(store[month].cardio) : dataCardio.push(0)

    } )    
 
    return (
        <div>
           <label for="yearselector">Set year: </label>
           <select onChange={(e) => setSelectedYear(e.target.value)}>
               <option value={currentYear}>current year</option>
               <option value="2018">2018</option>
               <option value="2019">2019</option>
               <option value="2020">2020</option>
               <option value="2021">2021</option>
               <option value="2022">2022</option>
           </select>
            <Line 
            data={{
                // months
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: '# of Lowerbody workouts',
                    data: dataLower,
                    backgroundColor: "purple",
                    borderColor: "purple",
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
