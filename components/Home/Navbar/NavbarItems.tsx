interface NavbarItemsProps {
  label: string;
}
const NavbarItems = ({ label }:NavbarItemsProps) => {
  return (
    <div
      className="hover:text-gray-300/80
    cursor-pointer
    transition duration-500
    text-white"
    >
      {label}
    </div>
  );
};

export default NavbarItems;
