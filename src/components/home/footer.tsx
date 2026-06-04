import React from 'react'
import { FooterTop } from '../container/footer-top'
import FooterMiddle from '../container/footer-middle'
import { FooterBottom } from '../container/footer-botton'

 export const Footer = () => {
  return (
    <footer className="w-full">
         <FooterTop />
          <FooterMiddle />
           <FooterBottom />
      
    </footer>
  )
}

 