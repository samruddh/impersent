import React, {useState,useEffect} from 'react';
import '../../App.css';
import Footer from '../Footer';

function Count(){

  const [count, setCounts] = useState({});
  const [hasError, setErrors] = useState(false);

  useEffect(()=>{
    async function fetchData() {
      const res = await fetch("http://localhost:8000/api/count");
      res
        .json()
        .then(res => setCounts(res))
        .catch(err => setErrors(err));
    }
    fetchData();
  });

    return(
      <>
      <h1 className="count">Total battle count:{JSON.stringify(count)}</h1>
      <Footer />
      </>
    )


}
export default Count;
