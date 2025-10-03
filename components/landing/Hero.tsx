import React from 'react'

const Hero = () => {
  return (
    <div className='pt-32 min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker'>
     {/*  #1C1849, #05051E this is be the gradient background from top left corner to bottom right corner */}
     <div className='app-container bg-red-500'>
        <div>
            <h1>Learn English with AI. <br /><span className='text-gradient'>Guided, Fun, and </span><br /><span className='text-gradient'>Rewarding.</span></h1>
            <p>Daily 10-minute practice tailored to your age & interests, guided by Mercury your AI tutor with progress tracking & rewards you’ll love.</p>
        </div>

     </div>
    </div>
  )
}

export default Hero
