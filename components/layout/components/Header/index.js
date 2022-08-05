import styles from "./index.module.scss";
import React, { Fragment } from "react";

const items = [
  { label: "首页", src: "/icons/setup.svg", link: "" },
  { label: "技术", src: "/icons/setup.svg", link: "" },
  { label: "评测", src: "/icons/test.svg", link: "" },
  { label: "随想", src: "/icons/think.svg", link: "" },
  { label: "生活", src: "/icons/setup.svg", link: "" },
  { label: "关于", src: "/icons/about.svg", link: "" },
];

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <a href="#" className={styles.homeName}>
          Xiao Zhe Qiu
        </a>
      </div>
      <div className={styles.right}>
        {items.map((item, index) => (
          <a href="#" className={styles.option} key={index}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
