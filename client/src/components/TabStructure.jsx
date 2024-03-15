import React from 'react'
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TabStructure = ({ tabs = [], toggleState, toggleTab }) => {

    return (
        <div className='mb-5'>
            <div className="bloc-tabs">
                {(tabs.length > 0) ? tabs.map((item, index) => (
                    <button key={index} disabled={item?.disableTab} className={toggleState === index ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(index)}
                    >
                        <h6 style={{ fontWeight: '450', margin: 'auto', fontSize: '16px' }}>{item.name}</h6>
                    </button>
                )) : (
                    <button className={toggleState === 0 ? "tabs active-tabs" : "tabs"}>
                        <h6 style={{ fontWeight: '450', margin: 'auto', fontSize: '16px' }}>
                            <FontAwesomeIcon icon={faBan} size='lg' className='text-danger' />
                        </h6>
                    </button>
                )}
            </div>
            <div className="content-tabs">
                {(tabs.length > 0) ? tabs.map((item, index) => (
                    <div key={index} className={toggleState === index ? "content active-content" : "content"}>
                        {item?.content ? item.content : <div className='text-center'>No content to show</div>}
                    </div>
                )) : (
                    <div className={toggleState === 0 ? "content active-content text-center" : "content"}>
                        No content to show
                    </div>
                )}
            </div>
        </div>
    )
}
export default TabStructure;