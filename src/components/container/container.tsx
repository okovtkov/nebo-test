import classNames from "classnames";
import React from "react";
import './container.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  label: string;
  tag: 'div' | 'article' | 'section' | 'dl';
}

function Container(props: Props) {
  const Element = props.tag;

  return (
    <Element className={classNames("container", props.className)}>
      <label className="container__label">{props.label}</label>
      {props.children}
    </Element>
  );
}

export default Container;
