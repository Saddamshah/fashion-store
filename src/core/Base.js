import React from 'react'
import Navbar from './Navbar'

const Base = ({className="", children }) => (
    <div>
        <Navbar/>
        <div className="margintopspace">
            <div className={className}>
              <div>{children}</div>
            </div>
        </div>
        
        <div className="marginbottomspace pt-4"></div>
        <footer className=" blackBG footer py-4">
            <div className="container-fluid " >
                <div className="row text-white" style={{fontSize: "14px", letterSpacing: "1.4px"}}>
                    <div className="col-sm-12 col-md-6 footerText">Copyright © 2020 All rights reserved</div>    
                    <div className="col-md-6 col-sm-12 pr-4 footerImage"><img src="https://onlineimage.netlify.app/images/payment-cart.png" /></div>
                </div>
            </div>
        </footer>        
    </div>
)

export default Base;
