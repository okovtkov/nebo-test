import classNames from "classnames";
import React from "react";
import './container.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  label: string;
}

function Container(props: Props) {
  return (
    <section className={classNames("container", props.className)}>
      <label className="container__label">{props.label}</label>
      {props.children}
    </section>
  );
}

export default Container;
