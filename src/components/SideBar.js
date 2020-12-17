import './SideBar.css';

const SideBar = (props) => {    
    return (
        <div className="menuItem">
            {props.item.name}
        </div>
    );
};

export default SideBar;