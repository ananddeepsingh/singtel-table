import './checkbox.scss';

const SingtelCheckbox = ({ label, handleOnClick, ...props }) => {

  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          onChange={() => handleOnClick()}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default SingtelCheckbox;
