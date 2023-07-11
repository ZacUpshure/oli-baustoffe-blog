import React, {useContext, useState, useEffect} from 'react'
import Image from 'next/image';
import { getCategories } from '../services'
import Link from 'next/link';

const logo = '../assets/Blog_logo.jpg';

const Header = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getCategories().then((newCategories) => setCategories(newCategories))
    }, [])

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <div className='md:float-left block'>
                    <Link href="/">
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            {/* <Image src="/../public/Blog_logo.jpg" width={126} height={67} alt='OLI baustoffe logo'/> */}
                            OLI Baustoffe Blog
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-4 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))};
                </div>
            </div>
        </div>
    )
    }

export default Header