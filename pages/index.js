import styles from "../styles/index.module.scss";
import Layout from "../components/layout";
import Image from "next/image";
import React, { Fragment } from "react";

const items = [
  { label: "技术", src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/649a4cc9-5e15-4056-a960-2edb9d78cb9a.svg", link: "" },
  { label: "评测", src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/55b98ff9-382c-4298-8104-65f04c71c275.svg", link: "" },
  { label: "随想", src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/0c06ca86-130a-4df7-ad5e-3b780fb7bce1.svg", link: "" },
  { label: "生活", src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/f03de388-63c1-42b3-91f0-51e455b9f2a7.svg", link: "" },
  { label: "关于", src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/9ab76ff3-37e7-4022-9ffa-61f662d2ceda.svg", link: "" },
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
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/7938521d-6562-45c5-89ac-460ff16cfa07.svg"
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
