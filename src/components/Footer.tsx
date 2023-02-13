import rsschoolLogo from '../images/rs_school.svg';

function Footer() {
  return (
    <div className=" py-4 bg-color5 px-10">
      <div className="flex justify-between">
        <a className="hover:scale-110 duration-500" href="https://rs.school/js/"><img src={rsschoolLogo} alt="RSSchool" /></a>
        <ul className="flex gap-3">
          <li><a className="hover:text-color2 duration-500" href="https://github.com/sensaur">Ilya Zhigarev</a></li>
          <li>|</li>
          <li><a className="hover:text-color2 duration-500" href="https://github.com/NikolayBalabanov">Nikolay Balabanov</a></li>
          <li>|</li>
          <li><a className="hover:text-color2 duration-500" href="https://github.com/VEKozlov111">Vladislav Kozlov</a></li>
        </ul>
        <h3>©2023 RS School. All rights reserved.</h3>
      </div>
    </div>
  );
}

export default Footer;
