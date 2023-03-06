import './radiobox.scss';

const SingtelRadioButton = ({ label, handleOnClick, ...props }) => {
  return (
    <div className="radio-wrapper">
      <label className="form-control">
        <input
          type="radio"
          {...props}
        />
      </label>
    </div >
  );
}

export default SingtelRadioButton;
