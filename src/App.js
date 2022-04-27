import { useState, useEffect } from 'react';
import Cell from './Cell';
import './App.css';


const App = () =>  {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const twoDimensionArray = () => {
      let arr = [];
      // creating two dimensional array
      for (let i = 0; i< 50; i++) {
          for(let j = 0; j< 50; j++) {
              arr[i] = [];
          }
      }

      // inserting elements to array
      for (let i = 0; i< 50; i++) {
          for(let j = 0; j< 50; j++) {
              arr[i][j] = 0;
          }
      }
      setData(arr);
  }
  twoDimensionArray();
  }, []);

  useEffect(() => {
    const transposeData  = data && data[0]?.map((col, c) => data?.map((row, r) => data[r][c]));
    for (let i = 0; i< 50; i++) {
      // const x-axis
      if(fibonacciChecker(data[i],i,'row').length  >= 5){
        // console.log('ttt', fibonacciChecker(data[i],i,'row'))
        console.log('ttt', data[i], fibonacciChecker(data[i],i,'row'))
        setSelected(fibonacciChecker(data[i],i,'row'))
      }
      if(fibonacciChecker(transposeData && transposeData[i],i).length  >= 5){
        setSelected(fibonacciChecker(data[i],i))
      }
    }
  },[data])

  const fibonacciChecker = (arr,x,row) => {
    const list = arr || [];
    let counter = [];
      for (let i = 1; i< list.length; i++) {
        if(list[i] !== 0){
          // sum of the previous and current equals the next item
          if((list[i-1] + list[i] === list[i+1]) && list[i-1] !== 0){
              counter.push(row ? `${x},${i-1}` : `${i-1},${x}`);
          }
          // Get the last and the last-1 item
          else if(counter.length >= 3 && list[i-1] + list[i] !== list[i+1]){
            counter.push(row ? `${x},${i-1}` : `${i-1},${x}`);
            counter.push(row ? `${x},${i}` : `${i},${x}`);
            return counter;
          }
          else if(counter.length > 0){
            // clear the counter array
            counter = [];
          }
        }

      }
    return counter;
  }

  const handleClick = (x,y) => {
    const arr = [...data];

    // Increase cells in the same column (y-axis)
    for (let i = 0; i< 50; i++) {
      arr[i][y] =  arr[i][y] + 1;
    }
    // Increase cells in the same row (x-axis)
    arr[x] = arr[x].map((cell, index) => {
      if(index === y){
        return cell
      }
      return cell + 1;
    })
    setData(arr)
  }


  return (
    <div className="App">
      <div className="Grid">
      {data.map((items, index) => {
        return (
          <div className="row" key={index}>
            {items.map((subItems, sIndex) => {
              return(
                <Cell
                  key={`${index}_${sIndex}`} 
                  data={data} 
                  setData={setData}
                  subItems={subItems}
                  index={index}
                  sIndex={sIndex}
                  handleClick={handleClick}
                  selected={selected}
                />);
            })}
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
