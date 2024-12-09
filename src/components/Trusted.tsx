import React from 'react'
import Image from 'next/image'
const Trusted = () => {
  return (
    <div className='flex flex-col items-center gap-10'>
        <h1 className='text-center font-semibold text-[30px]'>Trusted by 1000+ companies world wide</h1>
        <div className='flex gap-14 flex-wrap items-center justify-center'>
            <Image src='/landing/Trusted-1.svg' alt='' height={100} width={100} />
            <Image src='/landing/Trusted-2.svg' alt='' height={100} width={100} />
            <Image src='/landing/Trusted-3.svg' alt='' height={100} width={100} />
            <Image src='/landing/Trusted-4.svg' alt='' height={100} width={100} />
            <Image src='/landing/Trusted-5.svg' alt='' height={100} width={100} />
            <Image src='/landing/Trusted-6.svg' alt='' height={100} width={100} />
            <Image src='/landing/Trusted-7.svg' alt='' height={100} width={100} />
        </div>
    </div>
  )
}

export default Trusted