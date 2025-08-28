import React from "react";

function Input(props) {
  return (
    <div
      className={`note-card-form-group form-group flex flex-col gap-2 w-full  ${
        props.className ? props.className : ""
      } w-1/2`}
    >
      <label htmlFor={props.attributes.id} className="text-uppercase">
        {props.label}
      </label>{" "}
      <input
        className=" outline-none hover:bg-gray-200 rounded-sm hover:border-blue-600 text-black"
        {...(props.attributes && props.attributes)}
      />
      {props?.errors?.required ? (
        <span className="text-danger text-red-500">
          {" "}
          {props.label} is required.{" "}
        </span>
      ) : null}
    </div>
  );
}

export default Input;