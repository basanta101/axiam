import Button from "../Button/Button";
import { BUTTON_VARIANT } from "../Button/Button.constants";

const Navbar = () => {
    return <nav className='flex flex-ac flex-jb p-lr-108 sticky-top'><h1 className="f-w-600 f-24">axiamatic</h1> <Button variant={BUTTON_VARIANT.OUTLINE}>Exit Setup</Button> </nav>
}

export default Navbar;
