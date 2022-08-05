import styles from "../styles/index.module.scss";
import Layout from "../components/layout";
import Image from "next/image";
import React, { Fragment } from "react";

const items = [
  { label: "技术", src: "/icons/setup.svg", link: "" },
  { label: "评测", src: "/icons/test.svg", link: "" },
  { label: "随想", src: "/icons/think.svg", link: "" },
  { label: "生活", src: "/icons/setup.svg", link: "" },
  { label: "关于", src: "/icons/about.svg", link: "" },
];

export default function Index() {
  return (
    <Layout>
      <div className={styles.index}>
        <div className={styles.box}>
          <h1 className={styles.title}>XIAO ZHE QIU</h1>
          <h2 className={styles.title}>Good good study, day day up.</h2>
          <div className={styles.items}>
            {items.map((item, index) => (
              <Fragment key={index}>
                &nbsp;
                <Image src={item.src} height={20} width={20} />
                &nbsp;<span className={styles.itemsLabel}>{item.label}</span>
                &nbsp;
                {index < items.length - 1 && <span> | </span>} &nbsp;
              </Fragment>
            ))}
          </div>
          <div className={styles.about}>
            <div className={styles.howCreate}>
              <Image
                src="/icons/web.svg"
                className={styles.web}
                width={20}
                height={20}
              />
              主题由 &nbsp;
              <a href="https://github.com/idealclover/Clover">
                idealclover
              </a>{" "}
              &nbsp;用 <span style={{ color: "red" }}>❤</span> 制作
            </div>

            <div>网站已悄悄运行50天10小时19分10秒</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
