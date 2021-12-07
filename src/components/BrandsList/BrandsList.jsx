import { Card } from 'antd';
import React, { useContext, useEffect } from 'react';
import { brandsContext } from '../../contexts/brandsContext';

const BrandsList = () => {
    const {getBrands, brands}= useContext(brandsContext)

    useEffect(()=>{
        getBrands() 
    },[])

    return (
        <div className="container" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
            {brands.map((item)=>(
                  <Card
                  hoverable
                  style={{ width: '240px', margin: '10px', height:'240px' }}
                  cover={<img alt="example" src={item.logo} />}
                />
            ))}
        </div>
    );
};

export default BrandsList;