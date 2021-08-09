import React from 'react'
import './Footer.css'
export default function MyFooter() {
    return (
        <div className="footer">
    <div className='Copyright'>
      Copyright &copy; {new Date().getFullYear()} {' '}
        <a className='Adharsh' href="https://adharshrj.github.io">
          Adharsh RJ.  
        </a>
        <a> All Rights Reserved.</a>
      </div>
    </div>
    );
}
