import { useEffect, useState, useRef } from "react";


const Cell = (props) => {
  const {index, sIndex, subItems, handleClick, selected, data, setData} = props;
  const [changeColor, setChangeColor] = useState('#FFFFFF');
  const ref = useRef(subItems)

  useEffect(() => {
  if(ref.current < subItems) {
   setChangeColor('#F7F2C7');
    setTimeout(() => {
        setChangeColor('#FFFFFF');
    }, 3000)
  }
  ref.current = subItems;
 
  }, [subItems])

  useEffect(() => {
    if(selected.includes(`${index},${sIndex}`)){
      setChangeColor('#93f2bf');
      setTimeout(() => {
          setChangeColor('#FFFFFF');
      }, 3000)
      const arr = [...data];
      arr[index][sIndex] =  0;
      setData(arr);
    }
  }, [index,sIndex, selected])
 


  return (<button className="box" style={{backgroundColor: changeColor}} onClick={() => handleClick(index,sIndex)}> 
       {subItems === 0 ? '' : subItems } 
  </button>);
}

export default Cell;