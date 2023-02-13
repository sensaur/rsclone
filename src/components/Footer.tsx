import rsschoolLogo from '../images/rs_school.svg'

function Footer() {
  return (
    <div className=" py-4 bg-color5 md:px-9 px-2" >
      <div className="flex justify-between flex-wrap">
        <a className='hover:scale-110 duration-500' href="https://rs.school/js/"><img className='md:w-5/6 w-4/6' src={rsschoolLogo} alt="RSSchool" /></a>
        <ul className='flex md:gap-1 gap-1'>
          <li className="flex items-center"><a className='hover:text-color2 duration-500 md:text-base text-xs' href="https://github.com/sensaur">Ilya Zhigarev</a></li>
          <li className="flex items-center">|</li>
          <li className="flex items-center"><a className='hover:text-color2 duration-500 md:text-base text-xs' href="https://github.com/NikolayBalabanov">Nikolay Balabanov</a></li>
          <li className="flex items-center">|</li>
          <li className="flex items-center"><a className='hover:text-color2 duration-500 md:text-base text-xs' href="https://github.com/VEKozlov111">Vladislav Kozlov</a></li>
        </ul>
        <div className='flex items-center'>
          <h3 className='md:text-base text-xs'>©2023 <span className='md:inline hidden'>RS School. All rights reserved.</span></h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;